import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userRole$.pipe(
    map(role => {
      if (!role) {
        router.navigate(['/login']);
        return false;
      }      
      
      // conditional roles obtained from route declarations
      const requiredRoles = route.data['roles'];
      
      if (!requiredRoles.includes(role)) {
        router.navigate(['']); 
        alert("You dont have access to this page.")
        return false;
      }
      
      return true;
    })
  );
};
