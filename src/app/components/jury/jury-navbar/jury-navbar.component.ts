import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../../services/auth/authentification.service";

@Component({
  selector: 'app-jury-navbar',
  templateUrl: './jury-navbar.component.html',
  styleUrls: ['./jury-navbar.component.css']
})
export class JuryNavbarComponent implements OnInit {

  constructor(private authentificationService:AuthentificationService) { }

  ngOnInit(): void {
  }

  logout(){
    return this.authentificationService.logout();
  }

}
