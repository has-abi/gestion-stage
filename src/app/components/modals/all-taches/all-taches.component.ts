import { Component, OnInit } from '@angular/core';
import {TacheService} from "../../../services/tache.service";
import {Tache} from "../../../models/tache.model";

@Component({
  selector: 'app-all-taches',
  templateUrl: './all-taches.component.html',
  styleUrls: ['./all-taches.component.css']
})
export class AllTachesComponent implements OnInit {

  constructor(private tacheService:TacheService) { }

  ngOnInit(): void {



  }

  get taches(): Array<Tache> {
  return this.tacheService.taches;

  }
  get tache():Tache{
    return this.tacheService.tache;
  }
}
