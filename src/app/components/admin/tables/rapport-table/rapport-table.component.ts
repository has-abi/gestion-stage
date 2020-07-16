import {Component, OnInit} from '@angular/core';
import {RapportService} from "../../../../services/rapport.service";
import {LocalStorageService} from "ngx-webstorage";
import {Document} from "../../../../models/document.model";
import {DocumentService} from "../../../../services/document.service";
import {CommentDocService} from "../../../../services/comment-doc.service";
import {Rapport} from "../../../../models/rapport.model";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-rapport-table',
  templateUrl: './rapport-table.component.html',
  styleUrls: ['./rapport-table.component.css']
})
export class RapportTableComponent implements OnInit {
  page = 0;
  size = 5;
  id = 1;
  sort = "asc";
  searchInput = "";
  searching = false;
  tableOrder = {
    order: "asc",
    prop: "id"
  }
  role = "";
  commenterDocum = false;

  constructor(private rapportService: RapportService, private sessionStorage: LocalStorageService, private documentService: DocumentService,
              private commentDocService: CommentDocService,private notificationService:NotificationService) {
  }

  ngOnInit(): void {
    this.findAll();
    const user = this.sessionStorage.retrieve("logedUser");
    this.role = user.roles[0].role;
  }

  get rapports() {
    return this.rapportService.rapports;
  }

  findAll() {
    this.rapportService.tableElements = [];
    return this.rapportService.findAllRapports(this.page, this.size, this.sort);
  }
  diaplayRapport(rapport: Rapport) {
    this.rapportService.rapport = rapport;
  }

  get pageRapport() {
    return this.rapportService.rapportPage;
  }

  nextElements() {
    if (this.page <= this.pageRapport.totalPages) {
      this.page++;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }

  prevElements() {
    if (this.page >= 0) {
      this.page--;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }

  getIndexPage(i: number) {
    if (i <= this.pageRapport.totalPages) {
      this.page = i;
      this.findAll();
      this.rapportService.tableElements = [];
    }
  }

  get tableElements() {
    return this.rapportService.tableElements;
  }

  resizePage() {
    this.findAll();
    this.rapportService.tableElements = [];
  }

  search() {
    if (this.searchInput.length > 0) {
      this.searching = true;
      this.rapportService.search(this.searchInput);
      this.pageRapport.content = this.rapports;
    } else {
      this.findAll();
      this.rapportService.tableElements = [];
      this.searching = false;
    }
  }

  changeOrder(order: string, prop: string) {
    if (order == "asc" && prop == "id") {
      this.rapportService.findAllRapports(this.page, this.size, "asc");
    }
    if (order == "desc" && prop == "id") {
      this.rapportService.findAllRapports(this.page, this.size, "desc");
    }
    this.tableOrder.order = order;
    this.tableOrder.prop = prop;
  }


  get document() {
    return this.documentService.document;
  }

  commenter(d: Document) {
    this.documentService.document = d;
    this.commentDocService.findByDocument(this.documentService.document.id).subscribe(datas => {
      this.commentDocService.commentDocuments = datas;
      this.commenterDocum = true;
    });

  }

  delete(rapport:Rapport){
    this.rapportService.delete(rapport).subscribe(resp=>{
      if(resp>0){
        this.notificationService.showSuccess("Le rapport est supprimé avec succès!","Rapport de stage");
      }else{
        this.notificationService.showWarning("Erreur dans la supression du rapport de stage!","Rapport de stage");
      }
    },error => {
      this.notificationService.showError("Erreur est survenu!","Rapport de stage");
    })
  }
}
