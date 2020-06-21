import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  plusInfos = "";
  dateSoutenance:Date = new Date();
  ajouetrJury = false;
  filiere:Filiere;  jury:MembreJury = new MembreJury();
  juries:Array<MembreJury> = new Array<MembreJury>();
  stageCopies:Array<StageCopie> = new Array<StageCopie>();
  constructor(private stageService:StageService,private passwordGeneratorService:PasswordGeneratorService,private coordinateurService:CoordinateurService,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.localStorage.retrieve("logedUser");
    this.coordinateurService.findByUserId(user.id).subscribe(coord=>{
      this.filiere = coord.filiere;
    })
    this.fillStageCopies();

  }
  get stages():Array<Stage>{
    return this.stageService.stages;
  }
  generateP(){
    this.jury.user.password = this.passwordGeneratorService.getRandomPassword();
  }
  planning(){
    return {
      content:[
        {text:"Université Cady Ayad                                                              Anneé universitaire:2019-2020",fontSize:18},
        {text:"Faculté des sciences et techniques",fontSize:18},
        {text:"Marrakech",fontSize:18},
        {text:"Planning des soutenances PFE de la licence SIR ",fontSize:16,bold:true,alignment:'center', italics: true,decoration:'underline',margin:[0,0,20,0]},
        {text:"(Systèmes Informatiques Répartis)",fontSize:16,bold:true,alignment:'center', italics: true,decoration:'underline'},
        {text:"Date : le Mardi 18 Juin ",fontSize:16,bold:true,margin:[0,40,0,0]},
        {text:"(Les soutenances commenceront à 9h00) ",fontSize:16,bold:true,margin:[0,0,0,40]},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            bodyRows:5,
            widths: [ 50,80, '*', '*', 100 ],
            margin:[0,0,0,60],
            body: [
              [ {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"Nom & Prénom",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"}, {text:"Intitulé du sujet PFE",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"},{text:"Jury",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"} ],
              [ {text:"Salle 1",bold:true,fillColor:'#ebebeb',margin:[0,80,0,0],rowSpan:5,alignment:'center'}, 'Soutenance 2', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'APPLICATION WEB POUR LA GESTION DES ABSENCES  ',{text:"Laila Amir & Laila Amir",rowSpan:5,bold:true,margin:[0,80,0,0],fillColor:'#ebebeb'} ],
              [ '', 'Soutenance 3', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Devellopement d’uneapplication JEE d’intéractions médicamenteuses   ',{text:"Pr. AMIR   & Pr.Bencharef",fontSize:16,bold:true }],
              [ '', 'Soutenance 4', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 1 : Gestion du personnel de l’aéroport de Marrakech   ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 2 : Gestion du matériel technique de l’aéroport de Marrakech  ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Conception et développement d’une plateforme de gestion de maintenance assistée par ordinateur (GMAO) À l’Office Nationale Des Aéroports  ','' ],

            ]
          }
        },{
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            bodyRows:5,
            widths: [ 50,80, '*', '*', 100 ],
            margin:[0,60,0,60],
            pageBreak: 'before',
            body: [
              [ {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"Nom & Prénom",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"}, {text:"Intitulé du sujet PFE",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"},{text:"Jury",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"} ],
              [ {text:"Salle 1",bold:true,fillColor:'#ebebeb',margin:[0,80,0,0],rowSpan:5,alignment:'center'}, 'Soutenance 2', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'APPLICATION WEB POUR LA GESTION DES ABSENCES  ',{text:"Laila Amir & Laila Amir",rowSpan:5,bold:true,margin:[0,80,0,0],fillColor:'#ebebeb'} ],
              [ '', 'Soutenance 3', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Devellopement d’uneapplication JEE d’intéractions médicamenteuses   ',{text:"Pr. AMIR   & Pr.Bencharef",fontSize:16,bold:true }],
              [ '', 'Soutenance 4', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 1 : Gestion du personnel de l’aéroport de Marrakech   ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 2 : Gestion du matériel technique de l’aéroport de Marrakech  ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Conception et développement d’une plateforme de gestion de maintenance assistée par ordinateur (GMAO) À l’Office Nationale Des Aéroports  ','' ],

            ]
          }
        },
        ,{
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            bodyRows:5,
            widths: [ 50,80, '*', '*', 100 ],
            margin:[0,60,0,60],
            pageBreak: 'before',
            body: [
              [ {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"Nom & Prénom",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"}, {text:"Intitulé du sujet PFE",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"},{text:"Jury",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"} ],
              [ {text:"Salle 1",bold:true,fillColor:'#ebebeb',margin:[0,80,0,0],rowSpan:5,alignment:'center'}, 'Soutenance 2', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'APPLICATION WEB POUR LA GESTION DES ABSENCES  ',{text:"Laila Amir & Laila Amir",rowSpan:5,bold:true,margin:[0,80,0,0],fillColor:'#ebebeb'} ],
              [ '', 'Soutenance 3', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Devellopement d’uneapplication JEE d’intéractions médicamenteuses   ',{text:"Pr. AMIR   & Pr.Bencharef",fontSize:16,bold:true }],
              [ '', 'Soutenance 4', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 1 : Gestion du personnel de l’aéroport de Marrakech   ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 2 : Gestion du matériel technique de l’aéroport de Marrakech  ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Conception et développement d’une plateforme de gestion de maintenance assistée par ordinateur (GMAO) À l’Office Nationale Des Aéroports  ','' ],

            ]
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            bodyRows:5,
            widths: [ 50,80, '*', '*', 100 ],
            margin:[0,60,0,60],
            pageBreak: 'before',
            body: [
              [ {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"Nom & Prénom",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"}, {text:"Intitulé du sujet PFE",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"},{text:"Jury",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"} ],
              [ {text:"Salle 1",bold:true,fillColor:'#ebebeb',margin:[0,80,0,0],rowSpan:5,alignment:'center'}, 'Soutenance 2', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'APPLICATION WEB POUR LA GESTION DES ABSENCES  ',{text:"Laila Amir & Laila Amir",rowSpan:5,bold:true,margin:[0,80,0,0],fillColor:'#ebebeb'} ],
              [ '', 'Soutenance 3', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Devellopement d’uneapplication JEE d’intéractions médicamenteuses   ',{text:"Pr. AMIR   & Pr.Bencharef",fontSize:16,bold:true }],
              [ '', 'Soutenance 4', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 1 : Gestion du personnel de l’aéroport de Marrakech   ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Création d’une plateforme de gestion du personnel et du  matériel technique  Partie 2 : Gestion du matériel technique de l’aéroport de Marrakech  ','' ],
              [ '', 'Soutenance 5', [{text:"AJRADFATIMA EZZAHR",bold:true},{text:"AABBADIBTISSAME",bold:true}], 'Conception et développement d’une plateforme de gestion de maintenance assistée par ordinateur (GMAO) À l’Office Nationale Des Aéroports  ','' ],

            ]
          }
        }
      ],
      pageSize:'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ],

    }
  }

   download(){
    pdfMake.createPdf(this.planning()).save("planning.pdf");
  }

  view(){
    pdfMake.createPdf(this.planningTest()).open();
  }

  fillPlanningTable(){
    let body = [];
    let header = [ {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"",fillColor:'#c7c7c7',alignment:"center"}, {text:"Nom & Prénom",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"}, {text:"Intitulé du sujet PFE",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"},{text:"Jury",bold:true,fontSize:14,fillColor:'#c7c7c7',alignment:"center"} ];
    body.push(header);
    let salle = "";
    let jury = "";
    for(let i = 0 ; i <this.stages.length;i++){
        salle = this.stages[0].localeSoutenance;
        jury = this.stages[0].stageMembreJuries[0].membreJury.reference;

    }
    let index = 1;
    this.stages.forEach(stage=>{
      let row = [stage.localeSoutenance,'souteance '+index,
        [{text:stage.stageEtudiants[0].etudiant.user.nom+" "+stage.stageEtudiants[0].etudiant.user.prenom,bold:true}],
        stage.sujet,
        this.getjuryies(stage.stageMembreJuries)
      ];
      body.push(row);
      index ++;
    })
    return body;
  }
  getjuryies(Sms:Array<StageMembreJury>):string{
        let j = "";
       Sms.forEach(s=>{
         j += " "+s.membreJury.user.nom +" "+s.membreJury.user.prenom
       })
    return j;
  }

   planningTest() {
     return {
       content: [
         {
           text: "Université Cady Ayad                                                              Anneé universitaire:"+this.anneeUniversitaire(),
           fontSize: 18
         },
         {text: "Faculté des sciences et techniques", fontSize: 18},
         {text: "Marrakech", fontSize: 18},
         {
           text: "Planning des soutenances PFE "+this.filiere.diplome+" "+this.filiere.abbr,
           fontSize: 16,
           bold: true,
           alignment: 'center',
           italics: true,
           decoration: 'underline',
           margin: [0, 0, 20, 0]
         },
         {
           text: "("+this.filiere.libelle+")",
           fontSize: 16,
           bold: true,
           alignment: 'center',
           italics: true,
           decoration: 'underline'
         },
         {text: "Date : le "+this.dateSoutenance, fontSize: 16, bold: true, margin: [0, 40, 0, 0]},
         {text: "("+this.plusInfos+") ", fontSize: 16, bold: true, margin: [0, 0, 0, 40]},
         {
           layout: 'lightHorizontalLines', // optional
           table: {
             // headers are automatically repeated if the table spans over multiple pages
             // you can declare how many rows should be treated as headers
             headerRows: 1,
             bodyRows: 5,
             widths: [50, 80, '*', '*', 100],
             margin: [0, 0, 0, 60],
             body: this.fillPlanningTable()
           }
         }
       ],
	    pageSize:'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [ 40, 60, 40, 60 ],
     }
   }

   ajouterJury(stage:Stage){
    this.ajouetrJury =!this.ajouetrJury;
    this.stageService.stage = stage;
   }

   anneeUniversitaire(){
    let date = new Date();
    let yearMin ;
    let yearMax;
    if(date.getMonth() == 8 || date.getMonth() == 10 || date.getMonth() == 9 || date.getMonth() == 11){
      yearMin = date.getFullYear();
      yearMax = yearMin + 1;
    }else{
      yearMax = date.getFullYear();
      yearMin = yearMax - 1;
    }
    return yearMin+"-"+yearMax;
   }

fillStageCopies(){
    let n = 0;
    let arr:Array<Stage> = new Array<Stage>();
    let check = false;
    for(let i = 0;i<this.stages.length; i++) {
      arr.splice(0,arr.length);
      n = 1;
      arr.push(this.stages[i]);
      console.log("arr")
      console.log(arr);
      for(let j = 0;j<this.stages.length; j++){
        if(this.stages[i].reference!=this.stages[j].reference){
          if(this.stages[i].stageMembreJuries.length == this.stages[j].stageMembreJuries.length){
            for(let k = 0;k<this.stages[j].stageMembreJuries.length;k++){
              if(this.stages[j].stageMembreJuries[k].membreJury.reference == this.stages[i].stageMembreJuries[k].membreJury.reference){
                check = true;
              }else{
                check = false;
              }
            }
          }
          console.log(this.stages[i].stageMembreJuries)
          console.log(this.stages[j].stageMembreJuries)
          console.log(check)
          if(check == true){
            n++;
            arr.push(this.stages[j]);
          }else{
            let st:StageCopie = new StageCopie();
            st.nombre = n;
            st.stage = arr;
            console.log("arr tani")
            console.log(arr);
            if(arr.length>0){
              this.stageCopies.push(st);
            }

          }
        }

      }
    }

}
}
