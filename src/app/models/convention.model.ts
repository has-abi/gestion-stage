import {OrganismeAccueil} from "./organisme-accueil.model";
import {Encadreur} from "./encadreur.model";

export class Convention {
  organisme:OrganismeAccueil;
  sujetStage:string;
  dateDebutStage:string;
  dateFinStage:string;
  etudiantCne = [];
  durreStage:string;
  encadreurFaculte:Encadreur;
  encadreurStructure:Encadreur;

  constructor() {
    this.organisme = new OrganismeAccueil();
    this.encadreurFaculte = new Encadreur();
    this.encadreurStructure = new Encadreur();
  }
}
