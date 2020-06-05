import {Stage} from "./stage.model";
import {StageEncadreur} from "./stage-encadreur.model";

export class Tache {
  id:number;
  contenu:string;
  reference:String;
  dateCreation:Date;
  dateLimit:Date;
  effectuer:boolean;
  valider:boolean;
  stage:Stage;
  stageEncadreur:StageEncadreur;
  dateVlidation:Date

  constructor() {
    this.stage = new Stage();
    this.stageEncadreur = new StageEncadreur();
  }
}
