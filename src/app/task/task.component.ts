import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal/modal.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: {};
  @Input() status: string;
  @Output() openTaskModal = new EventEmitter<any>();

  constructor(private modalService: ModalService) { }

  openModal(e: any, task: {}, status: string) {
    e.preventDefault();
    this.openTaskModal.emit(task);
    this.modalService.open('task-modal');
  }
}
