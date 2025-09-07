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
        next: (tokenResponse) => {
          const token = tokenResponse.accessToken;
          localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, tokenResponse.accessToken);
          const decodedToken: any = jwtDecode(token);
          const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]          
          
          if(role === Role.user) this.router.navigate(['user']);
          else if(role === Role.admin) this.router.navigate(['admin'])
          else console.log("No such a role exists");          
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
