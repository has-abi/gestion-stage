import {Ville} from "./ville.model";
import {Departement} from "./departement.model";

export class Etablissement {
  id:number;
  libelle:string;
  adress:string;
  email:string;
  tele_fix:string;
  tele_gsm:string;
  doyen:string;
  ville:Ville;
  departements:Array<Departement>;

  constructor() {
    this.ville = new Ville();
    this.departements = new Array<Departement>();
  }
}
