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
    if (this.authenticationService.userValue) {
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
      },
      error => {
        this.notificationService.error(error.message);
      }
    );
  }
  get inpt() { return this.loginForm.controls; }
}
