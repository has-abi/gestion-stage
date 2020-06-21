import { Component, OnInit } from '@angular/core';
import {StageService} from "../../services/stage.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {

  constructor(private stageService:StageService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }

}
