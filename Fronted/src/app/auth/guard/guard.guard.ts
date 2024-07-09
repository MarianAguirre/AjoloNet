import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guardGuard: CanActivateFn = (route, state) => {

  const cookie = inject(CookieService)
  const token = cookie.get("token") || ""
  const router = inject(Router);

  if (token != "") {
    return true;
  } else {
    router.navigateByUrl("/auth")
    return false;
  }
};
