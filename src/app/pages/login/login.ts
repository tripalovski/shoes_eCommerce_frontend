import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { ILoginUser } from './ILoginUser';
import { LocalStorageConstants } from '../../core/constants/LocalStorageConstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: ILoginUser = this.loginForm.value;
      this.authService.login(user).subscribe({
        next: (tokenResponse) => {
          localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, tokenResponse.accessToken);
          this.router.navigate(['/shop']);
        },
        error: (error) => {
          console.error('Error while login: ', error);
        }
      });
    } else {
      console.log('Form is invalid.');
      this.loginForm.markAllAsTouched();
    }
  }

}
