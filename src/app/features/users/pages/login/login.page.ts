import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../core/auth.service";
import {LoadingComponent} from "../../components/loading/loading.component";
import {finalize} from "rxjs";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoadingComponent,
  ],
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ["./login.page.css"]
})

export class LoginPage  {
  private formbuild = inject(FormBuilder);
  private auth = inject(AuthService);

  loginForm!: FormGroup;
  loanding: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.formbuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loanding = true
      const {email, password } = this.loginForm.value
      this.auth.login({email: email,password: password})
        .pipe(
          finalize(()=> this.loanding = false)//
        )
        .subscribe({
          next: ()=> this.loginForm.reset(),
          // TODO: Ajsute alerta e controler error
          error: (err) => alert(err.error.message),
        });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Formulário inválido.');
    }
  }
}
