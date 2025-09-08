import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegisterUser } from '../../pages/register/IRegisterUser';
import { ServiceConstants } from '../constants/ServiceConstants';
import { UserMapper } from '../mappers/User.mapper';
import { ILoginUser } from '../../pages/login/ILoginUser';
import { LoggedUserDto } from '../dtos/UserDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { AccessTokenDto } from '../dtos/AccessTokenDto';
import { LocalStorageConstants } from '../constants/LocalStorageConstants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromToken());
  public userRole$ = this.userRoleSubject.asObservable();


  register(user: IRegisterUser): Observable<AccessTokenDto> {
    const userDto = UserMapper.toRegisterDto(user);    
    return this.http.post<AccessTokenDto>(ServiceConstants.API_METHODS.AUTH.REGISTER, userDto).pipe(
      tap((tokenResponse: any) => {
        const token = tokenResponse.accessToken;
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, token)
        
        this.loggedInSubject.next(true);
        this.setUserRole(token);
      })
    );
  }

  login(user: ILoginUser): Observable<AccessTokenDto> {
    const userDto = UserMapper.toLoginDto(user);
    return this.http.post<AccessTokenDto>(ServiceConstants.API_METHODS.AUTH.LOGIN, userDto).pipe(
      tap((tokenResponse: any) => {
        const token = tokenResponse.accessToken;
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, token)
        
        console.log("login");
        

        this.loggedInSubject.next(true);
        this.setUserRole(token);
      })
    );    
  }

    logout(): void {
    localStorage.removeItem(LocalStorageConstants.ACCESS_TOKEN);
    
    this.loggedInSubject.next(false);
    this.userRoleSubject.next(null);
  }
  
  private hasToken(): boolean {
    return !!localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
  }
  
  private setUserRole(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      const roleIdentifier = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const role = decodedToken[roleIdentifier]  
      this.userRoleSubject.next(role || null);
    } catch (error) {
      console.error('Failed to decode token:', error);
      this.userRoleSubject.next(null);
    }
  }

  private getRoleFromToken(): string | null {    
    const token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
    if (token) {
      try {
      const decodedToken: any = jwtDecode(token);
      const roleIdentifier = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const role = decodedToken[roleIdentifier]  
      return role || null;
      } catch (error) {
        console.error('Invalid token found in storage.');
        return null;
      }
    }
    return null;
  }
}
