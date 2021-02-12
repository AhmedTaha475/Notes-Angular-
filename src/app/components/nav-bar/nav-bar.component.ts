import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public _AuthService: AuthService, private _Router: Router) { }



  signOut() {
    localStorage.clear();
    this._Router.navigateByUrl("/signIn")
  }
  ngOnInit(): void {
  }

}
