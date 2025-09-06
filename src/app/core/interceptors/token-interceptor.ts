import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageConstants } from '../constants/LocalStorageConstants';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
  const reqWithToken = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(reqWithToken);
};
