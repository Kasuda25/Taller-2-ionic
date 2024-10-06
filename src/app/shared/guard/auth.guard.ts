import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  const isAuth = await authSrv.isAuth();
  if (!isAuth) {
    router.navigateByUrl("");
    return false;
  }
  return true;
};
