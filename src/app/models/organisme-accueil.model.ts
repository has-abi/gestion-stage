import {Ville} from "./ville.model";
import {TypeOrganisme} from "./type-organisme.model";
import {TypeServiceOrganisme} from "./type-service-organisme.model";
import {Stage} from "./stage.model";

export class OrganismeAccueil {
  id:number;
  raisonSociale:string;
  email:string;
  tele:string;
  adress:string;
  responsable:string;
  ville:Ville;
  typeOrganisme:TypeOrganisme;
  typeServiceOrganisme:TypeServiceOrganisme;
  stages:Array<Stage>;

  constructor() {
    this.ville = new Ville();
    this.typeOrganisme = new TypeOrganisme();
    this.typeServiceOrganisme = new TypeServiceOrganisme();
    this.stages = new Array<Stage>();
  }
}
