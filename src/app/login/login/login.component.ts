import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { MessageService } from '../../shared/services/message.service';
import { AuthService } from '../../shared/sevices/auth.service';
import { Globals } from '../../translator/class/globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm

  constructor(
    private ls: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public auth: AuthService,
    public glob: Globals
    //public messs:MessageService
  ) { }
  ngOnInit() {
    let json = JSON.parse(sessionStorage.getItem('pass'));
    // let json;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (json != null && json != undefined) {
      this.getLoggedIn(json)
    }
  }
  submitLogin() {
    let json = {
      user: this.loginForm.get('username').value,
      pass: this.loginForm.get('password').value
    }
    sessionStorage.setItem('pass', JSON.stringify(json));

    this.getLoggedIn(json)
  }
  getLoggedIn(json) {
    this.ls.getLoggedIn(json).subscribe(data => {
      const userPermission = data.data.permission
      console.log(userPermission)
      sessionStorage.setItem('userPermission', userPermission);
      if (data.response_code < 500) {
        try {

          this.auth.setTocken(data.data.token);
          this.auth.userName = data.data.userName;

          this.auth.permission = data.data.permission;
          this.auth.isLogged = true;
          this.router.navigate(["../main"]);
        }
        catch (e) {

        }
      }
    });
  }

}