import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';
import { ModalService } from './modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './modal/modal.component.scss'],
  providers:[
    TaskListService
  ],
})
export class AppComponent implements OnInit {
  private title: string = "Task management system";
  private taskList: any[] = [];
  private modalTaskInfo: any = {};
  private statuses: string[] = [];
  private newTask: any = {};
  private newStatus: string = '';
  constructor(private taskListService: TaskListService, private modalService: ModalService){}

  ngOnInit(){
    this.taskList =  this.taskListService.getTasks();
    this.statuses = this.taskListService.getStatuses();
    this.modalTaskInfo = this.taskListService.getModalData()
    
  }
  onOpenTaskModal(task: any){
    this.modalTaskInfo = task
  }
  onChangeStatus(e: any){
    this.taskListService.moveTask(this.modalTaskInfo,e.target.value)
  }
 
  showNewTaskModal(status: string){
    this.modalService.open('new-task-modal')
    this.newTask = {}
    this.newTask.id = this.taskList.length + 1
    this.newTask.status = status
  }
  onNewTaskSubmit(e: any){
    this.taskListService.createNewTask(this.newTask)
  }
  showNewStatusModal(e: any){
    this.modalService.open('new-status-modal')
  }
  onNewStatusSubmit(e: any){
    this.taskListService.createNewStatus(this.newStatus)
    this.newStatus = ''
  }

}