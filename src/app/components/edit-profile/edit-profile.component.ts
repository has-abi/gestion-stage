import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {UserService} from "../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editInfos = {
    "nom":false,
    "prenom":false,
    "email":false,
    "pwd":false,
    "adress":false,
    "tele":false,
    "sexe":false,
    "dateNaissance":false,
    "photo":false,
    "question":false
  }
  newPassword;
  OldPassword;
  validatePassword = false;
  question;
  reponse="";
  picture;
  securityData = false;
  constructor(private localStorage:LocalStorageService,private userService:UserService,private flashMessagesService:FlashMessagesService,
              private notificationService:NotificationService) { }
  ngOnInit(): void {
    this.profilePic();
      const logeduser = this.localStorage.retrieve("logedUser");
      this.userService.user = logeduser;
  }
  profilePic(){
    const user = this.localStorage.retrieve("logedUser");
    if(user.photo && user.photo != null){
      this.picture = 'http://localhost:8091/gestion-stage-api/user/image/'+user.photo;
    }else{
      this.picture = '../../../../assets/unnamed.png';
    }
  }

  get user(){
    return this.userService.user;
  }

  update(){
    this.userService.updateUser().subscribe(resp=>{
      if(resp>0){
		    this.userService.findByReference(this.user.reference).subscribe(user=>{
			  this.localStorage.store('logedUser',user);
		  })
        this.notificationService.showSuccess("Votre information sont modifiés avec succès","Les information personnels")
      }else{
        this.notificationService.showWarning("Erreur dans la modification des informations!","Les information personnels")
      }
    },err=>{
      this.notificationService.showError("Erreur est survenu!","Les information personnels");
    })
  }
  checkPassword(){
    const user = this.localStorage.retrieve("logedUser");
    this.userService.checkPassword(user.reference,this.OldPassword).subscribe(resp=>{
      if(resp>0){
        this.validatePassword = true;
        if(this.editInfos.question && (this.reponse && this.reponse.length>0)){
          this.user.question = this.question;
          this.user.reponce = this.reponse;
			this.editInfos.question = false;
			this.flashMessagesService.show("La question de sécurité est changer avec succès, veillez enregistrer les changement!", { cssClass: 'alert-success', timeout: 5000 })
          }
        if(this.editInfos.pwd && this.newPassword && this.newPassword!="" && this.newPassword!=null){
          this.user.password = this.newPassword;
		  this.editInfos.pwd = false;
		  this.flashMessagesService.show("Mot de passe est changer avec succès, veillez enregistrer les changement!", { cssClass: 'alert-success', timeout: 5000 })
        }
      }else{
        this.flashMessagesService.show("Mot de passe incorrect!", { cssClass: 'alert-danger', timeout: 5000 })
      }
    },error => {
      this.flashMessagesService.show("Erreur est survenu!", { cssClass: 'alert-danger', timeout: 5000 })
    })
  }

}
