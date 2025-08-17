import {Component, inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PasswordStrengthComponent} from "../../components/password-strength/password-strength.component";
import {Router, RouterLink} from "@angular/router";
import {ConfirmPasswordValidator} from "./confirmPassword.validator";
import {UsersService} from "../../services/users.service";
import {CreateUser} from "../../model/user.model";
import {LoadingComponent} from "../../components/loading/loading.component";
import {finalize} from "rxjs";
import {ngDebug} from "@angular/cli/src/utilities/environment-options";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordStrengthComponent,
    RouterLink,
    LoadingComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage implements OnInit{
  private formbuild = inject(FormBuilder);
  private router = inject(Router);
  private user = inject(UsersService);

  registerForm!: FormGroup;
  loanding: boolean = false;
  ngOnInit(): void {
    this.registerForm = this.formbuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: ConfirmPasswordValidator('password', 'confirmPassword')
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loanding = true
      const { confirmPassword, ...userData } = this.registerForm.value;
      this.user.create(userData as CreateUser)
        .pipe(
          finalize(()=> this.loanding = false)//
        )
        .subscribe({
          next: ()=> {
            this.registerForm.reset()
            this.router.navigate(['/login'])
          },
          // TODO: Ajsute alerta e controler error
          error: (err) => alert(err.error.message),
        });
    } else {
      this.registerForm.markAllAsTouched();
      console.log('Formulário de registro inválido.');
    }
  }
}
