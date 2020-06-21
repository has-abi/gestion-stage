import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../services/auth/authentification.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private formBuilder:FormBuilder,private authentificationService:AuthentificationService,
              private sessionStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      pwd:new FormControl('',[
        Validators.required
      ])
    })
  }
  submitLogin(userData){
    if(this.email.errors == null && this.pwd.errors == null){
        this.user.username = userData.email;
        this.user.password = userData.pwd;
        //this.loginUser();
      this.authentificationService.springLogin().subscribe(resp=>{
        const jwt = resp.headers.get('Authorization')
        this.sessionStorage.store('jwt',jwt);
        this.authentificationService.findByEmail(this.user.username);
      },error => {
        console.log("error")
      })
    }
  }

  get user(){
    return this.authentificationService.user;
  }
  loginUser(){
    return this.authentificationService.login();
  }
  get loginError(){
    return this.authentificationService.loginError;
  }
  get email(){
    return this.loginForm.get('email');
  }
  get pwd(){
    return this.loginForm.get('pwd');
  }
}
