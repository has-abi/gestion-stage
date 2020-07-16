import {Component, OnInit} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {StageService} from "../../../services/stage.service";
import {MembreJury} from "../../../models/membre-jury.model";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
import {Stage} from "../../../models/stage.model";
import {Rapport} from "../../../models/rapport.model";
import {CoordinateurService} from "../../../services/coordinateur.service";
import {LocalStorageService} from "ngx-webstorage";
import {Filiere} from "../../../models/filiere.model";
import {StageCopie} from "../../../models/stage-copie.model";
import {StageMembreJury} from "../../../models/stage-membre-jury.model";
import {StageEtudiant} from "../../../models/stage-etudiant.model";
import {DatePipe} from '@angular/common';
import {StageEncadreur} from "../../../models/stage-encadreur.model";
import {Planning} from "../../../models/planning.model";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  plusInfos = "";
  dateSoutenance: Date = new Date();
  ajouetrJury = false;
  structurer = false;
  encadrantJury = false;
  filiere: Filiere;
  nbre:number;
  planning: Array<Planning> = new Array<Planning>();
  jury: MembreJury = new MembreJury();
  juries: Array<MembreJury> = new Array<MembreJury>();
  stageCopies: Array<StageCopie> = new Array<StageCopie>();

  constructor(private stageService: StageService, private passwordGeneratorService: PasswordGeneratorService, private coordinateurService: CoordinateurService,
              private localStorage: LocalStorageService, private datePipe: DatePipe, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    this.coordinateurService.findByUserId(user.id).subscribe(coord => {
      this.filiere = coord.filiere;
    })
  }

  ajouterJurys(Stages: Array<Stage>) {
  }

  getEncadreur(stageEncadreurs: Array<StageEncadreur>) {
    for (let i = 0; i < stageEncadreurs.length; i++) {
      if (stageEncadreurs[i].encadreur.type == "Encadreur de la faculté") {
        return stageEncadreurs[i].encadreur;
      }
    }
    return null;
  }

  checkExistance(username: string) {
    for (let i = 0; i < this.planning.length; i++) {
      if (this.planning[i].encadrant.user.username == username) {
        return true;
      }
    }
    return false;
  }

  reordonner() {
    let usernames = [];
    let index = 1;
    for (let i = 0; i < this.stages.length; i++) {
      index = 1;
      if (!this.checkExistance(this.getEncadreur(this.stages[i].stageEncadreurs).user.username)) {
        let plann = new Planning();
        plann.encadrant = this.getEncadreur(this.stages[i].stageEncadreurs);
        plann.stages.push(this.stages[i]);
        for (let j = 0; j < this.stages.length; j++) {
          if (this.stages[j].reference != this.stages[i].reference) {
            if (this.getEncadreur(this.stages[j].stageEncadreurs).user.username == this.getEncadreur(this.stages[i].stageEncadreurs).user.username) {
              index++;
              plann.stages.push(this.stages[j]);
            }
          }
        }
        plann.id = index;
        this.planning.push(plann);
      }
    }
    this.notificationService.showInfo("Le plannig est reordonné suivant l'encadrant!", "Le plannig des soutenances")
  }

  makeEncadrantUnJury() {
    if (!this.encadrantJury) {
      if (this.structurer) {
        this.planning.forEach(p => {
          const j = new MembreJury();
          j.user = p.encadrant.user;
          p.jurys.push(j);
          this.juries.push();
        })
      }
      if (!this.structurer) {
        this.stages.forEach(s => {
          const sj = new StageMembreJury();
          sj.membreJury = new MembreJury();
          sj.membreJury.reference = "J"+this.getTime();
          sj.membreJury.user = this.getEncadreur(s.stageEncadreurs).user;
          this.juries.push(sj.membreJury);
          s.stageMembreJuries.push(sj);
        });
      }
      this.notificationService.showInfo("Les encadrants sont ajoutés  comme jury!", "Le planning des soutenances!")
    } else {
      if (this.structurer) {
        this.planning.forEach(p => {
          p.jurys.forEach(j => {
            if (this.checkJury(j)) {
              p.jurys.splice(p.jurys.indexOf(j), 1);
            }
          })
        })
      } else {
        this.stages.forEach(s => {
          s.stageMembreJuries.forEach(sm => {
            if (this.checkJury(sm.membreJury)) {
              s.stageMembreJuries.splice(s.stageMembreJuries.indexOf(sm), 1);
            }
          })
        })
      }
      this.notificationService.showInfo("Les encadrants sont détachés  comme jury!", "Le planning des soutenances!")
    }

  }

  checkJury(m: MembreJury) {
    for (let i = 0; i < this.juries.length; i++) {
      if (m.user.username == this.juries[i].user.username) {
        return true;
      }
    }
    return false;
  }

  get stages(): Array<Stage> {
    return this.stageService.stages;
  }

  generateP() {
    this.jury.user.password = this.passwordGeneratorService.getRandomPassword();
  }

  view() {
    pdfMake.createPdf(this.planningTest()).open();
  }

  fillPlanningTable() {
    this.fillPlannig();
    let body = [];
    let header = [{text: "", fillColor: '#c7c7c7', alignment: "center"}, {
      text: "",
      fillColor: '#c7c7c7',
      alignment: "center"
    }, {
      text: "Nom & Prénom",
      bold: true,
      fontSize: 14,
      fillColor: '#c7c7c7',
      alignment: "center"
    }, {
      text: "Intitulé du sujet PFE",
      bold: true,
      fontSize: 14,
      fillColor: '#c7c7c7',
      alignment: "center"
    }, {text: "Jury", bold: true, fontSize: 14, fillColor: '#c7c7c7', alignment: "center"}];
    body.push(header);
    let salle = "";
    let jury = "";
    let index = 1;
    this.planning.forEach(p => {
      p.stages.forEach(s => {
        let row = [{text: p.locale, fillColor: '#f2f2f2', alignment: "center", rowSpan: p.id}, 'souteance ' + index,
          {text: this.getEtudiants(s.stageEtudiants), bold: true},
          s.sujet,
          {text: this.getJury(p.jurys), bold: true, fillColor: '#f2f2f2', alignment: "center", rowSpan: p.id}
        ];
        body.push(row);
        index++;

      })
    })
    this.updateStages();
    return body;

  }

  getjuryies(Sms: Array<StageMembreJury>): string {
    let j = "";
    let index = 0;
    Sms.forEach(s => {
      if (index != 0) j += "&"
      j += " Pr." + s.membreJury.user.nom;
      index++;
    })
    return j;
  }

  getEtudiants(ses: Array<StageEtudiant>) {
    let e = "";
    ses.forEach(s => {
      console.log(s)
      e += s.etudiant.user.nom + " " + s.etudiant.user.prenom + " \n";
    })
    return e;
  }

  planningTest() {
    return {
      content: [
        {
          text: "Université Cady Ayad                                                              Anneé universitaire " + this.anneeUniversitaire(),
          fontSize: 18,

        },
        {text: "Faculté des sciences et techniques", fontSize: 18},
        {text: "Marrakech", fontSize: 18,},
        {
          text: "Planning des soutenances PFE " + this.filiere.diplome + " " + this.filiere.abbr,
          fontSize: 16,
          bold: true,
          alignment: 'center',
          italics: true,
          decoration: 'underline',
          margin: [0, 0, 20, 0]
        },
        {
          text: "(" + this.filiere.libelle + ")",
          fontSize: 16,
          bold: true,
          alignment: 'center',
          italics: true,
          decoration: 'underline'
        },
        {
          text: "Date : le " + this.datePipe.transform(this.dateSoutenance, 'fullDate'),
          fontSize: 16,
          bold: true,
          margin: [0, 40, 0, 0]
        },
        {text: "(" + this.plusInfos + ") ", fontSize: 16, bold: true, margin: [0, 0, 0, 40]},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            bodyRows: this.nbre,
            widths: [50, 80, '*', '*', 100],
            margin: [0, 0, 0, 60],
            body: this.fillPlanningTable()
          }
        }
      ],
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
    }
  }


  ajouterJury(stage: Stage) {
    this.ajouetrJury = !this.ajouetrJury;
    this.stageService.stage = stage;
  }

  anneeUniversitaire() {
    let date = new Date();
    let yearMin;
    let yearMax;
    if (date.getMonth() == 8 || date.getMonth() == 10 || date.getMonth() == 9 || date.getMonth() == 11) {
      yearMin = date.getFullYear();
      yearMax = yearMin + 1;
    } else {
      yearMax = date.getFullYear();
      yearMin = yearMax - 1;
    }
    return yearMin + "-" + yearMax;
  }

  fillPlannig() {
    let index = 1;
    if (!this.structurer) {
      for (let i = 0; i < this.stages.length; i++) {
        index = 1;
        if (!this.checkLocale(this.stages[i].localeSoutenance)) {
          let plann = new Planning();
          plann.locale = this.stages[i].localeSoutenance;
          plann.encadrant = this.getEncadreur(this.stages[i].stageEncadreurs);
          this.stages[i].stageMembreJuries.forEach(sj => {
            plann.jurys.push(sj.membreJury);
          });
          plann.stages.push(this.stages[i]);
          for (let j = 0; j < this.stages.length; j++) {
            if (this.stages[j].reference != this.stages[i].reference) {
              if (this.stages[i].localeSoutenance == this.stages[j].localeSoutenance) {
                index++;
                plann.stages.push(this.stages[j]);
              }
            }
          }
          plann.id = index;
          this.planning.push(plann);
        }
      }
    }
  }

  checkLocale(locale: string) {
    for (let i = 0; i < this.planning.length; i++) {
      if (this.planning[i].locale == locale) {
        return true;
      }
    }
    return false;
  }

  getJury(js: Array<MembreJury>) {
    let j = "";
    let index = 0;
    js.forEach(ju => {
      if (index != 0) j += "&"
      j += " Pr." + ju.user.nom;
      index++;
    })
    return j;
  }

  updateStages() {
    let passed = true;
    if (this.structurer) {
      if (this.encadrantJury) {
        this.planning.forEach(p => {
          p.stages.forEach(s => {
            const sj = new StageMembreJury();
            sj.membreJury = new MembreJury();
            sj.membreJury.reference = "J" + this.getTime();
            sj.membreJury.profession = p.encadrant.profession;
            sj.membreJury.user = p.encadrant.user;
          })
        })
      }
      this.planning.forEach(p => {
        p.stages.forEach(s => {
          s.dateSoutenance = this.dateSoutenance;
          s.localeSoutenance = p.locale;
          this.stageService.update(s).subscribe(resp => {
            if (resp < 0) {
              passed = false;
            }
          },error => passed = false)
        })
      })
    } else {
     this.stages.forEach(s=>{
       this.stageService.update(s).subscribe(resp=>{
         if(resp<0){
           passed = false;
         }
       },error => passed = false)
     })
    }
    if(passed){
      this.notificationService.showSuccess("les stages sont modifiés avec succès","Le planning des soutenances");
    }else{
      this.notificationService.showError("Erreur est survenu!","Le planning des soutenances");
    }
  }

  getTime() {
    let date = new Date();
    return date.getTime();
  }
}
