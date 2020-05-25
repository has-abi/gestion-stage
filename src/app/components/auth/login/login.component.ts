import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../services/auth/authentification.service";
import {SessionStorageService} from "ngx-webstorage";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private formBuilder:FormBuilder,private authentificationService:AuthentificationService,
              private sessionStorage:SessionStorageService) { }

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
        this.user.email = userData.email;
        this.user.motPass = userData.pwd;
        this.loginUser();
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
