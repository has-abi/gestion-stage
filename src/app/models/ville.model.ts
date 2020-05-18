import {Pays} from "./pays.model";
import {OrganismeAccueil} from "./organisme-accueil.model";

export class Ville {
  id:number;
  nom:string;
  pays:Pays;
  organismesAccueils:Array<OrganismeAccueil>;

  constructor() {
    this.pays = new Pays();
    this.organismesAccueils = new Array<OrganismeAccueil>();
  }
}
