import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editInfos = {
    "nom":false,
    "prenom":false,
    "email":false,
    "pwd":false,
    "adress":false,
    "tele":false,
    "sexe":false,
    "dateNaissance":false,
    "photo":false
  }
  constructor() { }

  ngOnInit(): void {
  }

}
