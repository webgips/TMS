import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { ModalService } from '../services/modal.service';
import ITask from '../models/ITask';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let modalService: ModalService;
  let mockTask: ITask;
  let spy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [ ModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    modalService = fixture.debugElement.injector.get(ModalService);
    mockTask = {
      id: 0,
      title: 'test title',
      desc: 'test desc',
      status: 'test status'
    };
    spy = spyOn(modalService, 'open').withArgs('task-modal');
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

  // it('should called open popup', () => {
  //   expect(spy).toHaveBeenCalled();
  //   expect(spy.calls.all().length ).toEqual(1);
  // });

});
