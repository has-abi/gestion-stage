import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {StageService} from "../../../services/stage.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";
import {TacheService} from "../../../services/tache.service";

@Component({
  selector: 'app-etudiant-navbar',
  templateUrl: './etudiant-navbar.component.html',
  styleUrls: ['./etudiant-navbar.component.css']
})
export class EtudiantNavbarComponent implements OnInit {
  searchInput:string;
  searching = false;
  constructor(private etudiantService:EtudiantService,private stageService: StageService,private tacheService :TacheService) { }

  ngOnInit(): void {
    this.tacheService.findAllTaches();
  }
  search(){


  }
  get encadreurs(): Array<Encadreur> {
 return  this.etudiantService.encadreurs;
  }
  showAllTaches(){
    return this.tacheService.findAllTaches();
  }
}
