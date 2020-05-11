import {Utilisateur} from "./utilisateur.model";

export class Administrateur {
  id:number;
  ref:string;
  profession:string;
  utilisateur:Utilisateur;

  constructor() {
    this.utilisateur = new Utilisateur();
  }
}
