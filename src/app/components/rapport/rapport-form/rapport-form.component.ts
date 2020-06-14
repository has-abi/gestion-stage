import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {RapportService} from "../../../services/rapport.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-rapport-form',
  templateUrl: './rapport-form.component.html',
  styleUrls: ['./rapport-form.component.css']
})
export class RapportFormComponent implements OnInit {
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  rapportForm;
  constructor(private rapportService:RapportService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.rapportForm = this.formBuilder.group({
      titre:new FormControl('',[
        Validators.required
      ]),
      desc:new FormControl('',[
        Validators.required
      ])
    })
  }
  upload(rapportData) {

    if(this.titre.errors == null && this.desc.errors == null ){
      this.progress = 0;
      this.currentFile = this.selectedFile.item(0);
      this.rapportService.save(this.currentFile,rapportData.titre,rapportData.desc).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        });

      this.selectedFile = undefined;
    }
  }
  selectFile(event) {
    this.selectedFile = event.target.files;
    this.rapportService.fileIsSelected = true;
  }
  get titre(){
    return this.rapportForm.get('titre');
  }
  get file(){
    return this.rapportForm.get('file');
  }
  get desc(){
    return this.rapportForm.get('desc');
  }



}
