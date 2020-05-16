import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-sujet-forum',
  templateUrl: './list-sujet-forum.component.html',
  styleUrls: ['./list-sujet-forum.component.css']
})
export class ListSujetForumComponent implements OnInit {
  commenter = false;
  constructor() { }

  ngOnInit(): void {
  }

}
