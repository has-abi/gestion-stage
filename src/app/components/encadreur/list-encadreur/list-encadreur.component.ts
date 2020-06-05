import { Component, OnInit } from '@angular/core';
import {EncadreurService} from "../../../services/encadreur.service";
import {Encadreur} from "../../../models/encadreur.model";

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
  constructor(private encadreurService:EncadreurService) { }

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

}
