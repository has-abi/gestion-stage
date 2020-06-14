import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {UserService} from "../../../services/user.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Etudiant} from "../../../models/etudiant.model";
import {User} from "../../../models/user.model";
declare let bootbox:any;
@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  page = 0;
  size =10;
  id=1;
  sort="asc";
  searchInput ="";
  searching = false;
  tableOrder = {
    order:"asc",
    prop:"id"
  }
  updateE = false;
  constructor(private etudiantService:EtudiantService,private userService:UserService,private flashMessagesService:FlashMessagesService) { }

  ngOnInit(): void {
    this.findByCoordinateur();
  }
  get pageEtudiant(){
    return this.etudiantService.pageEtudiant;
  }

  findByCoordinateur(){
    this.etudiantService.findByCoordinateur(this.id,this.page,this.size,this.sort);
  }
  nextElements(){
    if(this.page<=this.pageEtudiant.totalPages){
      this.page++;
      this.findByCoordinateur();
      this.etudiantService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findByCoordinateur();
      this.etudiantService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageEtudiant.totalPages){
      this.page = i;
      this.findByCoordinateur();
      this.etudiantService.tableElements = [];
    }
  }
  get tableElements(){
    return this.etudiantService.tableElements;
  }
  resizePage(){
    this.findByCoordinateur();
    this.etudiantService.tableElements = [];
  }
  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.etudiantService.search(this.searchInput);
      this.pageEtudiant.content = this.etudiants;
    }else{
      this.findByCoordinateur();
      this.etudiantService.tableElements = [];
      this.searching = false;
    }
  }
  get etudiants(){
    return this.etudiantService.etudiants;
  }
  changeOrder(order:string,prop:string){
    if(order=="asc" && prop == "id"){
      this.etudiantService.findByCoordinateur(this.id,this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.etudiantService.findByCoordinateur(this.id,this.page,this.size,"desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }
  delete = (etudiant:Etudiant) =>{
    bootbox.confirm({
      message: "Vous voulez vraiment supprimer l'encadreur?",
      buttons: {
        confirm: {
          label: 'Confirmer',
          className: 'btn-success'
        },
        cancel: {
          label: 'Annuler',
          className: 'btn-danger'
        }
      },
      callback:(result)=>{
        if(result){
          this.etudiantService.removeByCne(etudiant.cin).subscribe(resp=>{
            if (resp > 0) {
              this.flashMessagesService.show("Etudiant supprimer avec succée!", {cssClass: 'alert-success', timeout: 5000});
              this.pageEtudiant.content.splice(this.pageEtudiant.content.indexOf(etudiant),1);
              this.etudiants.splice(this.etudiants.indexOf(etudiant),1);
            } else {
              this.flashMessagesService.show("Erreur dans la suppression!", {
                cssClass: 'alert-danger',
                timeout: 5000
              });
            }
          })
        }
      }
    })
  }

  updateEtudiant(etudiant:Etudiant){
    this.updateE = true;
    this.userService.user = new User();
    this.userService.user = etudiant.user;
    this.etudiantService.etudiant = etudiant;
  }
}
