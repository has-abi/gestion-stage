import {User} from "./user.model";
import {SujetForum} from "./sujet-forum.model";

export class Commentaire {
  id:number;
  contenu:string;
  dateCreation:Date;
  dateModification:Date;
  user:User;
  commentaire:Commentaire;
  sujetForum:SujetForum;
  commentaires:Array<Commentaire>;

  constructor() {
    this.user = new User();
    this.sujetForum = new SujetForum();
    this.commentaire = new Commentaire();
    this.commentaires = new Array<Commentaire>();
  }
}
