import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegisterUser } from '../../pages/register/IRegisterUser';
import { ServiceConstants } from '../constants/ServiceConstants';
import { UserMapper } from '../mappers/User.mapper';
import { ILoginUser } from '../../pages/login/ILoginUser';
import { LoggedUserDto } from '../dtos/UserDto';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AccessTokenDto } from '../dtos/AccessTokenDto';
import { LocalStorageConstants } from '../constants/LocalStorageConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  register(user: IRegisterUser): Observable<AccessTokenDto> {
    const userDto = UserMapper.toRegisterDto(user);    
    return this.http.post<AccessTokenDto>(ServiceConstants.API_METHODS.AUTH.REGISTER, userDto);
  }

  login(user: ILoginUser): Observable<AccessTokenDto> {
    const userDto = UserMapper.toLoginDto(user);
    return this.http.post<AccessTokenDto>(ServiceConstants.API_METHODS.AUTH.LOGIN, userDto);
  }
}
