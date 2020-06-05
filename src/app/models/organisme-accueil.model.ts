import {Ville} from "./ville.model";
import {TypeOrganisme} from "./type-organisme.model";
import {TypeServiceOrganisme} from "./type-service-organisme.model";

export class OrganismeAccueil {
  id:number;
  raisonSociale:string;
  email:string;
  tele:string;
  teleFix:String;
  adress:string;
  responsable:string;
  ville:Ville;
  typeOrganisme:TypeOrganisme;
  typeServiceOrganisme:TypeServiceOrganisme;

  constructor() {
    this.ville = new Ville();
    this.typeOrganisme = new TypeOrganisme();
    this.typeServiceOrganisme = new TypeServiceOrganisme();
  }
}
