import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../../services/search/search.service";
import {AuthentificationService} from "../../../services/auth/authentification.service";
import {LocaleSettings} from "primeng";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  picture = "";

  constructor(private searchService: SearchService, private authentificationService: AuthentificationService, private localStorage: LocalStorageService) {
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
