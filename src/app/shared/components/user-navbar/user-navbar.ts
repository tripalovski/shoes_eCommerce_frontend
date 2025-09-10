import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-user-navbar',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css'
})
export class UserNavbar {
  authService = inject(AuthService);
  router = inject(Router)
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
