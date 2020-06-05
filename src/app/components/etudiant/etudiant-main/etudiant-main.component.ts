import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";
import {StageService} from "../../../services/stage.service";
import {RapportService} from "../../../services/rapport.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {TacheService} from "../../../services/tache.service";
import {Tache} from "../../../models/tache.model";

@Component({
  selector: 'app-etudiant-main',
  templateUrl: './etudiant-main.component.html',
  styleUrls: ['./etudiant-main.component.css']
})
export class EtudiantMainComponent implements OnInit {
  showEnca = false;
  EncadreurToBeShowen:Encadreur;
  constructor(private etudiantService:EtudiantService,private stageService:StageService,private rapportService:RapportService,private encadreurService:EncadreurService,private tacheService:TacheService) { }

  ngOnInit(): void {
    this.stageService.findById(1);
    this.tacheService.findByStageRef("stage123").subscribe(data=>{
      this.tacheService.taches = data;
    })
    console.log(this.taches);
  }
  public uploadRapport(file:File,titre:string){
  }

  get stage(): Stage {
    return this.stageService.stage;
  }
  setStageRef(ref:string){
    this.rapportService.stageRef = ref;
  }
  showTache(tache:Tache){
    this.tacheService.tache = tache;
  }
  get encadreur(){
    return this.encadreurService.encadreur;
  }
  showEncadreur(e:Encadreur){
    this.showEnca = !this.showEnca;
    this.EncadreurToBeShowen = e;
  }
  get tache(): Tache {
    return this.tacheService.tache;
  }
  findAllTaches(){
    return this.tacheService.findAllTaches();
  }
  validerTache(tache :Tache){
    this.tacheService.validerTache(tache);
  }
  get taches(){
    return this.tacheService.taches;
  }

}

