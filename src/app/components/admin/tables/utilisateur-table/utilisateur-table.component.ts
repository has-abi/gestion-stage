import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {EncadreurService} from "../../../../services/encadreur.service";
import {EtudiantService} from "../../../../services/etudiant.service";
import {CoordinateurService} from "../../../../services/coordinateur.service";
import {JuryService} from "../../../../services/jury.service";

@Component({
  selector: 'app-utilisateur-table',
  templateUrl: './utilisateur-table.component.html',
  styleUrls: ['./utilisateur-table.component.css']
})
export class UtilisateurTableComponent implements OnInit {
  page = 0;
  size =5;
  id=1;
  sort="asc";
  searchInput ="";
  searching = false;
  tableOrder = {
    order:"asc",
    prop:"id"
  }
  searchCretaria = "-SELECT-";
  userType="Tout";
	updateUser = false;
	createUser= false;

  constructor(private userService:UserService,private flashMessagesService:FlashMessagesService,private encadreurService:EncadreurService,
              private etudiantService:EtudiantService,private coordinateurService:CoordinateurService,private juryService:JuryService) { }

  ngOnInit(): void {
    this.findAll();
  }
  deleteUser(user:User){
    this.userService.removeUser(user.id).subscribe(resp=>{
      if (resp > 0) {
        this.flashMessagesService.show("utilisateur supprimer avec succée!", {cssClass: 'alert-success', timeout: 5000});
        this.users.splice(this.users.indexOf(user),1);
        this.pageUser.content.splice(this.pageUser.content.indexOf(user),1);
      } else {
        this.flashMessagesService.show("Erreur dans la suppression!", {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })
  }
  findAll(){
    this.userService.findAll(this.page,this.size,this.sort);
  }
  get pageUser(){
    return this.userService.userPage;
  }
  get users(){
    return this.userService.users;
  }
  nextElements(){
    if(this.page<=this.pageUser.totalPages){
      this.page++;
      this.findAll();
      this.userService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findAll();
      this.userService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageUser.totalPages){
      this.page = i;
      this.findAll();
      this.userService.tableElements = [];
    }
  }
  get tableElements(){
    return this.userService.tableElements;
  }
  resizePage(){
    this.findAll();
    this.userService.tableElements = [];
    this.searching = false;
  }

  search(){
    if(this.searchInput.length == 0){
      this.findAll();
      this.userService.tableElements = [];
    }
    else{
      if(this.searchCretaria == "1"){
        this.userService.findUsersByNom(this.searchInput);
      }else if(this.searchCretaria == "2"){
        this.userService.findUsersByPrenom(this.searchInput);
      }else{
        this.userService.searchUsers(this.searchInput);
      }
      this.searching = true;
      this.pageUser.content = this.users;
    }
  }
  changeOrder(order:string,prop:string){
    this.userService.tableElements = [];
    if(order=="asc" && prop == "id"){
      this.userService.findAll(this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.userService.findAll(this.page,this.size,"desc");
    }if(order=="asc" && prop == "nom") {
      this.userService.findAll(this.page,this.size,"nom");
    }
  }
  update(user:User){

    if(this.checkEtdudiant(user)){
      this.etudiantService.findByUserId(user.id).subscribe(data=>{
        this.etudiantService.etudiant = data;
        this.userService.user = user;
        this.updateUser = true;
      })
    }
    if(this.check(user,"COORDINATEUR")){
      this.coordinateurService.findByUserId(user.id).subscribe(datas=>{
        this.coordinateurService.coordinateur = datas
        this.userService.user = user;
        this.updateUser = true;
      })
    }
    if(this.check(user,"ENCADREUR_ROLE")){
      this.encadreurService.findByUserId(user.id).subscribe(data=>{
        this.encadreurService.encadreur = data
        this.userService.user = user;
        this.updateUser = true;
      })
    }
    if(this.check(user,"JURY_ROLE")){
      this.juryService.findByUserId(user.id).subscribe(data=>{
        this.juryService.jury = data;
        this.userService.user = user;
        this.updateUser = true;
      })
    }
  }
  checkEtdudiant(user:User):boolean{
    let check = false;
    for(let i=0;i<user.roles.length;i++) {
      if (user.roles[i].role == "ETUDIANT_ROlE") {
        check = true;
      }
    }
    return check;
  }
  check(user:User,role:string):boolean{
    let check = false;
    for(let i=0;i<user.roles.length;i++){
      if(user.roles[i].role == role) check = true;
    }
    return check;
  }

}
