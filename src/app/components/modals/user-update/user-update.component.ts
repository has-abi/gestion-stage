import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Role} from "../../../models/role.model";
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {CoordinateurService} from "../../../services/coordinateur.service";
import {JuryService} from "../../../services/jury.service";
import {User} from "../../../models/user.model";
import {Encadreur} from "../../../models/encadreur.model";
import {MembreJury} from "../../../models/membre-jury.model";
import {Coordinateur} from "../../../models/coordinateur.model";
import {ConfigurationService} from "../../../services/configuration.service";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  password = "";
  rpp = "";
  constructor(private userService:UserService,private flashMessagesService:FlashMessagesService,private etudiantService:EtudiantService,
              private encadreurService:EncadreurService,private coordinateurService:CoordinateurService,
              private juryService:JuryService,private configurationService:ConfigurationService,private passwordGeneratorService:PasswordGeneratorService) { }

  ngOnInit(): void {

    this.userService.getRoles();
    this.configurationService.getAllFilieres();
    if(this.checkEtdudiant(this.user) ==  false){
      this.coordinateur.reference.length > 0 ? this.rpp = this.coordinateur.reference : this.encadreur.reference.length>0 ? this.rpp =
        this.coordinateur.reference : this.rpp = this.jury.reference;
    }
  }
  get etudiant(){
    return this.etudiantService.etudiant;
  }
  get encadreur(){
    return this.encadreurService.encadreur;
  }
  get coordinateur(){
    return this.coordinateurService.coordinateur;
  }
  get jury(){
    return this.juryService.jury;
  }
  fillPwd(){
    this.password = this.passwordGeneratorService.getRandomPassword();
  }
	checkRole(role){
		if(this.user.roles.filter(r=>r.role == role.role)!= []){
			return true
		}else{
		return false;
		}
	}
  validate(){
    let checkUser = this.user.nom.length== 0 || this.user.prenom.length == 0 || this.user.email.length == 0 || this.user.roles.length == 0;
    if(this.checkEtdudiant(this.user)){
      return checkUser || !this.etudiant.cin ||this.etudiant.cin.length == 0  || !this.etudiant.codeAppoge ||this.etudiant.codeAppoge.length == 0;
    }else if(this.check(this.user,"COORDINATEUR_ROLE")){
      return checkUser ||!this.rpp || this.rpp.length == 0 || !this.coordinateur.filiere.libelle ||this.coordinateur.filiere.libelle.length == 0;
    }else{
      return !this.rpp || this.rpp.length == 0 || checkUser;
    }
  }

  addRoles(role:Role){
    if(this.user.roles.filter(r=>r.role == role.role) == []){
      if(this.checkEtdudiant(this.user) && role.role!="ETUDIANT_ROLE")
      this.user.roles.push(role);
    }else {
      this.user.roles.splice(this.user.roles.indexOf(role),1);
    }
  }
  get filieres(){
    return this.configurationService.filieres;
  }
  updateEtudiant(){
      this.etudiant.user = this.user;
      this.etudiantService.update(this.etudiant).subscribe(resp=>{
        if (resp > 0) {
          this.flashMessagesService.show("Etudiant modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
          this.userService.user = new User();
        } else {
          this.flashMessagesService.show("Erreur dans la modification!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      })
  }
  updateEncadreur(){
      this.encadreur.user = this.user;
      this.encadreur.reference = this.rpp;
      this.encadreurService.update(this.encadreur).subscribe(resp=>{
        if (resp > 0) {
          this.flashMessagesService.show("Encadreur modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
          this.userService.user = new User();
        } else {
          this.flashMessagesService.show("Erreur dans la modification!", {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      })
  }
  updateJury(){
    this.jury.user = this.user;
    this.jury.reference = this.rpp;
    this.juryService.update(this.jury).subscribe(resp=>{
      if (resp > 0) {
        this.flashMessagesService.show("Jury modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
        this.userService.user = new User();
      } else {
        this.flashMessagesService.show("Erreur dans la modification!", {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })
  }
  updateCoordinateur(){
    this.coordinateur.user = this.user;
    this.coordinateur.reference = this.rpp;
    this.coordinateurService.update(this.coordinateur).subscribe(resp=>{
      if (resp > 0) {
        this.flashMessagesService.show("Coordinateur modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessagesService.show("Erreur dans la modification!", {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })
  }
  update(){
    if(this.password.length>0){
      this.user.motPass = this.password;
    }
    if(this.check(this.user,"ENCADREUR_ROLE")){
      this.updateEncadreur();
    }
     if(this.check(this.user,"JURY_ROLE")){
      this.updateJury();
    }
     if(this.check(this.user,"COORDINATEUR_ROLE")){
      this.updateCoordinateur()
    }
     if(this.checkEtdudiant(this.user)){
       this.updateEtudiant()
     }
  }
  get roles(){
    return this.userService.roles;
  }
  get user(){
   return  this.userService.user;
  }
  checkEtdudiant(user:User):boolean{
    let check = false;
    if(user.roles.length == 1 || user.roles[0].role == "ETUDIANT_ROLE"){
      check =true;
    }
    return check;
  }
  check(user:User,role:string):boolean{
    let check = false;
    for(let i=0;i<user.roles.length;i++){
      if(user.roles[i].role == role) check = true;
    }
    return check;
  }
}
