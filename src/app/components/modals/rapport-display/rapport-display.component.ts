import { Component, OnInit } from '@angular/core';
import {RapportService} from "../../../services/rapport.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-rapport-display',
  templateUrl: './rapport-display.component.html',
  styleUrls: ['./rapport-display.component.css']
})
export class RapportDisplayComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  modifierRapport = false;
  role = "";
  constructor(private rapportService:RapportService,private sessionStorage:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
  }
  get rapport(){
    return this.rapportService.rapport;
  }
  valider(){
    return this.rapportService.validerRapport();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
