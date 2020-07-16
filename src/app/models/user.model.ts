import {Commentaire} from "./commentaire.model";
import {SujetForum} from "./sujet-forum.model";
import {Role} from "./role.model";

export class User {
  id:number;
  nom:string;
  reference:string;
  prenom:string;
  sexe:string;
  dateNaissance:Date;
  tele:string;
  adress:string;
  username:string;
  password:string;
  photo:string;
  question:string;
  reponce:string;
  active:boolean;
  confirm:boolean;
  codeConfirm:string;
  dateJoin:Date;
  roles:Array<Role>;
  commentaires:Array<Commentaire>;
  sujetForums:Array<SujetForum>;

}
