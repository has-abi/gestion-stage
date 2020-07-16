import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from "../services/auth/authentification.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {User} from "../models/user.model";
import {Role} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authentificationService:AuthentificationService,private sessionStorage:LocalStorageService,private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot):  boolean {
    const user = this.sessionStorage.retrieve("logedUser");
    let  check = false;
    if(user!=null){
      const rls  = user.roles;
      const expectedRoles = route.data.expectedRoles;
      for(let i = 0;i<rls.length;i++){
        for(let j =0;j<expectedRoles.length;j++){
          if(rls[i].role == expectedRoles[j]) check = true;
        }
      }
    }

    if(user == null || !check){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
