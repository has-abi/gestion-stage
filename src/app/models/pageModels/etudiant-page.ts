import {Etudiant} from "../etudiant.model";

export class EtudiantPage {
  content:Array<Etudiant>;
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
