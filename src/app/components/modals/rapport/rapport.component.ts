import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {DocumentService} from "../../../services/document.service";
import {RapportService} from "../../../services/rapport.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
