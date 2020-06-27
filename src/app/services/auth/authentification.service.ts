import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private _user:User;
  private _loginError:string;
  private _jwtToken:string = null;
  url="http://localhost:8091/gestion-stage-api/user/";
  constructor(private httpClient:HttpClient,private sessionStorage:LocalStorageService,private router:Router) { }
  login(){
      this.httpClient.post(this.url+"login",this.user).subscribe(resp=>{
        console.log("service")
        console.log(resp);
	      console.log(this.user);
        if(resp == -1){
          this.loginError = "Vous n'avez pas de compte!"
        }else if(resp == -2){
          this.loginError = "Mot de passe incorrect!"
        }else if(resp == 1){
          this.findByEmail(this.user.username);
        }else{
          this.loginError = "Erreur survenu!"
        }
      });
  }

  springLogin(){
    return this.httpClient.post("http://localhost:8091/login",this.user,{observe:'response'});
  }
  findByEmail(email:string){
    this.httpClient.get<User>(this.url+"email/"+email).subscribe(user=>{
      this.sessionStorage.store('logedUser',user);
      if(user.roles.length == 1){
          let r = user.roles[0];
          if(r.role == "COORDINATEUR_ROLE"){
            this.router.navigate(['coordinateur/stage/list'])
          }else if(r.role == "ETUDIANT_ROLE"){
            this.router.navigate(["etudiant/profile"])
          }else if(r.role == "ADMIN_ROLE"){
            this.router.navigate(['admin/profile'])
          }else if(r.role == "ENCADREUR_ROLE"){
		      console.log("we are in");
            this.router.navigate(["encadreur/profile"])
          }
          this.sessionStorage.store("userRole",r.role);
      }
    })
  }
  logout(){
    this.sessionStorage.clear("logedUser");
    this.sessionStorage.clear("jwt");
    this.router.navigate(['login']);
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


  get jwtToken(): string {
    if(this._jwtToken == null){
      this._jwtToken = this.sessionStorage.retrieve("jwt");
    }
    return this._jwtToken;
  }

  set jwtToken(value: string) {
    this._jwtToken = value;
  }

  getHeaders():HttpHeaders{
    console.log(this.jwtToken)
    const headers = new HttpHeaders({'Authorization':this.jwtToken});
    return  headers;
  }
}
