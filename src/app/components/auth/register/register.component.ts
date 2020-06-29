import { Component, OnInit } from '@angular/core';
import {LocalStorageService,SessionStorageService} from "ngx-webstorage";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EtudiantService} from "../../../services/etudiant.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  etudConfirm = false;
  emailconfirm = false;
  verifiedCne;
  verifiedEmail;
  constructor(private sessionStorage:SessionStorageService,private formBuilder:FormBuilder,private etudiantService:EtudiantService,
              private flashMessagesService:FlashMessagesService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      cne:new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      codeAppoge:new FormControl('',[
        Validators.required
      ]),
      registerEmail:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password:new FormControl('',[
        Validators.required
      ]),
      codeConfirm:new FormControl('',[
      Validators.required
    ]),
    })
    console.log(this.sessionStorage.retrieve("user"))
  }
  onsubmit(formData){
      if(!this.etudConfirm && !this.emailconfirm){
        if(this.cne.errors == null && this.codeAppoge.errors == null){
          this.etudiantService.confirmEtudiant(formData.cne,formData.codeAppoge).subscribe(resp=>{
            if(resp>0){
              this.etudConfirm = true;
              this.verifiedCne = formData.cne;
            }else{
              this.flashMessagesService.show('Erreur dans la confirmation de l\'étudiant!', { cssClass: 'alert-danger', timeout: 6000 })
            }
          })
        }else {
          this.flashMessagesService.show('Erreur dans le CNE ou le code d\'appogé!', { cssClass: 'alert-danger', timeout: 6000 })
        }
      }else if (this.etudConfirm && !this.emailconfirm){
        this.etudiantService.sendCode(this.verifiedCne,formData.registerEmail);
        this.emailconfirm = true;
        this.verifiedEmail = formData.registerEmail;
      }else {
        this.userService.confirmUser(this.verifiedCne,formData.codeConfirm).subscribe(resp=>{
			console.log(resp);
          if(resp>0){
			  console.log(this.verifiedEmail);
			  console.log(formData.password);
			  console.log(this.verifiedCne);
			  this.userService.newUser(this.verifiedEmail,formData.password,this.verifiedCne).subscribe(response=>{
				  if(response>0){
					   this.router.navigate(['/login']);
				  }else{
					   this.flashMessagesService.show('Un erreur est survenu lors de l\'inscription vérifier votre information et réssayer! ', { cssClass: 'alert-danger', timeout: 6000 })
				  }
			  })
           
          }else{
            this.flashMessagesService.show('Le code de confirmation est incorrect!', { cssClass: 'alert-danger', timeout: 6000 })
          }
        })
      }
  }
  get cne(){
    return this.registerForm.get('cne');
  }
  get codeAppoge(){
    return this.registerForm.get('codeAppoge');
  }
  get registerEmail(){
    return this.registerForm.get('registerEmail');
  }
  get password(){
    return this.registerForm.get("password");
  }
  get codeConfirm(){
    return this.registerForm.get("codeConfirm")
  }

}
