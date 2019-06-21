import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import ITask from '../task-list.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: ITask;
  @Input() status: string;
  @Output() openTaskModal = new EventEmitter<ITask>();
  @Output() openTaskEditModal = new EventEmitter<any>();

  constructor(private modalService: ModalService) { }

  openModal(e: Event, task: ITask) {
    e.preventDefault();
    this.openTaskModal.emit(task);
    this.modalService.open('task-modal');
  }
  openEditModal(e: Event, task: ITask) {
    e.stopPropagation();
    e.preventDefault();
    this.openTaskEditModal.emit(task);
    this.modalService.open('task-edit-modal');
  }

}
