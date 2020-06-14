import { Component, OnInit } from '@angular/core';
import {TacheService} from "../../../services/tache.service";

@Component({
  selector: 'app-archive-taches',
  templateUrl: './archive-taches.component.html',
  styleUrls: ['./archive-taches.component.css']
})
export class ArchiveTachesComponent implements OnInit {
  page = 0;
  size =10;
  id=1;
  sort="asc";
  searchInput ="";
  searching = false;
  constructor(private tacheService:TacheService) { }

  ngOnInit(): void {
  this.findByEtudiant();
  }
  search(){
    if(this.searchInput.length>0){
      this.searching = true;
      this.tacheService.search(this.searchInput);
    }else{
      this.tacheService.tacheElements = [];
      this.findByEtudiant();
      this.searching = false;
    }
  }
  findByEncadreur(){
    return this.tacheService.findByEncadeur(1,this.page,this.size);
  }
  findByEtudiant(){
    return this.tacheService.findByEtudiant(1,this.page,this.size);
  }

  get tachePage(){
    return this.tacheService.tachePage;
  }
  get taches(){
    return this.tacheService.taches;
  }
  nextElements(){
    if(this.page<=this.tachePage.totalPages){
      this.page++;
      this.findByEtudiant();
      this.tacheService.tacheElements = [];
    }
  }
  prevElements(){
    if(this.page>=0){
      this.page--;
      this.findByEtudiant();
      this.tacheService.tacheElements = [];
    }
  }
  getIndexPage(i:number){
    if(i<=this.tachePage.totalPages){
      this.page = i;
      this.findByEtudiant();
      this.tacheService.tacheElements = [];
    }
  }
  get tableElements(){
    return  this.tacheService.tacheElements ;
  }
  resizePage(){
    this.findByEtudiant();
    this.tacheService.tacheElements = [];
  }
}
