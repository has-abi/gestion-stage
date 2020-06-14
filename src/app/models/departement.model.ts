import {Etablissement} from "./etablissement.model";
import {Filiere} from "./filiere.model";

export class Departement {
  id:number;
  libelle:string;
  etablissement:Etablissement;
  filieres:Array<Filiere>;
}
