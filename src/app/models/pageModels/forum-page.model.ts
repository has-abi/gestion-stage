import {SujetForum} from "../sujet-forum.model";

export class ForumPage {
  content:Array<SujetForum>
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
  number:number;
}
