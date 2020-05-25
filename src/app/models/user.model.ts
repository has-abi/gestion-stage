import {Commentaire} from "./commentaire.model";
import {SujetForum} from "./sujet-forum.model";

export class User {
  id:number;
  nom:string;
  prenom:string;
  sexe:string;
  dateNaissance:Date;
  tele:string;
  adress:string;
  email:string;
  motPass:string;
  photo:string;
  question:string;
  reponce:string;
  active:boolean;
  dateJoin:Date;
  commentaires:Array<Commentaire>;
  sujetForums:Array<SujetForum>;


  constructor() {
    this.sujetForums = new Array<SujetForum>();
    this.commentaires = new Array<Commentaire>();
  }
}
