import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { ModalService } from '../services/modal.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let modal: ModalService;
  const modalServiceStub = {
    open: () => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [{provide: ModalService, useValue: modalServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    modal = TestBed.get(ModalService);
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called open', () => {
    const openSpy = spyOn(modal, 'open');
    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalled();
  });

});
