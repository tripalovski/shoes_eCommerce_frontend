import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { ILoginUser } from './ILoginUser';
import { LocalStorageConstants } from '../../core/constants/LocalStorageConstants';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../core/enums/Role';

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
        next: () => {
          this.authService.userRole$.subscribe(role => {
            if (role === Role.admin) {
              this.router.navigate(['admin']);
            } else if (role === Role.user) {
              this.router.navigate(['user']);
            } else {
              console.warn('Unknown user role:', role);
            }
          });
        },
        error: (error) => {
          console.error('Error while logging in:', error);
        }
      });
    } else {
      console.log('Form is invalid.');
      this.loginForm.markAllAsTouched();
    }
  }

}
