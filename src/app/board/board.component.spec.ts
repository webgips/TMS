import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { TaskComponent } from '../task/task.component';
import { ModalComponent } from '../modal/modal.component';
import { HeaderComponent } from '../header/header.component';
import { forwardRef } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationComponent } from '../notification/notification.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import ITask from '../models/ITask';
import { MatDialogModule } from '@angular/material';
import IStatuses from '../models/IStatuses';
import { of } from 'rxjs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let taskListService: TaskListService;
  let spy: jasmine.Spy;
  let mockStatuses: IStatuses[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatDialogModule
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        TaskComponent,
        ModalComponent,
        HeaderComponent,
        NotificationComponent
      ],
      providers: [TaskListService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    taskListService = fixture.debugElement.injector.get(TaskListService);
    mockStatuses = [
    {
      name: 'test status',
      tasks: [
        {
          id: '1',
          title: 'test',
          desc: '',
          status: 'test status'
        },
      ]
    },
    {
      name: '2 status',
      tasks: [
        {
          id: '3',
          title: 'test',
          desc: '',
          status: 'test status'
        },
      ]
    },
  ];
    component.board = {
      id: '1',
      name: 'test board',
      statuses: [
        {
          name: 'test status',
          tasks: [
            {
              id: '1',
              title: 'test',
              desc: '',
              status: 'test status'
            },
            {
              id: '2',
              title: 'test',
              desc: '',
              status: 'test status2'
            },
            {
              id: '3',
              title: 'test',
              desc: '',
              status: 'test status3'
            }
          ]
        }
      ]
    };
    spy = spyOn(taskListService, 'getStatuses').withArgs(component.board).and.returnValue(of(mockStatuses));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskListService ', () => {
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should get statuses', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    fixture.detectChanges();
  });

});
