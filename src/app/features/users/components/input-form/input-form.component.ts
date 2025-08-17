import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
})
export class InputFormComponent<T> implements ControlValueAccessor{
  // Entradas para configurar o componente
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';

  // As propriedades internas agora usam o tipo genérico T
  value: T | null = null;
  onChange: (value: T | null) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled: boolean = false;


  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get formControl(): FormControl {
    return this.ngControl.control as FormControl;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: T): void {
    this.value = value;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    let parsedValue: T | null = null;

    // Lógica de conversão baseada no tipo do input
    if (this.type === 'number') {
      // Se o campo estiver vazio, o valor é null, não 0.
      if (inputValue === '') {
        parsedValue = null;
      } else {
        const num = parseFloat(inputValue);
        // Atribui o número se for válido, senão mantém null
        parsedValue = isNaN(num) ? null : (num as unknown as T);
      }
    } else {
      // Para outros tipos, tratamos como string
      parsedValue = inputValue as unknown as T;
    }

    this.value = parsedValue;
    this.onChange(this.value);
  }

}
