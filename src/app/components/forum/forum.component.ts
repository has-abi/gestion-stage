import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {SujetForum} from "../../models/sujet-forum.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {Commentaire} from "../../models/commentaire.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "ngx-webstorage";
import {Role} from "../../models/role.model";

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
  updateSujet = {
	update:false,
	id:0
  };
  ajouterSujet = false;
  ajouterCommentaire = {
   commenter :false,
   id:0
  };
  show={
	  showSujet:false,
	  id:0
  }
  updateC = {
	  update:false,
	  id:0
  }
  picture = ""
  comment = new Commentaire();
  commentToUpdate = new Commentaire();
  user = new User();

  constructor(private forumService:ForumService,private flashMessagesService:FlashMessagesService,private userService:UserService,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.findAll();
    this.forumService.findByUserId(this.logedUser.id);

  }
  get logedUser():User{
    return this.localStorage.retrieve("logedUser");
  }
  get userForums():Array<SujetForum>{
    return this.forumService.userSujets;
  }
  checkAdmin(){
    let roles:Array<Role> = this.logedUser.roles;
    let check = false;
    roles.forEach(r=>{
      if(r.role == "ADMIN_ROLE") check = true;
    })
    return check;
  }

  search(){
    console.log(this.searchInput)
    if(this.searchInput.length == 0){
      this.findAll();
      this.forumService.tableElements = [];
    this.searching =false;
    }else{
      this.forumService.searchSujet(this.searchInput).subscribe(datas=>{
		this.searching = true;
		this.pageForum.content = datas;
	  });
    }

  }
  findAll(){
    this.forumService.tableElements = [];
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
    console.log(this.forumService.forumPage.content)
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
  updateCommentaire(c:Commentaire,s:SujetForum){
	  c.sujetForum = this.cloneSujet(s);
    this.forumService.updateCommentaire(c).subscribe(resp=>{
      if(resp>0){
		this.updateC.update = false;
        this.flashMessagesService.show('commentaire est modifier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de la modification!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }
  cloneSujet(s:SujetForum):SujetForum{
	  const sujet:SujetForum = new SujetForum();
	  sujet.id = s.id;
	  sujet.reference = s.reference;
	  return sujet;
  }
	updateComment(c:Commentaire){
		this.commentToUpdate = c;
		this.updateC.update = true;
		this.updateC.id = c.id;
	}
  updateSujetF(s:SujetForum){
	  this.updateSujet.update = !this.updateSujet.update;
	  this.updateSujet.id = s.id;
	  console.log(this.updateSujet);
	  this.forumService.sujetForum = s;
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
    this.comment.dateCreation = new Date();
    this.comment.user =  this.localStorage.retrieve("logedUser");
    this.forumService.createCommentaire(this.comment).subscribe(resp=>{
      if(resp>0){
        this.pageForum.content[this.pageForum.content.indexOf(sujet)].commentaires.push(this.comment);
        this.forumService.findByUserId(this.logedUser.id);
		this.comment = new Commentaire();
        this.flashMessagesService.show('commentaire est publier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de publication!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }
  create(){
	 this.forumService.sujetForum.user = this.localStorage.retrieve("logedUser");
	 this.forumService.sujetForum.dateCreation = new Date();
  this.forumService.save().subscribe(resp=>{
    if(resp>0){
      this.ajouterSujet = false;
      this.flashMessagesService.show('sujet est publier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      this.findAll();
      this.forumService.findByUserId(this.logedUser.id);
    }else{
      this.flashMessagesService.show('problème au cours de la publication!', { cssClass: 'alert-warning', timeout: 6000 })
    }
  })
  }

  update(){
	this.forumService.sujetForum.user = this.localStorage.retrieve("logedUser");
    this.forumService.update().subscribe(resp=>{
      if(resp>0){
		  this.updateSujet.update = false;
		  this.updateSujet.id = 0;
		  this.forumService.sujetForum = new SujetForum();
        this.flashMessagesService.show('sujet est modifier avec succée!', { cssClass: 'alert-light', timeout: 6000 })
      }else{
        this.flashMessagesService.show('problème au cours de la modification!', { cssClass: 'alert-warning', timeout: 6000 })
      }
    })
  }

  delete(sujet:SujetForum){
    this.forumService.removeByRef(sujet.reference).subscribe(resp=>{
      if(resp>0){
        this.findAll();
        this.forumService.findByUserId(this.logedUser.id)
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

  countComments(cs:Array<Commentaire>){
    return cs.length;
  }
  showSujet(s:SujetForum){
		this.show.showSujet = true;
		this.show.id = s.id;
		this.pageForum.content = [];
		this.pageForum.content.push(s);
		this.searching = true;
		this.ajouterCommentaire.commenter = true;
		this.ajouterCommentaire.id = s.id;
  }
  refresh(){
	  this.show.showSujet = false; 
	  this.ajouterCommentaire.commenter = false;
	  this.findAll();
  }

}

