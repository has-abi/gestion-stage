import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";

@Component({
  selector: 'app-etudiant-main',
  templateUrl: './etudiant-main.component.html',
  styleUrls: ['./etudiant-main.component.css']
})
export class EtudiantMainComponent implements OnInit {

  constructor(private etudiantService:EtudiantService) { }

  ngOnInit(): void {
  }
  public uploadRapport(file:File,titre:string){
    this.etudiantService.upload(file,titre);
  }

  get stage(): Stage {

    return this.etudiantService.stage;
  }
  get encadrant(): Encadreur {

    return this.etudiantService.encadrant;
  }

}
