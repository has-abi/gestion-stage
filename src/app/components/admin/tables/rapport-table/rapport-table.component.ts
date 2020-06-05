import { Component, OnInit } from '@angular/core';
import {RapportService} from "../../../../services/rapport.service";

@Component({
  selector: 'app-rapport-table',
  templateUrl: './rapport-table.component.html',
  styleUrls: ['./rapport-table.component.css']
})
export class RapportTableComponent implements OnInit {
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
  constructor(private rapportService:RapportService) { }

  ngOnInit(): void {
    this.findAll();
  }
  get rapports(){
    return this.rapportService.rapports;
  }
  findAll(){
    return this.rapportService.findAllRapports(this.page,this.size,this.sort);
  }
  get pageRapport(){
    return this.rapportService.rapportPage;
  }
  nextElements(){
    if(this.page<=this.pageRapport.totalPages){
      this.page++;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.pageRapport.totalPages){
      this.page = i;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }
  get tableElements(){
    return this.rapportService.tableElements;
  }
  resizePage(){
    this.findAll();
    this.rapportService.tableElements = [];
  }

  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.rapportService.search(this.searchInput);
      this.pageRapport.content = this.rapports;
    }else{
      this.findAll();
      this.rapportService.tableElements = [];
      this.searching = false;
    }
  }
  changeOrder(order:string,prop:string){
    if(order=="asc" && prop == "id"){
      this.rapportService.findAllRapports(this.page,this.size,"asc");
    }
    if(order=="desc" && prop == "id"){
      this.rapportService.findAllRapports(this.page,this.size,"desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }

}
