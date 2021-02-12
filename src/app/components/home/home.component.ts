import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token;
  deltedFlag: boolean = false;
  upadtedFlag: boolean = false;
  noNotesFlag: boolean = false;
  noteId: any;
  Router: any;
  decoded: any;
  addedNoteData: any;
  waitingForDataFlag: boolean = false;
  allNotes: any;
  addNote: FormGroup = new FormGroup({
    "title": new FormControl("", [Validators.required]),
    "desc": new FormControl("", [Validators.required]),

  })
  constructor(private _NotesService: NotesService, private _Router: Router) {

    try {
      this.token = localStorage.getItem("Token");
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(["/signin"]);
    }
    this.getNotes();

  }
  addNewNote() {
    if (this.addNote.valid) {
      let data = {
        "title": this.addNote.value.title,
        "desc": this.addNote.value.desc,
        "citizenID": this.decoded._id,
        "token": this.token,
      }

      this.waitingForDataFlag = true
      this._NotesService.addNote(data).subscribe((res) => {
        this.addedNoteData = res;
        this.waitingForDataFlag = false;
        this.addNote.reset();
        $("#addNotes").modal("hide");
        this.getNotes();
      })
    }

  }
  getNotes() {
    let data = {
      "token": this.token,
      "userID": this.decoded._id,
    }
    this._NotesService.getNotes(data).subscribe((res) => {
      this.allNotes = res.Notes;

      if (res.message == "no notes found") {
        this.noNotesFlag = true;
      } else {
        this.noNotesFlag = false;
      }
    })
  }

  getId(id: any) {
    this.noteId = id;

  }
  deleteNote() {
    let data = {
      "NoteID": this.noteId,
      "token": this.token,
    }
    this.deltedFlag = true;
    this._NotesService.deleteNote(data).subscribe((res) => {
      if (res.message == "deleted") {
        this.deltedFlag = false;
        $("#deleteNote").modal("hide");
        this.getNotes();
      }
    })
  }


  updateNote() {
    if (this.addNote.valid) {
      let updataobject =
      {
        "token": this.token,
        "NoteID": this.noteId,
        "title": this.addNote.value.title,
        "desc": this.addNote.value.desc,
      }
      this.upadtedFlag = true;
      this._NotesService.updateNote(updataobject).subscribe((res) => {
        if (res.message == "updated") {
          this.upadtedFlag = false;
          $("#editNote").modal("hide");
          this.getNotes();
          this.addNote.reset();
        }
      })
    }

  }

  adjust() {
    for (var i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i]._id == this.noteId) {
        this.addNote.controls.title.setValue(this.allNotes[i].title);
        this.addNote.controls.desc.setValue(this.allNotes[i].desc);

      }
    }

  }
  ngOnInit(): void {
  }
}
