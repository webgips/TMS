import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoardComponent } from '../board/board.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskComponent } from '../task/task.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TaskListService } from '../services/task-list.service';
import IBoard from '../models/IBoard';
import { forwardRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskListService: TaskListService;
  let spy: jasmine.Spy;
  let mockBoards: IBoard[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        HomeComponent,
        BoardComponent,
        ModalComponent,
        TaskComponent
      ],
      providers: [forwardRef(() => TaskListService)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    taskListService = fixture.debugElement.injector.get(TaskListService);
    mockBoards = [{
      id: 12,
      name: 'test board',
      tasks: [
        {
          id: 2,
          title: 'title test',
          desc: 'test descr',
          status: 'complite'
        }
      ]
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call taskListService ', () => {
  //   expect(spy.calls.any()).toBeTruthy();
  // });

  // it('should set boards', () => {
  //   spyOn(TaskListService, 'getBoards').and.returnValue(mockBoards);
  //   fixture.detectChanges();
  // });

});
