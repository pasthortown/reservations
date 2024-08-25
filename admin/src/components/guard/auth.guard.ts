import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        let user: any = JSON.parse(sessionStorage.getItem('user') as string);
        let rol = user?.rol;
        if (rol !== 'Admin') {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      } catch (error) {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
