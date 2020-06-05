import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";

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
  userType="Tout"

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.findAll();
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


}
