import { Component, OnInit } from '@angular/core';
import {StyleService} from "../../services/style.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private styleService:StyleService) { }

  ngOnInit(): void {
  }
  get cols(){
    return this.styleService.cols;
  }
}
