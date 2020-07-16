import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {AuthentificationService} from "../../../services/auth/authentification.service";

@Component({
  selector: 'app-etudiant-navbar',
  templateUrl: './etudiant-navbar.component.html',
  styleUrls: ['./etudiant-navbar.component.css']
})
export class EtudiantNavbarComponent implements OnInit {
  picture = "";

  constructor(private localStorage: LocalStorageService, private authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.profilePic();
  }

  profilePic() {
    const user = this.localStorage.retrieve("logedUser");
    if (user.photo != null) {
      this.picture = 'http://localhost:8091/gestion-stage-api/user/image/' + user.photo;
    } else {
      this.picture = '../../../../assets/unnamed.png';
    }
  }

  logout() {
    return this.authentificationService.logout();
  }

}
