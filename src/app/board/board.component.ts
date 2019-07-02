import { Component, OnInit, Input } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import { NotificationService } from '../services/notification.service';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',  '../modal/modal.component.scss'],
  providers: [
    TaskListService
  ]
})

export class BoardComponent implements OnInit {
  updateTaskForm: FormGroup;
  private modalTaskInfo: ITask = {
    title: '',
    id: null,
    desc: '',
    status: ''
  };
  private newTask: ITask = {
    title: '',
    id: null,
    desc: '',
    status: ''
  };
  private statuses: string[] = [];
  private newStatus = '';
  @Input() board: IBoard;

  constructor(
    private taskListService: TaskListService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.modalService.clearAll();
    if (this.board) {
      this.statuses = this.taskListService.getStatuses(this.board.tasks);
    }
    this.updateTaskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      id: new FormControl('')
    });
  }
  onOpenTaskModal(task: ITask) {
    this.modalTaskInfo = task;
  }
  onOpenTaskEditModal(task: ITask) {
    this.modalTaskInfo = task;
    this.updateTaskForm.setValue({
      title: task.title,
      desc:  task.desc,
      status: task.status,
      id: task.id
    });
  }
  showNewTaskModal(status: string) {
    this.modalService.open('new-task-modal');
    this.newTask = {
      title: '',
      id: null,
      desc: '',
      status: ''
    };
    this.newTask.id = this.board.tasks.length;
    this.newTask.status = status;
  }
  onNewTaskSubmit(e: Event) {
    this.taskListService.createNewTask(this.newTask, this.board.name);
  }
  onTaskUpdateSubmit(e: Event) {
    if (this.updateTaskForm.invalid) {
      return;
    }
    this.taskListService.updateTask(this.updateTaskForm.value, this.board.name);
  }
  showNewStatusModal(e: Event) {
    this.modalService.open('new-status-modal');
  }
  onNewStatusSubmit(e: Event) {
    this.taskListService.createNewStatus(this.newStatus);
    this.newStatus = '';
  }
  deleteTask(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.taskListService.deleteTask(this.modalTaskInfo, this.board.name);
    this.modalService.closeAll();
  }
  deleteBoard(e: Event, board) {
    e.preventDefault();
    this.taskListService.deleteBoard(board.name).then(res => this.notificationService.message(res));
  }

}
