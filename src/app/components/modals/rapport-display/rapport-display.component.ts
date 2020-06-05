import { Component, OnInit } from '@angular/core';
import {RapportService} from "../../../services/rapport.service";

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
  constructor(private rapportService:RapportService) { }

  ngOnInit(): void {
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
