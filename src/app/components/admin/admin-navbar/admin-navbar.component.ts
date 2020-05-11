import { Component, OnInit } from '@angular/core';
import {StyleService} from "../../../services/style.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private styleService:StyleService) { }

  ngOnInit(): void {
  }
  get cols(){
    return this.styleService.cols;
  }

  switchCols(){
    if(this.cols == 'col-md-12'){
      this.styleService.cols = 'col-md-10';
    }else{
      this.styleService.cols = 'col-md-12';
    }
  }
}
