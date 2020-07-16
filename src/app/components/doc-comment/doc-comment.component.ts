import { Component, OnInit } from '@angular/core';
import {CommentDocService} from "../../services/comment-doc.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {DocumentService} from "../../services/document.service";
import {LocalStorageService} from "ngx-webstorage";
import {CommentaireDocument} from "../../models/commentaire-document.model";
import {Role} from "../../models/role.model";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-doc-comment',
  templateUrl: './doc-comment.component.html',
  styleUrls: ['./doc-comment.component.css']
})
export class DocCommentComponent implements OnInit {
  comment:CommentaireDocument = new CommentaireDocument();
  commentToUpdate:CommentaireDocument = new CommentaireDocument();
  updateC = {
    update:false,
    id:0
  }
  constructor(private commentDocService:CommentDocService,private flashMessagesService:FlashMessagesService,private documentService:DocumentService,
              private localStorage:LocalStorageService,private notificationService:NotificationService) { }

  ngOnInit(): void {
      this.findBydocument();
  }

  findBydocument(){
	  console.log("find");
	  console.log(this.documentService.document);
    return this.commentDocService.findByDocument(this.documentService.document.id);
  }

  get comments(){
    return this.commentDocService.commentDocuments;
  }

  get document(){
    return this.documentService.document;
  }

  get user(){
    return this.localStorage.retrieve("logedUser");
  }

  create(){
	 this.comment.dateCreation = new Date();
    this.comment.user = this.user;
    this.comment.document = this.document;
    this.commentDocService.create(this.comment).subscribe(resp=>{
      if(resp>0){
        this.commentDocService.commentDocuments.push(this.comment);
		    this.comment = new CommentaireDocument();
		    this.notificationService.showSuccess("Le commentaire est publié!","Archive des rapports")
      }else{
        this.notificationService.showWarning("Erreur dans la publication!","Archive des rapports")
      }
    },error => {
      this.notificationService.showError("Erreur est survenu!","Archive des rapports");
    })
  }

  update(){
	 this.commentToUpdate.user = this.user;
    this.commentToUpdate.document = this.document;
    this.commentDocService.update(this.commentToUpdate).subscribe(resp=>{
		if(resp>0){
			this.commentToUpdate = new CommentaireDocument();
			this.updateC.update = false;
			this.updateC.id = 0;
			this.notificationService.showSuccess("Le commentaire est modifié!","Archive des rapports")
		}else{
      this.notificationService.showSuccess("Erreur dans la modification!","Archive des rapports")
    }
    },error => {
      this.notificationService.showError("Erreur est survenu!","Archive des rapports");
    })
  }

  delete(c:CommentaireDocument){
    this.commentDocService.delete(c.id).subscribe(resp=>{
		if(resp>0){
			this.commentDocService.commentDocuments.splice(this.commentDocService.commentDocuments.indexOf(c),1);
      this.notificationService.showSuccess("Le commentaire est supprimé!","Archive des rapports")
		}else{
      this.notificationService.showWarning("Erreur dans la suppression!","Archive des rapports")
    }
	},error => {
      this.notificationService.showError("Erreur est survenu!","Archive des rapports");
      }
		);
  }
  checkAdmin(){
    let roles:Array<Role> = this.user.roles;
    let check = false;
    roles.forEach(r=>{
      if(r.role == "ADMIN_ROLE") check = true;
    })
    return check;
  }

  updateComm(c:CommentaireDocument){
    this.commentToUpdate = c;
    this.updateC.update = true;
    this.updateC.id = c.id;
  }

}
