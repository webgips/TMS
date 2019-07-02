import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

class User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  constructor(uid: string, email: string, displayName: string, photoURL: string) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  returnUrl: string;
  submitted = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
    ) {
    if (this.authenticationService.userId) {
      this.router.navigate(['/']);
    }
  }
  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).then(
      res => {
        this.router.navigate(['/']);
        this.notificationService.message('Login successful');
      },
      error => {
        this.notificationService.error(error.message);
      }
    );
  }
  anonymLogin(e: Event) {
    e.preventDefault();
    this.authenticationService.anonymosLogin().then((data) => {
      this.router.navigate(['/']);
      this.notificationService.message('Login anonymously');
      const info = new User(data.user.uid, data.user.email, data.user.displayName, data.user.photoURL);
      this.authenticationService.updateUserData(info);
    }).catch((error) => {
      this.notificationService.error(error.message);
    });
  }
  get inpt() { return this.loginForm.controls; }
}
