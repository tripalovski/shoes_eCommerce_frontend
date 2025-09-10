import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar {
  authService = inject(AuthService);
  router = inject(Router)

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
