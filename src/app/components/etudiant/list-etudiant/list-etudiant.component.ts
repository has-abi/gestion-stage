import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";

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
  constructor(private etudiantService:EtudiantService) { }

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

}
