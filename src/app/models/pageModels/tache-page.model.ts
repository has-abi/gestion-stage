import {User} from "../user.model";
import {Tache} from "../tache.model";

export class TachePage {
  content:Array<Tache>
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
