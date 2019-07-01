import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../services/notification.service';
import { of } from 'rxjs';
import INotification from '../models/INotification';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let spy: jasmine.Spy;
  let message: INotification;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NotificationComponent ],
      providers: [ NotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = fixture.debugElement.injector.get(NotificationService);
    message =  {
        type: 'message',
        text: 'Registration sucessful'
    };

    spy = spyOn(notificationService, 'getNotification').and.returnValue(of(message));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotification one time and get notification', () => {

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length ).toEqual(1);
    expect(component.notification).toEqual(message);

  });

});
