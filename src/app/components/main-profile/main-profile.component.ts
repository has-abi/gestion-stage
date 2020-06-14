import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit {
  role = ""
  constructor(private localStorage:LocalStorageService,private router:Router) { }

  ngOnInit(): void {
    this.role = this.localStorage.retrieve("userRole");
    if(this.role == "COORDINATEUR_ROLE") this.router.navigate(['coordinateur/stage/list'])
    if(this.role == "ETUDIANT_ROLE") this.router.navigate(['etudiant/profile'])
  }

}
