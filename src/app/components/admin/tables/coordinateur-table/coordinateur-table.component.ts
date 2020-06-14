import { Component, OnInit } from '@angular/core';
import {JuryService} from "../../../../services/jury.service";
import {CoordinateurService} from "../../../../services/coordinateur.service";

@Component({
  selector: 'app-coordinateur-table',
  templateUrl: './coordinateur-table.component.html',
  styleUrls: ['./coordinateur-table.component.css']
})
export class CoordinateurTableComponent implements OnInit {

  page = 0;
  size =10;
  id=1;
  searchInput ="";
  searching = false;
  sort= "desc"
  tableOrder = {
    order:"asc",
    prop:"id"
  }
  constructor(private coordinateurService:CoordinateurService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    return this.coordinateurService.findAll(this.page,this.size,this.sort);
  }
  nextElements(){
    if(this.page<=this.pageCoordinateur.totalPages){
      this.page++;
      this.findAll();
      this.coordinateurService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findAll();
      this.coordinateurService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageCoordinateur.totalPages){
      this.page = i;
      this.findAll();
      this.coordinateurService.tableElements = [];
    }
  }
  get tableElements(){
    return this.coordinateurService.tableElements;
  }
  resizePage(){
    this.findAll();
    this.coordinateurService.tableElements = [];
  }
  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.coordinateurService.search(this.searchInput);
      this.pageCoordinateur.content = this.coordinateurs;
    }else{
      this.findAll();
      this.coordinateurService.tableElements = [];
      this.searching = false;
    }
  }
  get coordinateurs(){
    return this.coordinateurService.coordinatuers;
  }
  get pageCoordinateur(){
    return this.coordinateurService.coordinateurPage;
  }
  get coordinateur(){
    return this.coordinateurService.coordinateur;
  }
  changeOrder(order:string,prop:string){
    if(order=="asc" && prop == "id"){
      this.coordinateurService.findAll(this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.coordinateurService.findAll(this.page,this.size,"desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }

}
