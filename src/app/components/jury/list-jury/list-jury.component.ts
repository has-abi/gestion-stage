import { Component, OnInit } from '@angular/core';
import {JuryService} from "../../../services/jury.service";

@Component({
  selector: 'app-list-jury',
  templateUrl: './list-jury.component.html',
  styleUrls: ['./list-jury.component.css']
})
export class ListJuryComponent implements OnInit {
  page = 0;
  size =10;
  id=1;
  searchInput ="";
  searching = false;
  tableOrder = {
    order:"asc",
    prop:"id"
  }
  constructor(private juryService:JuryService) { }

  ngOnInit(): void {
    this.findByCoordinateur();
  }

  findByCoordinateur(){
    this.juryService.findByCoordinateur(this.id,this.page,this.size,"asc");
  }
  nextElements(){
    if(this.page<=this.pageJury.totalPages){
      this.page++;
      this.findByCoordinateur();
      this.juryService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findByCoordinateur();
      this.juryService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageJury.totalPages){
      this.page = i;
      this.findByCoordinateur();
      this.juryService.tableElements = [];
    }
  }
  get tableElements(){
    return this.juryService.tableElements;
  }
  resizePage(){
    this.findByCoordinateur();
    this.juryService.tableElements = [];
  }
  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.juryService.search(this.searchInput);
      this.pageJury.content = this.juries;
    }else{
      this.findByCoordinateur();
      this.juryService.tableElements = [];
      this.searching = false;
    }
  }
  get pageJury(){
    return this.juryService.pagejury;
  }
  get juries(){
    return this.juryService.juries;
  }
  changeOrder(order:string,prop:string){
    if(order=="asc" && prop == "id"){
      this.juryService.findByCoordinateur(this.id,this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.juryService.findByCoordinateur(this.id,this.page,this.size,"desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }
}
