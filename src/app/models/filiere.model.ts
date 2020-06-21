import {Coordinateur} from "./coordinateur.model";
import {Etudiant} from "./etudiant.model";
import {Departement} from "./departement.model";

export class Filiere {
  id:number;
  libelle:string;
  abbr:string;
  diplome:string;
  etudiants:Array<Etudiant>;
  departement:Departement;
}
