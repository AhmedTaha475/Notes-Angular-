import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupFlag: boolean = false;
  signUpRes: any;
  dataAlertFlagSuccess: boolean = false;
  dataAlertFlagFail: boolean = false;
  signUp: FormGroup = new FormGroup({
    "first_name": new FormControl('', [Validators.pattern(/^[a-zA-Z]{2,}$/), Validators.required]),
    "last_name": new FormControl('', [Validators.pattern(/^[a-zA-Z]{2,}$/), Validators.required]),
    "email": new FormControl('', [Validators.email, Validators.required]),
    "password": new FormControl('', [Validators.pattern(/^(?=.*[a-zA-z])(?=.*[0-9])([0-9a-zA-Z]{8,})$/), Validators.required]),
    "age": new FormControl('', [Validators.min(20), Validators.max(80), Validators.required]),

  })

  constructor(private _AuthService: AuthService) {

  }
  regData() {
    if (this.signUp.valid) {
      this.signupFlag = true;
      this._AuthService.signUp(this.signUp.value).subscribe((res) => {
        this.signUpRes = res;
        this.signupFlag = false;
        if (this.signUpRes.message == "success") {
          this.dataAlertFlagFail = false;
          this.dataAlertFlagSuccess = true;
          this.signUp.reset();

        }
        else {
          this.dataAlertFlagSuccess = false;
          this.dataAlertFlagFail = true;
          this.signUp.reset();
        }

      })
    }


  }

  ngOnInit(): void {
    $('#signup').particleground();
  }


}
