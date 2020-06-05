import {User} from "./user.model";
import {SujetForum} from "./sujet-forum.model";

export class Commentaire {
  id:number;
  contenu:string;
  dateCreation:Date;
  dateModification:Date;
  user:User;
  sujetForum:SujetForum;
  commentaires:Array<Commentaire>;
}
