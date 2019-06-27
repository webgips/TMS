import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
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
      const info = {
          uid: data.user.uid,
          email: data.user.email,
          displayName: 'anonymos',
          photoURL: data.user.photoURL
        };
      this.authenticationService.updateUserData(info);

    }).catch((error) => {
      console.log(error)
      this.notificationService.error(error.message);
    });
  }
  get inpt() { return this.loginForm.controls; }
}
