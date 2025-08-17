import {Component, Input, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
enum PasswordStrengthLevel {
  INVALID = 0,
  VERY_WEAK = 1,
  WEAK = 2,
  MEDIUM = 3,
  STRONG = 4
}

interface StrengthInfo {
  level: PasswordStrengthLevel;
  text: string;
  barClasses: string[];
  textClass: string;
}
@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent {
  @Input() password: string = '';

  strength: StrengthInfo = {
    level: PasswordStrengthLevel.INVALID,
    text: '',
    barClasses: ['', '', '', ''],
    textClass: ''
  };

  private strengthTexts = {
    [PasswordStrengthLevel.INVALID]: 'Inválida (mín. 8 caracteres)',
    [PasswordStrengthLevel.VERY_WEAK]: 'Muito Fraca',
    [PasswordStrengthLevel.WEAK]: 'Fraca',
    [PasswordStrengthLevel.MEDIUM]: 'Média',
    [PasswordStrengthLevel.STRONG]: 'Forte'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.checkPasswordStrength();
    }
  }

  checkPasswordStrength(): void {
    const score = this.calculatePasswordScore();
    this.strength.level = this.determineStrengthLevel(score);
    this.updateStrengthInfo();
  }

  private calculatePasswordScore(): number {
    if (this.password.length < 8) return 0;

    let score = 1; // Já temos 1 ponto por ter 8+ caracteres

    const hasLowerCase = /[a-z]/.test(this.password);
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[^A-Za-z0-9]/.test(this.password);

    if (hasLowerCase) score++;
    if (hasUpperCase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    return score;
  }

  private determineStrengthLevel(score: number): PasswordStrengthLevel {
    if (this.password.length < 8) {
      return PasswordStrengthLevel.INVALID;
    }
    return Math.min(score, 4) as PasswordStrengthLevel;
  }

  private updateStrengthInfo(): void {
    this.strength.text = this.strengthTexts[this.strength.level];
    this.strength.textClass = `password-strength__text--level-${this.strength.level}`;

    this.strength.barClasses = Array(4).fill('').map((_, i) =>
      i < this.strength.level ? `password-strength__bar--level-${this.strength.level}` : ''
    );
  }
}
