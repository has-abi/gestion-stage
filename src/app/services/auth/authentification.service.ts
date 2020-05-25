import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "ngx-webstorage";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private _user:User;
  private _loginError:string;
  url="http://localhost:8091/gestion-stage-api/user/";
  constructor(private httpClient:HttpClient,private sessionStorage:SessionStorageService,private router:Router) { }
  login(){
      this.httpClient.post(this.url+"login",this.user).subscribe(resp=>{
        console.log("service")
        console.log(resp);
        if(resp == -1){
          this.loginError = "Vous n'avez pas de compte!"
        }else if(resp == -2){
          this.loginError = "Mot de passe incorrect!"
        }else if(resp == 1){
          this.findByEmail(this.user.email);
          this.sessionStorage.store('logedUser',this.findByEmail(this.user.email))
          this.router.navigateByUrl("/stage/create")
        }else{
          this.loginError = "Erreur survenu!"
        }
      });
  }
  findByEmail(email:string){
    this.httpClient.get<User>(this.url+"email/"+email).subscribe(user=>{
      this.sessionStorage.store('logedUser',user);
    })
  }

  get loginError(): string {
    return this._loginError;
  }

  set loginError(value: string) {
    this._loginError = value;
  }

  get user(): User {
    if(this._user == null){
      this._user = new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
