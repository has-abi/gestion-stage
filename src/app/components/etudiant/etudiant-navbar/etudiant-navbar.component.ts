import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiant-navbar',
  templateUrl: './etudiant-navbar.component.html',
  styleUrls: ['./etudiant-navbar.component.css']
})
export class EtudiantNavbarComponent implements OnInit {
  searchInput:string;
  searching = false;
  constructor() { }

  ngOnInit(): void {
  }
  search(){

  }
}
