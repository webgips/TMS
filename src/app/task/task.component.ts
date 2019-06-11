import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent{
  @Input() task: {};


  openModal(e: any, task: {}) {
    e.preventDefault()
    console.log(task);
  }
}
