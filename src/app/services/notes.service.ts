import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl = "https://routeegypt.herokuapp.com/";
  constructor(private _HttpClient: HttpClient) { }


  addNote(data: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "addNote", data);
  }
  getNotes(data: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "getUserNotes", data);
  }
  updateNote(data: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + "updateNote", data);
  }
  deleteNote(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      body: {
        NoteID: data.NoteID,
        token: data.token,
      }
    }

    return this._HttpClient.delete(this.baseUrl + "deleteNote", options)
  }
}
