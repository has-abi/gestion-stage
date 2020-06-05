import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConfigurationService} from "../../../services/configuration.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  role = "--SELECT--"
  userForm;
  constructor(private userService:UserService,private passwordGeneratorService:PasswordGeneratorService
              ,private flashMessagesService:FlashMessagesService,private configurationService:ConfigurationService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nom: new FormControl('',[
        Validators.required
      ]),
      prenom: new FormControl('',[
        Validators.required
      ]),
      uemail: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      pwd: new FormControl('',[
        Validators.required
      ]),
      cne: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      codeAppoge: new FormControl('',[
        Validators.required
      ]),
      app: new FormControl('',[
        Validators.required
      ])
    })
  }
  get user(){
    return this.userService.user;
  }
  generateP(){
    this.user.motPass = this.passwordGeneratorService.getRandomPassword();
  }
  get filieres(){
      return this.configurationService.filieres;
  }
  create(userData){

  }

}
