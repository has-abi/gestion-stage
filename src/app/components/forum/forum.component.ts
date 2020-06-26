import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {SujetForum} from "../../models/sujet-forum.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {Commentaire} from "../../models/commentaire.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  page = 0;
  size =10;
  id=1;
  sort="desc";
  searchInput ="";
  searching = false;
  ajouterSujet = false;
  ajouterCommentaire = {
   commenter :false,
   id:0
  };
  comment = new Commentaire();
  user = new User();
  constructor(private forumService:ForumService,private flashMessagesService:FlashMessagesService,private userService:UserService) { }

  ngOnInit(): void {
    this.findAll();
    this.userService.findByReference("u145266").subscribe(user=> this.user = user);
  }

  search(){
    if(this.searchInput.length == 0){
      this.findAll();
      this.forumService.tableElements = [];
    this.searching =false;
    }else{
      this.forumService.searchSujet(this.searchInput);
      this.pageForum.content = this.sujetForums;
      this.searching = true;
    }

  }
  findAll(){
    return this.forumService.findAllSujets(this.page,this.size,this.sort);
  }
  get pageForum(){
    return this.forumService.forumPage;
  }
  get sujetForums(){
    return this.forumService.sujetForums;
  }
  get sujetForum(){
    return this.forumService.sujetForum;
  }
  nextElements(){
    if(this.page<=this.pageForum.totalPages){
      this.page++;
      this.findAll();
      this.forumService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findAll();
      this.forumService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageForum.totalPages){
      this.page = i;
      this.findAll();
      this.forumService.tableElements = [];
    }
  }
  get tableElements(){
    return this.forumService.tableElements;
  }
  resizePage(){
    this.findAll();
    this.forumService.tableElements = [];
  }
  updateCommentaire(c:Commentaire){
    this.forumService.updateCommentaire(c).subscribe(resp=>{
      if(resp>0){
        this.flashMessagesService.show('commentaire est modifier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de la modification!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }

  removeCommentaire(c:Commentaire,sujet:SujetForum,i:number){
    this.forumService.removeCommentaire(c.id).subscribe(resp=>{
      if(resp>0){
        this.pageForum.content[this.pageForum.content.indexOf(sujet)].commentaires.splice(i,1);
        this.flashMessagesService.show('commentaire est supprimer avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de la suppression!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }

  createCommentaire(sujet:SujetForum){
    this.comment.sujetForum = sujet;
    this.comment.user = this.user;
    this.forumService.createCommentaire(this.comment).subscribe(resp=>{
      if(resp>0){
        this.pageForum.content[this.pageForum.content.indexOf(sujet)].commentaires.push(this.comment);
        this.ajouterCommentaire.commenter = false;
        this.flashMessagesService.show('commentaire est publier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de publication!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }
  create(){
	 this.forumService.sujetForum.user = this.user;
  this.forumService.save().subscribe(resp=>{
    if(resp>0){
      this.pageForum.content.push(this.sujetForum);
      this.ajouterSujet = false;
      this.flashMessagesService.show('sujet est publier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
    }else{
      this.flashMessagesService.show('problème au cours de la publication!', { cssClass: 'alert-warning', timeout: 6000 })
    }
  })
  }

  update(){
	this.forumService.sujetForum.user = this.user;
    this.forumService.update().subscribe(resp=>{
      if(resp>0){
        this.flashMessagesService.show('sujet est modifier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de la modification!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }

  delete(sujet:SujetForum){
    this.forumService.removeByRef(sujet.reference).subscribe(resp=>{
      if(resp>0){
        this.pageForum.content.splice(this.pageForum.content.indexOf(sujet),1);
        this.flashMessagesService.show('sujet est supprimer avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de suppression!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }
  addComment(id:number){
    if(this.ajouterCommentaire.commenter){
      this.ajouterCommentaire.id =0;
    }else{
      this.ajouterCommentaire.id = id;
    }
    this.ajouterCommentaire.commenter = !this.ajouterCommentaire.commenter;
  }
}