import { Component, EventEmitter, Input, Output } from '@angular/core';
import ITask from '../models/ITask';
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

  constructor() { }

  openModal(e: Event, task: ITask) {
    e.preventDefault();
    this.openTaskModal.emit(task);
  }
  openEditModal(e: Event, task: ITask) {
    e.stopPropagation();
    e.preventDefault();
    this.openTaskEditModal.emit(task);
  }

}
