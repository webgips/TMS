import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { TaskComponent } from '../task/task.component';
import { ModalComponent } from '../modal/modal.component';
import { HeaderComponent } from '../header/header.component';
import { forwardRef } from '@angular/core';
import ITask, { TaskListService } from '../task-list.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let taskListService: TaskListService;
  let spy: jasmine.Spy;
  let mockTasks: ITask[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        TaskComponent,
        ModalComponent,
        HeaderComponent,
      ],
      providers: [forwardRef(() => TaskListService)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    taskListService = fixture.debugElement.injector.get(TaskListService);
    mockTasks = [{
      id: 0,
      title: 'test task',
      author: 'John',
      desc: 'lorem ipsum',
      status: 'To do'
    }];
    spy = spyOn(taskListService, 'getTasks').and.returnValue(mockTasks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call taskListService ', () => {
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set tasks', () => {
    expect(component.taskList).toEqual(mockTasks);
  });
});
