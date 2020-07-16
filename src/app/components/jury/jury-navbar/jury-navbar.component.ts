import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../../services/auth/authentification.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-jury-navbar',
  templateUrl: './jury-navbar.component.html',
  styleUrls: ['./jury-navbar.component.css']
})
export class JuryNavbarComponent implements OnInit {
  picture = "";

  constructor(private authentificationService: AuthentificationService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
  }

  logout() {
    return this.authentificationService.logout();
  }

  profilePic() {
    const user = this.localStorage.retrieve("logedUser");
    if (user.photo != null) {
      this.picture = 'http://localhost:8091/gestion-stage-api/user/image/' + user.photo;
    } else {
      this.picture = '../../../../assets/unnamed.png/';
    }
  }

}
