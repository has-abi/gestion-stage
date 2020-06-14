import {Stage} from "./stage.model";
import {Encadreur} from "./encadreur.model";
import {RapportTache} from "./rapport-tache.model";

export class Tache {
  id:number;
  contenu:string;
  reference:string;
  titre:string;
  dateCreation:Date;
  dateLimite:Date;
  effectuer:boolean;
  valider:boolean;
  stage:Stage;
  encadreur:Encadreur;
  dateValidation:Date;
  rapportTache:RapportTache;

}
