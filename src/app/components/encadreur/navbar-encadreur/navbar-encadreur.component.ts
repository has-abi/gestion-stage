import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-encadreur',
  templateUrl: './navbar-encadreur.component.html',
  styleUrls: ['./navbar-encadreur.component.css']
})
export class NavbarEncadreurComponent implements OnInit {
  searchInput:string;
  searching = false;
  constructor() { }

  ngOnInit(): void {
  }
  search(){

  }

}
