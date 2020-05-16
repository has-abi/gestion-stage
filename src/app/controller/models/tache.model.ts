import {Stage} from "./stage.model";
import {StageEncadreur} from "./stage-encadreur.model";

export class Tache {
  id:number;
  contenu:string;
  dateCreation:Date;
  dateLimit:Date;
  effectuer:boolean;
  valider:boolean;
  stage:Stage;
  stageEncadreur:StageEncadreur;

  constructor() {
    this.stage = new Stage();
    this.stageEncadreur = new StageEncadreur();
  }
}
