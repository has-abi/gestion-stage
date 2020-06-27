import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../../services/auth/authentification.service";

@Component({
  selector: 'app-navbar-encadreur',
  templateUrl: './navbar-encadreur.component.html',
  styleUrls: ['./navbar-encadreur.component.css']
})
export class NavbarEncadreurComponent implements OnInit {
  searchInput:string;
  searching = false;
  constructor(private authentificationService:AuthentificationService) { }

  ngOnInit(): void {
  }
  logout(){
    return this.authentificationService.logout();
  }

}
