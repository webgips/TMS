import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUser.subscribe(x => x);
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser)
        if (currentUser) {
            return true;
        }
        else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        
    }
}
