import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import ITask from '../models/ITask';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTask: ITask;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    mockTask = {
      id: '0',
      title: 'test title',
      desc: 'test desc',
      status: 'test status'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set task name and desc', () => {
    component.task = mockTask;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.task__title').innerText).toEqual(`test title`);
    expect(fixture.nativeElement.querySelector('.task__desc').innerText).toEqual(`test desc`);
  });


});
