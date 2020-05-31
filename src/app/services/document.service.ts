import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url="http://localhost:8091/stage/document/"
  constructor(private http:HttpClient) { }

  upload(file: File,titre:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('titre', titre);
    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.url);
  }

}
