
import {Encadreur} from "./encadreur.model";
import {Tache} from "./tache.model";

export class StageEncadreur {
  id:number;
  dateAffectaion:Date;
  remarque:string;
  encadreur:Encadreur;
  taches:Array<Tache>;


  constructor() {
    this.encadreur=new Encadreur();
    this.taches=new Array<Tache>();
  }
}
