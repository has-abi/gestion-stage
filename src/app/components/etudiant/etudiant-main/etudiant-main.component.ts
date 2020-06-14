import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";
import {StageService} from "../../../services/stage.service";
import {RapportService} from "../../../services/rapport.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {TacheService} from "../../../services/tache.service";
import {Tache} from "../../../models/tache.model";
import {RapportTache} from "../../../models/rapport-tache.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Rapport} from "../../../models/rapport.model";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-etudiant-main',
  templateUrl: './etudiant-main.component.html',
  styleUrls: ['./etudiant-main.component.css']
})
export class EtudiantMainComponent implements OnInit {
  showEnca = false;
  EncadreurToBeShowen:Encadreur;
  showOrganisme = false;
  showContent = {
    show:false,
    tache:""
  }
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  rapportTache:RapportTache = new RapportTache();
  updateRT = {
    update:false,
    tache:""
  }
  constructor(private etudiantService:EtudiantService,private stageService:StageService,private rapportService:RapportService,
              private encadreurService:EncadreurService,private tacheService:TacheService,private sessionStorage:LocalStorageService) { }

  ngOnInit(): void {
    const logedUser = this.sessionStorage.retrieve("logedUser");
    this.stageService.findById(logedUser.id).subscribe(s=>{
      this.stageService.stage = s;
      this.tacheService.findByStageRef(s.reference).subscribe(data=>{
        this.tacheService.taches = data;
      })
    });
    console.log(this.taches);
  }
  public uploadRapport(file:File,titre:string){
  }
  selectFile(event) {
    this.selectedFile = event.target.files;
    this.rapportService.fileIsSelected = true;
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

  get taches(){
    return this.tacheService.taches;
  }

  tacheRef(ref:string){
    this.rapportService.tacheRef = ref;
  }

  updateRapportTache(tache:Tache){
    if(tache.reference != this.updateRT.tache){
      this.updateRT.update = true;
      this.updateRT.tache = tache.reference;
      this.rapportTache = tache.rapportTache;
    }else{
      this.updateRT.tache = "";
      this.updateRT.update = false;
    }

  }

  showContenu(tache:Tache){
    if(this.showContent.tache != tache.reference){
      this.showContent.tache = tache.reference;
      this.showContent.show = true;
    }else{
      this.showContent.tache = "";
      this.showContent.show = false;
    }
  }
  update(tache:Tache){
    this.rapportService.tacheRef = tache.reference;
	console.log(this.rapportService.tacheRef)
    this.progress = 0;
    this.currentFile = this.selectedFile.item(0);
    this.rapportService.update(this.currentFile,this.rapportTache.document.titre,this.rapportTache.descreption,tache.rapportTache.reference).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFile = undefined;
  }
  diaplayRapport(rapport:Rapport){
    this.rapportService.rapport = rapport;
  }


}

