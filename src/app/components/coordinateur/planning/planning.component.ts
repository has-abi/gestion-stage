import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {StageService} from "../../../services/stage.service";
import {MembreJury} from "../../../models/membre-jury.model";
import {PasswordGeneratorService} from "../../../services/utils/password-generator.service";
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  plusInfos = "";
  dateSoutenance:Date = new Date();
  ajouetrJury = false;
  jury:MembreJury = new MembreJury();
  juries:Array<MembreJury> = new Array<MembreJury>();
  constructor(private stageService:StageService,private passwordGeneratorService:PasswordGeneratorService) { }

  ngOnInit(): void {
  }
  get stages(){
    return this.stageService.stages;
  }
  generateP(){
    this.jury.user.motPass = this.passwordGeneratorService.getRandomPassword();
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
    this.stages.forEach(stage=>{
      let row = ['','souteance 1',
        [{text:stage.stageEtudiants[0].etudiant.user.nom+" "+stage.stageEtudiants[0].etudiant.user.prenom,bold:true}],
        stage.sujet,
        'jury'
      ];
      body.push(row);
    })
    return body;
  }

   planningTest() {
     return {
       content: [
         {
           text: "Université Cady Ayad                                                              Anneé universitaire:2019-2020",
           fontSize: 18
         },
         {text: "Faculté des sciences et techniques", fontSize: 18},
         {text: "Marrakech", fontSize: 18},
         {
           text: "Planning des soutenances PFE de la licence SIR ",
           fontSize: 16,
           bold: true,
           alignment: 'center',
           italics: true,
           decoration: 'underline',
           margin: [0, 0, 20, 0]
         },
         {
           text: "(Systèmes Informatiques Répartis)",
           fontSize: 16,
           bold: true,
           alignment: 'center',
           italics: true,
           decoration: 'underline'
         },
         {text: "Date : le Mardi 18 Juin ", fontSize: 16, bold: true, margin: [0, 40, 0, 0]},
         {text: "(Les soutenances commenceront à 9h00) ", fontSize: 16, bold: true, margin: [0, 0, 0, 40]},
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

   ajouterJury(){
    this.juries.push(this.jury);
   }
}
