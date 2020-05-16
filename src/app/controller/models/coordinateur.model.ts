import {Filiere} from "./filiere.model";
import {Utilisateur} from "./utilisateur.model";

export class Coordinateur {
  id:number;
  reference:string;
  filiere:Filiere;
  utilisateur:Utilisateur;

  constructor() {
    this.filiere = new Filiere();
    this.utilisateur = new Utilisateur();
  }
}
