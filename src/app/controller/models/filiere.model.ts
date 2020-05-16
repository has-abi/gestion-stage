import {Coordinateur} from "./coordinateur.model";
import {Etudiant} from "./etudiant.model";
import {Departement} from "./departement.model";

export class Filiere {
  id:number;
  libelle:string;
  coordinateur:Coordinateur;
  etudiants:Array<Etudiant>;
  departement:Departement;

  constructor() {
    this.coordinateur = new Coordinateur();
    this.departement = new Departement();
    this.etudiants = new Array<Etudiant>();
  }
}
