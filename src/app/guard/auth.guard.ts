import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  if (token && user) {
    return true;
  } else {
    return false;
  }
};
