import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {UserService} from "../../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css']
})
export class ForgetPwdComponent implements OnInit {
  question ="-SELECT-"
  reponse;
  email;
  code;
  send = false;
  allow = false;
  showQuestion = false;
  showEmail = false;
  questionConfirm = false;
  sended = false;
  auth=false;
  pwd;
  countedTime = 0;
  constructor(private userService:UserService,private flashMessagesService:FlashMessagesService) {

	  }

  ngOnInit(): void {
  }

  renew(){
    if(this.showEmail && !this.showQuestion){
      this.userService.checkCode(this.email,this.code).subscribe(resp=>{
        if(resp>0){
          this.flashMessagesService.show('Votre code est confirmé veuillez taper un nouveau mot de passe', { cssClass: 'alert-success', timeout: 6000 })
          this.allow = true;
        }else{
          this.flashMessagesService.show('Erreur dans la confirmation de code!', { cssClass: 'alert-danger', timeout: 6000 })
        }
      })
    }
    if(this.showQuestion && !this.showEmail){
      this.userService.checkSecurityQuestion(this.email,this.question,this.reponse).subscribe(resp=>{
        if(resp>0){
          this.flashMessagesService.show('Votre réponse de question de sécurité est confirmé veuillez taper un nouveau mot de passe', { cssClass: 'alert-success', timeout: 6000 })
          this.allow = true;
        }else{
          this.flashMessagesService.show('Erreur dans la confirmation de question de sécurité!', { cssClass: 'alert-danger', timeout: 6000 })
        }
      })
    }
  }

  save(){
    this.userService.updatePassword(this.email,this.pwd).subscribe(resp=>{
      if(resp>0){
        this.auth = true;
        this.flashMessagesService.show('Votre mot de passe est réinitialisé avec succès! ', { cssClass: 'alert-success', timeout: 6000 })
      }else{
        this.flashMessagesService.show('Erreur dans la réinitialisation de votre mot de passe!', { cssClass: 'alert-danger', timeout: 6000 })
      }

    })
  }
  sendEmail(){
	  this.sended=true;
    this.userService.sendEmail(this.email);
  }

	validate(){
		if(this.showQuestion){
			return this.question == '-SELECT-' || !this.reponse || this.reponse.length == 0;
		}
		if(this.showEmail){
			return !this.code || this.code.length == 0;
		}
	}

}
