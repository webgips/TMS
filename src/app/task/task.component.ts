import { Component, Input } from '@angular/core';
import { ModalService } from '../modal/modal.service'
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent{
  @Input() task: {};
  @Input() status: string;

  constructor(private modalService: ModalService){}
  openModal(e: any, task: {}, status: string) {
    e.preventDefault()
    this.modalService.setModalData(task)
    this.modalService.open('task-modal')
  }
}
