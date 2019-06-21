import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authenticationService.register(this.registerForm.value).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.notificationService.message('Registration successful');
      },
      error => {
        this.notificationService.error(error);
      });
  }
  get inpt() { return this.registerForm.controls; }
}
