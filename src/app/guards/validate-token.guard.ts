import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, CanLoad } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this.authService.validateToken().pipe(
      tap((resp) => {
        if (!resp) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canMatch');
    return this.authService.validateToken().pipe(
      tap((resp) => {
        if (!resp) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
