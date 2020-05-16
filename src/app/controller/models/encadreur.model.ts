import {Utilisateur} from "./utilisateur.model";
import {StageEncadreur} from "./stage-encadreur.model";

export class Encadreur {
  id:string;
  reference:string;
  remarque:string;
  profession:string;
  qualite:string;
  type:string;
  utilisateur:Utilisateur;
  stageEncadreurs:Array<StageEncadreur>;

  constructor() {
    this.utilisateur = new Utilisateur();
    this.stageEncadreurs = new Array<StageEncadreur>();
  }
}
