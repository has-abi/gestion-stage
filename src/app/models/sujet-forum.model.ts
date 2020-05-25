import {User} from "./user.model";
import {Stage} from "./stage.model";
import {Commentaire} from "./commentaire.model";

export class SujetForum {
  id:number;
  reference:string;
  content:string;
  dateCreation:Date;
  dateModification:Date;
  suprimer:boolean;
  user:User;
  stage:Stage;
  commentaires:Array<Commentaire>;

  constructor() {
    this.stage = new Stage();
    this.user = new User();
    this.commentaires = new Array<Commentaire>();
  }
}
