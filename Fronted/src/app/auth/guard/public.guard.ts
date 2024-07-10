import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const publicGuard: CanActivateFn = (route, state) => {

  const token =sessionStorage.getItem("token") || ""

  const router = inject(Router);

  if (token) {
    router.navigateByUrl("/")
    return false;
  } else {
    return true;
  }
};
