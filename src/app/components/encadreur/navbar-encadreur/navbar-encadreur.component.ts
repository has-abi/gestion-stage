import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../../services/auth/authentification.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-navbar-encadreur',
  templateUrl: './navbar-encadreur.component.html',
  styleUrls: ['./navbar-encadreur.component.css']
})
export class NavbarEncadreurComponent implements OnInit {
  searchInput: string;
  searching = false;
  picture = "";

  constructor(private authentificationService: AuthentificationService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.profilePic();
  }

  logout() {
    return this.authentificationService.logout();
  }

  profilePic() {
    const user = this.localStorage.retrieve("logedUser");
    if (user.photo != null) {
      this.picture = 'http://localhost:8091/gestion-stage-api/user/image/' + user.photo;
    } else {
      this.picture = '../../../../assets/unnamed.png';
    }
  }

}
