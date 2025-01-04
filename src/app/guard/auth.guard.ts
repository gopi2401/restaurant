import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login-service/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  if (token && user) {
    return true;
  } else {
    return false;
  }
};