import { Component, OnInit } from '@angular/core';
import {LocalStorageService,SessionStorageService} from "ngx-webstorage";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  constructor(private sessionStorage:SessionStorageService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      cne:new FormControl([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("*[A-Z]{1}[0-9]{9}$")
      ]),
      codeAppoge:new FormControl([
        Validators.required,
        Validators.pattern("{d}")
      ]),
      registerEmail:new FormControl([
        Validators.required,
        Validators.email
      ])
    })
    console.log(this.sessionStorage.retrieve("user"))
  }
  onsubmit(){

  }
  get cne(){
    return this.registerForm.get('cne');
  }
  get codeAppoge(){
    return this.registerForm.get('codeAppoge');
  }
  get email(){
    return this.registerForm.get('email');
  }

}
