import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private apiService: ApiService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/autorization']);
      return false;
    }
  }
}
