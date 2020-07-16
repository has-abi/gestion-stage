import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../services/tache.service";
import {StageService} from "../../../services/stage.service";
import {Tache} from "../../../models/tache.model";
import {Etudiant} from "../../../models/etudiant.model";
import {Stage} from "../../../models/stage.model";
import {NotificationService} from "../../../services/notification.service";

declare let bootbox: any;

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
  showEtud = {
    show: true,
    ref: ""
  }

  showStructure = {
    show: true,
    ref: ""
  }
  tache: Tache = new Tache();
  etudiant: Etudiant = new Etudiant();
  deleteTache = false;

  constructor(private tacheService: TacheService, private stageService: StageService,
              private notificationService:NotificationService) {
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

  showEtudiant(e: Etudiant, s: Stage) {
    if (this.etudiant.id = e.id) {
      this.showEtud.show = false;
      this.showEtud.ref = "";
    } else {
      this.showEtud.ref = s.reference;
      this.showEtud.show = true;
      this.etudiant = e;
    }
  }

  showStructures(s: Stage) {
    if (this.showStructure.ref == s.reference) {
      this.showStructure.show = false;
      this.showStructure.ref = "";
    } else {
      this.showStructure.show = true;
      this.showStructure.ref = s.reference;
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
          this.notificationService.showSuccess("Tâche affecter avec succès!", "Gestion des tâches");
          this.ajouterTache = false;
          this.loadTaches(stage.reference);
          this.tache = new Tache();
        } else {
          this.notificationService.showWarning("Erreur dans l'affectation!!", "Gestion des tâches");
        }
      }, error => {
        this.notificationService.showError("Erreur est survenu!!", "Gestion des tâches");
      })
    } else if (this.updateTache) {
      this.tache.stage = stage;
      this.tache.encadreur = stage.stageEncadreurs[0].encadreur;
      this.tacheService.update(this.tache).subscribe(resp => {
        if (resp > 0) {
          this.notificationService.showSuccess("Tâche Modifier avec succès!", "Gestion des tâches");
          this.updateTache.update = false;
          this.updateTache.tache = ""
          this.tache = new Tache();
        } else {
          this.notificationService.showWarning("Erreur dans la modification!!", "Gestion des tâches");
        }
      }, error => {
        this.notificationService.showError("Erreur est survenu!!", "Gestion des tâches");
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

  delete = (tache: Tache, stage: Stage) => {
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer cette tâche?",
      buttons: {
        confirm: {
          label: 'Confirmer <i class="fa fa-check"></i>',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler <i class="fa fa-times"></i>',
          className: 'btn-danger'
        }
      },
      callback: (result) => {
        if (result) {
          this.remove(tache, stage);
        }
      }
    })
  }

  remove(tache: Tache, stage: Stage) {
    this.tacheService.deleteByReference(tache.reference).subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess("Tâche supprimer avec succès!", "Gestion des tâches");
        this.loadTaches(stage.reference);
      } else {
        this.notificationService.showWarning("Erreur dans la suppression!!", "Gestion des tâches");
      }
    }, error => {
      this.notificationService.showError("Erreur est survenu!!", "Gestion des tâches");
    })
  }

  validerTache(tache: Tache, stage: Stage) {
    this.tacheService.validerTache(tache.reference).subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess("Tâche valider avec succès!", "Gestion des tâches");
        this.loadTaches(stage.reference);
      } else {
        this.notificationService.showWarning("Erreur dans la validation!!", "Gestion des tâches");
      }
    }, error => {
      this.notificationService.showError("Erreur est survenu!!", "Gestion des tâches");
    })

  }


}
