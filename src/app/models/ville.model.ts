import {Pays} from "./pays.model";
import {OrganismeAccueil} from "./organisme-accueil.model";

export class Ville {
  id:number;
  nom:string;
  pays:Pays;
  codePostal:number;
  organismesAccueils:Array<OrganismeAccueil>;
	constructor() {
	this.pays = new Pays();
	}
}
