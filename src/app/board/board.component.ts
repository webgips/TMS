import { Component, OnInit, Input } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',  '../modal/modal.component.scss'],
  providers: [
    TaskListService
  ]
})

export class BoardComponent implements OnInit {
  private modalTaskInfo: any = {};
  private statuses: string[] = [];
  private newTask: ITask = {};
  private newStatus = '';
  @Input() board: IBoard;
  constructor(private taskListService: TaskListService, private modalService: ModalService) { }

  ngOnInit() {
    this.taskList = this.taskListService.getTasks();
    this.statuses = this.taskListService.getStatuses(this.board.tasks);
  }
  onOpenTaskModal(task: any) {
    this.modalTaskInfo = task;
  }
  onOpenTaskEditModal(task: any) {
    this.modalTaskInfo = task;
  }
  onChangeStatus(e: any) {
    this.taskListService.moveTask(this.modalTaskInfo, e.target.value);
  }
  showNewTaskModal(status: string) {
    this.modalService.open('new-task-modal');
    this.newTask = {};
    this.newTask.id = this.board.tasks.length;
    this.newTask.status = status;
  }
  onNewTaskSubmit(e: any) {
    this.taskListService.createNewTask(this.newTask, this.board.name);
  }
  onTaskUpdateSubmit(e: any) {
    this.taskListService.updateTask(this.modalTaskInfo);
  }
  showNewStatusModal(e: any) {
    this.modalService.open('new-status-modal');
  }
  onNewStatusSubmit(e: any) {
    this.taskListService.createNewStatus(this.newStatus);
    this.newStatus = '';
  }
  deleteTask(e: any) {
    this.taskListService.deleteTask(this.modalTaskInfo);
    this.modalService.closeAll();
  }

}
