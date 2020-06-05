import { Component, OnInit } from '@angular/core';
import {StageService} from "../../../services/stage.service";
import {OrganismeService} from "../../../services/organisme.service";
import {OrganismeAccueil} from "../../../models/organisme-accueil.model";
import {Stage} from "../../../models/stage.model";

@Component({
  selector: 'app-ajouter-organisme',
  templateUrl: './ajouter-organisme.component.html',
  styleUrls: ['./ajouter-organisme.component.css']
})
export class AjouterOrganismeComponent implements OnInit {

  constructor(private stageService:StageService,private organismeService:OrganismeService) { }

  ngOnInit(): void {
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



}
