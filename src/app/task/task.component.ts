import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { TaskListService } from '../task-list.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: {};
  @Input() status: string;

  @Output() onOpenTaskModal = new EventEmitter<any>();

  openModal(e: any, task: {}, status: string) {
    e.preventDefault();
    this.onOpenTaskModal.emit(task);
    this.modalService.open('task-modal');
  }
  constructor(private modalService: ModalService, private taskListService: TaskListService) { }
}
