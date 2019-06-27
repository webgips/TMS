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

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let taskListService: TaskListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        TaskComponent,
        ModalComponent,
        HeaderComponent,
        NotificationComponent
      ],
      providers: [forwardRef(() => TaskListService)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    taskListService = fixture.debugElement.injector.get(TaskListService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
