import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConfigurationService} from "../../../services/configuration.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {CoordinateurService} from "../../../services/coordinateur.service";
import {JuryService} from "../../../services/jury.service";
import {User} from "../../../models/user.model";
import {Filiere} from "../../../models/filiere.model";
import {Coordinateur} from "../../../models/coordinateur.model";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm;
  role ;
  selectedFiliere:Filiere;

  constructor(private userService:UserService,private passwordGeneratorService:PasswordGeneratorService
              ,private flashMessagesService:FlashMessagesService,private configurationService:ConfigurationService,
              private formBuilder:FormBuilder,private etudiantService:EtudiantService,private encadreurService:EncadreurService,
              private coordinateurService:CoordinateurService,private juryService:JuryService,private notificationService:NotificationService) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      unom: new FormControl('',[
        Validators.required
      ]),
      uprenom: new FormControl('',[
        Validators.required
      ]),
      uemail: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      upwd: new FormControl({value: '', disabled: true}, Validators.required
      ),
      cne: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      codeAppoge: new FormControl('',[
        Validators.required
      ]),
      rpp: new FormControl('',[
        Validators.required
      ])
    });
  }

  get user(){
    return this.userService.user;
  }

  get password(){
    return this.passwordGeneratorService.getRandomPassword();
  }
  get filieres(){
    return this.configurationService.filieres;
  }

  create(userData){
    const user = new User();
    user.nom = userData.unom;
    user.prenom = userData.uprenom;
    user.username = userData.uemail;
    user.password = this.upwd.value
	console.log(this.role);
    if(this.role == '1'){
      const e = new Etudiant();
      e.user = user;
      e.cin = userData.cne;
      e.codeAppoge = userData.codeAppoge;
      this.etudiantService.createEtudiant(e).subscribe(resp=>{
        if(resp>0){
          this.notificationService.showSuccess(userData.unom+" crée avec succès!", "Gestion des étudiants");
          }else{
          this.notificationService.showWarning("erreur dans la création de l'etudiant!", "Gestion des étudiants");
        }
      },error => {
        this.notificationService.showError("Erreur survenu!","Gestion des étudiants")
      })
    }

    if(this.role == '2'){
      const c = new Coordinateur();
      c.reference = userData.rpp;
      c.filiere = this.selectedFiliere;
	  c.user = user;
      this.coordinateurService.createCoordinateur(c).subscribe(resp=>{
		  console.log(resp)
        if(resp>0){
          this.notificationService.showSuccess(userData.unom+" est crée avec succès!", "Gestion des coordinateurs");
        }else{
          this.notificationService.showWarning("erreur dans la création du coordinateur!", "Gestion des coordinateurs");
        }
      },error => {
        this.notificationService.showError("erreur est survenu","Gestion des coordinateurs");
      })

    }
  }
  get unom(){
    return this.userForm.get('unom');
  }
  get uprenom(){
    return this.userForm.get('uprenom')
  }
  get uemail(){
    return this.userForm.get('uemail')
  }
  get upwd(){
    return this.userForm.get('upwd')
  }
  get cne(){
    return this.userForm.get('cne')
  }
  get codeAppoge(){
    return this.userForm.get('codeAppoge');
  }
  get rpp(){
    return this.userForm.get('rpp');
  }

  validate(){
    return this.unom.errors != null || this.uprenom.errors != null || this.uemail.errors != null || this.upwd.value.length == 0
      || !this.role || (this.role == '1' && (this.cne.errors != null || this.codeAppoge.errors != null ) ) ||
      (this.role =='2'&&  (this.rpp.errors != null || !this.selectedFiliere));
  }
}
