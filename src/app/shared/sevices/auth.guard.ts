import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth : AuthService,
    private router: Router,
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(state)
      // console.log(next)
      // console.log(this.auth.isLogged)
      if (!this.auth.isLogged) {
        // redirect the user
        // console.log('User Not Logged In,Redirecting To Login')
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
  
}
