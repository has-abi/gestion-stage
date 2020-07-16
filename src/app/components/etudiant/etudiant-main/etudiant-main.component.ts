import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {Stage} from "../../../models/stage.model";
import {Encadreur} from "../../../models/encadreur.model";
import {MembreJury} from "../../../models/membre-jury.model";
import {StageService} from "../../../services/stage.service";
import {RapportService} from "../../../services/rapport.service";
import {EncadreurService} from "../../../services/encadreur.service";
import {TacheService} from "../../../services/tache.service";
import {Tache} from "../../../models/tache.model";
import {RapportTache} from "../../../models/rapport-tache.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Rapport} from "../../../models/rapport.model";
import {LocalStorageService} from "ngx-webstorage";
import {User} from "../../../models/user.model";
import {ConventionService} from "../../../services/convention.service";
import {StageEncadreur} from "../../../models/stage-encadreur.model";
import {NotificationService} from "../../../services/notification.service";

declare let bootbox: any;

@Component({
  selector: 'app-etudiant-main',
  templateUrl: './etudiant-main.component.html',
  styleUrls: ['./etudiant-main.component.css']
})
export class EtudiantMainComponent implements OnInit {
  showEnca = false;
  showJury = false;
  ajouterSujet = false;
  EncadreurToBeShowen: Encadreur;
  juryToBeShowen: MembreJury;
  showOrganisme = false;
  showContent = {
    show: false,
    tache: ""
  }
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  rapportTache: RapportTache = new RapportTache();
  updateRT = {
    update: false,
    tache: ""
  }
  conventioner = false;

  constructor(private etudiantService: EtudiantService, private stageService: StageService, private rapportService: RapportService,
              private encadreurService: EncadreurService, private tacheService: TacheService, private localStorage: LocalStorageService,
              private notificationService: NotificationService, private conventionService: ConventionService) {
  }

  ngOnInit(): void {
    if (this.localStorage.retrieve("firstLogin")) {
      this.notificationService.showInfo("Bienvenu sur l'application de gestion et de suivi des stages", this.logedUser.nom + " " + this.logedUser.prenom);
      this.localStorage.store("firstLogin", false);
    }
    this.stageService.etudiantActiveStages(this.logedUser.id).subscribe(s => {
      this.stageService.stage = s
      this.tacheService.findByStageRef(s.reference).subscribe(data => {
        this.tacheService.taches = data;
      })
    }, error => {
      this.notificationService.showError('Erreur est survenu lors de chargement des tâches!', "La list des tâches")
    });
  }

  get logedUser(): User {
    return this.localStorage.retrieve("logedUser");
  }

  checkEncadrant(ses: Array<StageEncadreur>): boolean {
    for (let i = 0; i < ses.length; i++) {
      if (ses[i].encadreur.type == "Encadreur de l'organisme") return true;
    }
    return false;
  }

  selectFile(event) {
    this.selectedFile = event.target.files;
    this.rapportService.fileIsSelected = true;
  }

  get stage(): Stage {
    return this.stageService.stage;
  }

  setStageRef(ref: string) {
    this.rapportService.stageRef = ref;
  }

  showTache(tache: Tache) {
    this.tacheService.tache = tache;
  }

  get encadreur() {
    return this.encadreurService.encadreur;
  }

  showEncadreur(e: Encadreur) {
    this.showEnca = !this.showEnca;
    this.EncadreurToBeShowen = e;
  }

  get tache(): Tache {
    return this.tacheService.tache;
  }

  findAllTaches() {
    return this.tacheService.findAllTaches();
  }

  get taches() {
    return this.tacheService.taches;
  }

  tacheRef(ref: string) {
    this.rapportService.tacheRef = ref;
  }

  updateRapportTache(tache: Tache) {
    if (tache.reference != this.updateRT.tache) {
      this.updateRT.update = true;
      this.updateRT.tache = tache.reference;
      this.rapportTache = tache.rapportTache;
    } else {
      this.updateRT.tache = "";
      this.updateRT.update = false;
    }

  }

  showContenu(tache: Tache) {
    if (this.showContent.tache != tache.reference) {
      this.showContent.tache = tache.reference;
      this.showContent.show = true;
    } else {
      this.showContent.tache = "";
      this.showContent.show = false;
    }
  }

