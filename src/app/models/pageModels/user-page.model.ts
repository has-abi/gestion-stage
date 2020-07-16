import {User} from "../user.model";

export class UserPage {
  content:Array<User>
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;

  constructor() {
    this.number = 0;
    this.numberOfElements = 0;
  }
}
