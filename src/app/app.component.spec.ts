import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ModalComponent } from './modal/modal.component';
import { TaskListService } from './task-list.service';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskListService: TaskListService;
  let spy: jasmine.Spy;
  let mockTasks;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        TaskComponent,
        ModalComponent,
        HeaderComponent
      ],
      providers: [forwardRef(() => TaskListService)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
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


  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call taskListService ', () => {
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set tasks', () => {
    expect(component.taskList).toEqual(mockTasks);
  });

});
