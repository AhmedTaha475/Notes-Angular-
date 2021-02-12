import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInData: any;
  alertFlag: boolean = false;
  buttonflag: boolean = false;
  signIn: FormGroup = new FormGroup({
    "email": new FormControl('', [Validators.email, Validators.required]),
    "password": new FormControl('', [Validators.pattern(/^(?=.*[a-zA-z])(?=.*[0-9])([0-9a-zA-Z]{8,})$/), Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _Router: Router) {
  }


  login() {

    if (this.signIn.valid) {
      this.buttonflag = true;
      this._AuthService.signIn(this.signIn.value).subscribe((res) => {
        this.signInData = res;
        if (this.signInData.message == "success") {
          this.alertFlag = false;
          localStorage.setItem("Token", this.signInData.token);
          this._Router.navigateByUrl("/home");
          this.signIn.reset();
          this.buttonflag = false;
        }
        else {
          this.buttonflag = false;
          this.alertFlag = true;
          this.signIn.reset();


        }

      })
    }
    else {
      this.buttonflag = false;
      this.alertFlag = true;
      this.signIn.reset();


    }


  }


  ngOnInit(): void {
    $('#signin').particleground();
  }

}
