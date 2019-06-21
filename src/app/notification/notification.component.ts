import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import INotification from '../models/INotification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: INotification;
  constructor(private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(message => {
      this.notification = message;
      if (message && message.type === 'error') {
        this.notification.cssClass = 'error';
      }
      if (message && message.type === 'message') {
        setTimeout(() => this.notification = undefined , 5000);
      }
    });
  }

}
