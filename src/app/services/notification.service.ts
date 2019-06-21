import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import INotification from '../models/INotification';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = new Subject<INotification>();
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart ){
        this.clear();
      }
    });
  }
  getNotification(): Observable<INotification> {
    return this.notification.asObservable();
  }
  message(message: any) {
    this.notification.next({type: 'message', text: message});
  }
  error(message: any) {
    this.notification.next({type: 'error', text: message});
  }
  clear() {
    this.notification.next();
  }
}
