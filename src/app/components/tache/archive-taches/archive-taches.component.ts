import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../services/tache.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-archive-taches',
  templateUrl: './archive-taches.component.html',
  styleUrls: ['./archive-taches.component.css']
})
export class ArchiveTachesComponent implements OnInit {
  page = 0;
  size = 10;
  id = 1;
  sort = "asc";
  searchInput = "";
  searching = false;
  role = ""

  constructor(private tacheService: TacheService, private sessionStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.tacheService.tacheElements = [];
    this.findByEtudiant();
  }

  search() {
    if (this.searchInput.length > 0) {
      this.tacheService.tacheElements = [];
      this.searching = true;
      this.tacheService.search(this.searchInput).subscribe(datas => {
        this.tachePage.content = datas;
      });

    } else {
      this.tacheService.tacheElements = [];
      this.chargerTaches();
      this.searching = false;
    }
  }

  findByEncadreur() {
    return this.tacheService.findByEncadeur(1, this.page, this.size);
  }

  findByEtudiant() {
    return this.tacheService.findByEtudiant(1, this.page, this.size);

  }

  chargerTaches() {
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
    if (this.role == "ETUDIANT_ROLE") {
      return this.tacheService.findByEtudiant(user.id, this.page, this.size);
    }
    if (this.role == "ETUDIANT_ROLE") {
      return this.tacheService.findByEncadeur(user.id, this.page, this.size);
    }
  }

  get tachePage() {
    return this.tacheService.tachePage;
  }

  get taches() {
    return this.tacheService.taches;
  }

  nextElements() {
    if (this.page <= this.tachePage.totalPages) {
      this.page++;
      this.chargerTaches();
      this.tacheService.tacheElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.chargerTaches();
      this.tacheService.tacheElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.tachePage.totalPages) {
      this.page = i;
      this.chargerTaches();
      this.tacheService.tacheElements = [];
    }
  }

  get tableElements() {
    return this.tacheService.tacheElements;
  }

  resizePage() {
    this.chargerTaches();
    this.tacheService.tacheElements = [];
  }
}
