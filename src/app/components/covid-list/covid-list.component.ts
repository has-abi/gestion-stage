import { Component, OnInit } from '@angular/core';
import {CovidService} from "../../services/covid.service";

@Component({
  selector: 'app-covid-list',
  templateUrl: './covid-list.component.html',
  styleUrls: ['./covid-list.component.css']
})
export class CovidListComponent implements OnInit {

  constructor(private covidService:CovidService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.covidService.getAll();
    console.log(this.covid)
  }
  get covid(){
    return this.covidService.covid;
  }
}
