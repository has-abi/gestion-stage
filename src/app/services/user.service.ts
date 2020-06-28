import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPage} from "../models/pageModels/user-page.model";
import {Role} from "../models/role.model";
import {AuthentificationService} from "./auth/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user:User;
  private _users:Array<User>;
  private _userPage:UserPage;
  private _roles:Array<Role>;
  tableElements = [];
  url="http://localhost:8091/gestion-stage-api/user"
  constructor(private httpClient: HttpClient,private authentificationService:AuthentificationService) { }
  confirmUser(username:string,code:string):Observable<number>{
    return this.httpClient.get<number>(this.url+"/confirm/code/"+code+"/username/"+username);
  }
  removeUser(id:number):Observable<number>{
    return this.httpClient.delete<number>(this.url+"/id/"+id,{headers:this.authentificationService.getHeaders()});
  }

    getRoles(){
        this.httpClient.get<Array<Role>>("http://localhost:8091/gestion-stage-api/role/",{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
          this.roles = datas;
        })
    }

  get roles(): Array<Role> {
    if(this._roles == null){
      this._roles = new Array<Role>();
    }
    return this._roles;
  }

  set roles(value: Array<Role>) {
    this._roles = value;
  }

  updateUser():Observable<number>{
    return this.httpClient.put<number>(this.url+"/",this.user,{headers:this.authentificationService.getHeaders()});
  }

  findAll(page:number,size:number,sort:string){
    this.httpClient.get<UserPage>(this.url+"/page/"+page+"/size/"+size+"/sort/"+sort,{headers:this.authentificationService.getHeaders()}).subscribe(us=>{
      this.userPage = us;
      this.fillTableElements(us.totalPages)
    })
  }
  fillTableElements(size:number){
    for(let i = 0;i<size;i++){
      this.tableElements.push(i);
    }
  }
  countusers():Observable<number>{
    return  this.httpClient.get<number>(this.url+"/count",{headers:this.authentificationService.getHeaders()});
  }

  searchUsers(search:string){
    this.httpClient.get<Array<User>>(this.url+"/search?search=nom:*"+search+"* OR prenom:*"+search+"* OR username:*"+search+"* OR sexe:*"+search,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.users = datas;
    })
  }

  findUsersByNom(nom:string){
    this.httpClient.get<Array<User>>(this.url+"/nom/"+nom,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.users = datas;
    })
  }
  findUsersByPrenom(prenom:string){
    this.httpClient.get<Array<User>>(this.url+"/prenom/"+prenom,{headers:this.authentificationService.getHeaders()}).subscribe(datas=>{
      this.users = datas;
    })
  }
  findByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.url+"/email/"+email,{headers:this.authentificationService.getHeaders()});
  }

  findByReference(ref:string):Observable<User>{
    return this.httpClient.get<User>(this.url+"/reference/"+ref,{headers:this.authentificationService.getHeaders()});
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

  get users(): Array<User> {
    if(this._users == null){
      this._users = new Array<User>();
    }
    return this._users;
  }

  set users(value: Array<User>) {
    if(this._userPage == null){
      this._userPage = new UserPage();
    }
    this._users = value;
  }
  get userPage(): UserPage {
    if(this._userPage == null){
      this._userPage = new UserPage();
    }
    return this._userPage;
  }

  set userPage(value: UserPage) {
    this._userPage = value;
  }

}
