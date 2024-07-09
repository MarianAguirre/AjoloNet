import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const publicGuard: CanActivateFn = (route, state) => {

  const cookie = inject(CookieService)
  const token = cookie.get("token") || ""
  const router = inject(Router);

  if (token) {
    router.navigateByUrl("/")
    return false;
  } else {
    return true;
  }
};
