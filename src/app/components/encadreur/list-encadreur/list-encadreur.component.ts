import { Component, OnInit } from '@angular/core';
import {EncadreurService} from "../../../services/encadreur.service";
import {Encadreur} from "../../../models/encadreur.model";
import {User} from "../../../models/user.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {UserService} from "../../../services/user.service";
declare  let  bootbox:any;
@Component({
  selector: 'app-list-encadreur',
  templateUrl: './list-encadreur.component.html',
  styleUrls: ['./list-encadreur.component.css']
})
export class ListEncadreurComponent implements OnInit {
    page = 0;
    size =10;
    id=1;
    searchInput ="";
    searching = false;
    tableOrder = {
    order:"asc",
    prop:"id"
    }
  constructor(private encadreurService:EncadreurService,private flashMessagesService:FlashMessagesService,private userService:UserService) { }

  ngOnInit(): void {
    this.findByCoordinateur();
  }
  get pageEncadreurs(){
    return this.encadreurService.pageEncadreurs;
  }
  encadreurView(encadreur:Encadreur){
  }
  findByCoordinateur(){
    this.encadreurService.findByCoordinateur(this.id,this.page,this.size,"asc");
  }
  nextElements(){
    if(this.page<=this.pageEncadreurs.totalPages){
      this.page++;
      this.findByCoordinateur();
      this.encadreurService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findByCoordinateur();
      this.encadreurService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageEncadreurs.totalPages){
      this.page = i;
      this.findByCoordinateur();
      this.encadreurService.tableElements = [];
    }
  }
  get tableElements(){
    return this.encadreurService.tableElements;
  }
  resizePage(){
    this.findByCoordinateur();
    this.encadreurService.tableElements = [];
  }
  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.encadreurService.search(this.searchInput);
      this.pageEncadreurs.content = this.encadreurs;
    }else{
      this.findByCoordinateur();
      this.encadreurService.tableElements = [];
      this.searching = false;
    }
  }
  get encadreurs(){
    return this.encadreurService.encadreurs;
  }
  changeOrder(order:string,prop:string){
    if(order=="asc" && prop == "id"){
      this.encadreurService.findByCoordinateur(this.id,this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.encadreurService.findByCoordinateur(this.id,this.page,this.size,"desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }
delete = (encadreur:Encadreur) =>{

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
        this.encadreurService.delete(encadreur.reference).subscribe(resp=>{
          if (resp > 0) {
            this.flashMessagesService.show("encadreur supprimer avec succée!", {cssClass: 'alert-success', timeout: 5000});
              this.encadreurs.splice(this.encadreurs.indexOf(encadreur),1);
              this.pageEncadreurs.content.splice(this.pageEncadreurs.content.indexOf(encadreur),1);
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

updateEncadreur(encadreur:Encadreur){
  this.userService.user = new User();
  this.userService.user = encadreur.user;
  this.encadreurService.encadreur = encadreur;
}

}
