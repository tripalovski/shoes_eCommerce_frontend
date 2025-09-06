import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { IRegisterUser } from './IRegisterUser';
import { LocalStorageConstants } from '../../core/constants/LocalStorageConstants';
import { Router } from '@angular/router';

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
    }, { validators: passwordMatchValidator() }); // Apply custom validator at the form group level
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: IRegisterUser = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (tokenResponse) => {
          localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, tokenResponse.accessToken)
          console.log(tokenResponse.accessToken);
          this.router.navigate(['/shop']);
        },
        error: (error) => {
          console.error('An error occurred during registration.', error);
        }
      });
    } else {
      console.log('Form is invalid. Please check the entered data.');
      // Mark all fields as touched to display validation messages
      this.registerForm.markAllAsTouched();
    }
  }
}
