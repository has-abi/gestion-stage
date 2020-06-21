import { Component, OnInit } from '@angular/core';
import {TacheService} from "../../../services/tache.service";
import {StageService} from "../../../services/stage.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Tache} from "../../../models/tache.model";
import {Etudiant} from "../../../models/etudiant.model";
import {Stage} from "../../../models/stage.model";
declare let bootbox:any;
@Component({
  selector: 'app-main-encadreur',
  templateUrl: './main-encadreur.component.html',
  styleUrls: ['./main-encadreur.component.css']
})
export class MainEncadreurComponent implements OnInit {
  updateTache = {
    update: false,
    tache: ""
  }
  ajouterTache = false;
  showTaches = {
    show: false,
    ref: ""
  }
  showEtud = false;
  showStructure = false;
  tache: Tache = new Tache();
  etudiant: Etudiant = new Etudiant();
  deleteTache = false;

  constructor(private tacheService: TacheService, private stageService: StageService, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.stageService.findByEncadreurId(3, 0, 10);
  }

  get stagePage() {
    return this.stageService.stagePage;
  }

  get taches() {
    return this.tacheService.taches;
  }

  showEtudiant(e: Etudiant) {
    if (this.etudiant.id == e.id) {
      this.showEtud = false;
    } else {
      this.etudiant = e;
      this.showEtud = true;
    }
  }

  loadTaches(ref: string) {
    if (ref == this.showTaches.ref) {
      this.showTaches.show = false;
      this.showTaches.ref = "";
    } else {
      this.tacheService.findByStageRef(ref).subscribe(datas => {
        this.tacheService.taches = datas;
        this.showTaches.ref = ref;
        this.showTaches.show = true;
      })
    }

  }

  affecterTache(stage: Stage) {
    if (this.ajouterTache) {
      this.tache.stage = stage;
      this.tache.encadreur = stage.stageEncadreurs[0].encadreur;
      const d = new Date();
      this.tache.reference = "T" + d.getTime();
      this.tacheService.create(this.tache).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Tâche affecter avec succée!", {cssClass: 'alert-success', timeout: 5000});
          this.ajouterTache = false;
          this.loadTaches(stage.reference);
          this.tache = new Tache();
        } else {
          this.flashMessagesService.show("Erreur dans l'affectation!!", {cssClass: 'alert-danger', timeout: 5000});
        }
      })
    } else if (this.updateTache) {
      this.tacheService.update(this.tache).subscribe(resp => {
        if (resp > 0) {
          this.flashMessagesService.show("Tâche Modifier avec succée!", {cssClass: 'alert-success', timeout: 5000});
          this.updateTache.update = false;
          this.updateTache.tache = ""
          this.tache = new Tache();
          } else {
          this.flashMessagesService.show("Erreur dans la modification!!", {cssClass: 'alert-danger', timeout: 5000});
        }
      })
    }
  }

  showUpdate(tache: Tache) {
    if (this.updateTache.tache == tache.reference) {
      this.updateTache.update = false;
      this.updateTache.tache = ""
    } else {
      this.updateTache.update = true;
      this.updateTache.tache = tache.reference;
	    this.tache = tache;
    }
  }
 delete = (tache:Tache,stage:Stage) =>{
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer cette tache?",
      buttons: {
        confirm: {
          label: 'Confirmer',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler',
          className: 'btn-danger'
        }
      },
      callback:(result)=>{
        if(result){
          this.remove(tache,stage);
        }
      }
    })
 }

remove(tache:Tache,stage:Stage){
    this.tacheService.deleteByReference(tache.reference).subscribe(resp=>{
      if (resp > 0) {
        this.flashMessagesService.show("Tâche supprimer avec succée!", {cssClass: 'alert-success', timeout: 5000});
          this.loadTaches(stage.reference);
      } else {
        this.flashMessagesService.show("Erreur dans la suppression!!", {cssClass: 'alert-danger', timeout: 5000});
      }
    })
}




}
