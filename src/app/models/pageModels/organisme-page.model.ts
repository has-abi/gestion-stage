import {OrganismeAccueil} from "../organisme-accueil.model";

export class OrganismePage {
  content:Array<OrganismeAccueil>;
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