  update(tache: Tache) {
    this.rapportService.tacheRef = tache.reference;
    this.progress = 0;
    this.currentFile = this.selectedFile.item(0);
    this.rapportService.update(this.currentFile, this.rapportTache.document.titre, this.rapportTache.descreption, tache.rapportTache.reference).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'On ne peut pas uploder le fichier!';
        this.currentFile = undefined;
      });

    this.selectedFile = undefined;
  }

  diaplayRapport(rapport: Rapport) {
    this.rapportService.rapport = rapport;
  }

  showjury(j: MembreJury) {
    this.juryToBeShowen = j;
    this.showJury = !this.showJury;
  }

  effectuerTache(t: Tache) {
    this.tacheService.effectuerTache(t.reference).subscribe(resp => {
        if (resp > 0) {
          t.effectuer = true;
          this.notificationService.showSuccess('La tâche est terminé!', "Gestion des tâches")
        } else {
          this.notificationService.showWarning('Erreur dans la modification du tâche!', "Gestion des tâches")
        }
      },
      error => {
        this.notificationService.showError('Erreur est survenu!', "Gestion des tâches")
      })
  }

  checkExpiredStage() {
    if ((this.stage.dateSoutenance == undefined || this.stage.dateSoutenance == null) && !this.checkFinStage()) return false;
    else {
      let dateSout = new Date(this.stage.dateSoutenance);
      let current = new Date();
      if (dateSout.getTime() < current.getTime()) return true;
      else return false;
    }
  }

  conventionSet() {
    if (!this.validateConvention(this.stage)) {
      this.conventioner = true;
      this.conventionService.convention.organisme = this.stage.organismeAccueil;
      this.conventionService.convention.dateDebutStage = this.getFormatDate(this.stage.dateDebut);
      this.conventionService.convention.dateFinStage = this.getFormatDate(this.stage.dateFin);
      this.conventionService.convention.durreStage = this.getDiffMonth(this.stage.dateDebut, this.stage.dateFin);
      this.stage.stageEtudiants.forEach(se => {
        if (se.etudiant.user.id == this.logedUser.id) {
          this.conventionService.convention.etudiantCne.push(se.etudiant.cin);
        }
      })

      this.stage.stageEncadreurs.forEach(se => {
        if (se.encadreur.type == "Encadreur de la faculté") {
          this.conventionService.convention.encadreurFaculte = se.encadreur;
        } else {
          this.conventionService.convention.encadreurStructure = se.encadreur;
        }
      })
      this.conventionService.convention.sujetStage = this.stage.sujet;
    } else {
      this.chargerConvention();
    }

  }

  chargerConvention = () => {
    bootbox.confirm({
      message: "les champ de la convention sont incomplte! ",
      buttons: {
        confirm: {
          label: 'Confirmer',
          className: 'btn-info'
        }
      },
      callback: (result) => {
      }
    });
  }

  validateConvention(stage: Stage) {
    return !stage.sujet || stage.stageEncadreurs.length < 1 || !stage.organismeAccueil.email || !stage.organismeAccueil.responsable ||
      !stage.organismeAccueil.teleFix || !stage.organismeAccueil.raisonSociale || !stage.organismeAccueil.tele;
  }

  checkFinStage() {
    let timeFinStage = new Date(this.stage.dateFin);
    let dateCurrent = new Date;
    let currentTime = dateCurrent.getTime();
    if (currentTime > timeFinStage.getTime()) return true;
    else return false;
  }

  updateStage() {
    this.stageService.update(this.stage).subscribe(resp => {
      if (resp > 0) {
        this.notificationService.showSuccess('Stage est modifié avec succès!', "Les informations du Stage")
      } else {
        this.notificationService.showWarning('Erreur dans la modification du stage!', "Les informations du Stage")
      }
    }, error => {
      this.notificationService.showError('Erreur dans la modification du stage!', "Les informations du Stage")
    })
  }

  set ajouterOrganisme(value: boolean) {
    this.stageService.ajouterOrganisme = value;
  }

  get ajouterOrganisme() {
    return this.stageService.ajouterOrganisme;
  }

  getFormatDate(d: Date): string {
    let date = new Date(d);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }

  getDiffMonth(date1: Date, date2: Date) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}

