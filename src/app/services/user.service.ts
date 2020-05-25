import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user:User;
  private _users:Array<User>;
  url="http://localhost:8091/gestion-stage-api/user"
  constructor(private httpClient: HttpClient) { }
  findAll(){
    this.httpClient.get<Array<User>>(this.url+"/").subscribe(us=>{
      this.users = us;
    })
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
    this._users = value;
  }
}
