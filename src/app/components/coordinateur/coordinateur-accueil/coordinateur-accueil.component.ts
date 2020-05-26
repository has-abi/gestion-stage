import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../../services/document.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-coordinateur-accueil',
  templateUrl: './coordinateur-accueil.component.html',
  styleUrls: ['./coordinateur-accueil.component.css']
})
export class CoordinateurAccueilComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  title:string="titre";
  fileInfos: Observable<any>;
  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {
    this.fileInfos = this.documentService.getFiles();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.documentService.upload(this.currentFile,this.title).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.documentService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}
