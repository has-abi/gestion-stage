import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../services/search/search.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchInput;
  searching =false;
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {

  }
  search(){
  this.searching = true;
  if(this.searchInput.lenght != 0){
    this.searchService.searchOverStage(this.searchInput);
  }else{
    this.searching = false;
    this.searchService.searchResult = [];
  }

  }
  get searchResult(){
    return this.searchService.searchResult;
  }

}
