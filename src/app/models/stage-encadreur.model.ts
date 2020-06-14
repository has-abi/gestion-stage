import {Stage} from "./stage.model";
import {Encadreur} from "./encadreur.model";
import {Tache} from "./tache.model";

export class StageEncadreur {
  id:number;
  dateAffectaion:Date;
  remarque:string;
  stage:Stage;
  encadreur:Encadreur;
  taches:Array<Tache>;


  constructor() {
    this.stage=new Stage();
    this.encadreur=new Encadreur();
    this.taches=new Array<Tache>();
  }
}
