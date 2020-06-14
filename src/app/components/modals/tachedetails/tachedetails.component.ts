import { Component, OnInit } from '@angular/core';
import {Tache} from "../../../models/tache.model";
import {TacheService} from "../../../services/tache.service";


@Component({
  selector: 'app-tachedetails',
  templateUrl: './tachedetails.component.html',
  styleUrls: ['./tachedetails.component.css']
})
export class TachedetailsComponent implements OnInit {

  constructor(private tacheService:TacheService) { }

  ngOnInit(): void {
    console.log(this.tache);
  }
  get tache(): Tache {
    return this.tacheService.tache;
  }
}
