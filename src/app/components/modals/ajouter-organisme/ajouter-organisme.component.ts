import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {OrganismeService} from "../../../services/organisme.service";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";
import {Stage} from "../../../models/stage.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-ajouter-organisme',
  templateUrl: './ajouter-organisme.component.html',
  styleUrls: ['./ajouter-organisme.component.css']
})
export class AjouterOrganismeComponent implements OnInit {
  ajouterOrg = false;
  constructor(private stageService:StageService,private organismeService:OrganismeService,
              private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.organismeService.findAll();
  }

	get ajouterOrganisme(){
	return this.stageService.ajouterOrganisme;
	}
	set ajouterOrganisme(value:boolean){
		this.stageService.ajouterOrganisme = value;
	}
  get organismes(){
    return this.organismeService.organismeAcceuils;
  }

  get stage(){
    return this.stageService.stage;
  }
  get organismeAccueil(){
    return this.organismeService.organismeAcceuil;
  }
  dismissOrganisme(){
    this.stageService.stage = new Stage();
    this.organismeService.organismeAcceuil = new OrganismeAccueil();
  }
  get MessgErrors(){
    return this.stageService.stageMessage;
  }
  addOrg(o:OrganismeAccueil){
    this.stage.organismeAccueil = o;
  }

  update(){
    this.stageService.update(this.stage).subscribe(resp=>{
      if(resp>0){
        this.notificationService.showSuccess('La structure est modifié avec succès!', "Orgaismes d'accueil")
      }else{
        this.notificationService.showWarning('Erreur dans la modification!', "Orgaismes d'accueil")
      }
    },error => {
      this.notificationService.showError('Erreur est survenu!', "Orgaismes d'accueil")
    });
  }

}
