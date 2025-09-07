import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { IRegisterUser } from './IRegisterUser';
import { LocalStorageConstants } from '../../core/constants/LocalStorageConstants';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../core/enums/Role';

// Custom validator function to check if passwords match
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  
  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator() });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: IRegisterUser = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (tokenResponse) => {
          const token = tokenResponse.accessToken;
          localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, token)
          const decodedToken: any = jwtDecode(token);
          const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]          
          
          if(role === Role.user) this.router.navigate(['user']);
          else if(role === Role.admin) this.router.navigate(['admin'])
          else console.log("No such a role exists");  
        },
        error: (error) => {
          console.error('An error occurred during registration.', error);
        }
      });
    } else {
      console.log('Form is invalid. Please check the entered data.');
      this.registerForm.markAllAsTouched();
    }
  }
}
