import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import { NotificationService } from '../services/notification.service';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
class Task {
  id: number;
  title: string;
  desc: string;
  status: string;
  constructor(id: number, title: string, desc: string, status: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.status = status;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',  '../modal/modal.component.scss'],
  providers: [
    TaskListService
  ]
})

export class BoardComponent implements OnInit {
  private updateTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required],  updateOn: 'blur'}),
    desc: new FormControl('', { validators: [Validators.required],  updateOn: 'blur'}),
    status: new FormControl('', { validators: [Validators.required],  updateOn: 'blur'}),
    id: new FormControl('')
  });
  private updateStatusForm: FormGroup = new FormGroup({
    status: new FormControl('', { validators: [Validators.required],  updateOn: 'blur'}),
  }, { updateOn: 'blur' });
  private modalTaskInfo: Task = new Task(null, '', '', '');
  private newTask: Task = new Task(null, '', '', '');
  private statuses: string[] = [];
  private newStatus = '';
  @Input() board: IBoard;

  constructor(
    private taskListService: TaskListService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}
  @ViewChild('taskInfoModal', {static: false}) taskInfoModal: TemplateRef<any>;
  @ViewChild('taskEditModal', {static: false}) taskEditModal: TemplateRef<any>;
  @ViewChild('newTaskModal', {static: false}) newTaskModal: TemplateRef<any>;
  ngOnInit() {
    this.modalService.clearAll();
    if (this.board) {
      this.statuses = this.taskListService.getStatuses(this.board.tasks);
    }
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  onOpenTaskModal(task: ITask) {
    this.modalTaskInfo =  task;
    this.openDialog(this.taskInfoModal);
  }
  onOpenTaskEditModal(task: ITask) {
    this.modalTaskInfo = task;
    this.updateTaskForm.setValue({
      title: task.title,
      desc:  task.desc,
      status: task.status,
      id: task.id
    });
    this.openDialog(this.taskEditModal);
  }
  showNewTaskModal(status: string) {
    this.openDialog(this.newTaskModal);
    this.newTask = new Task(this.board.tasks.length, '', '', status);
  }
  onNewTaskSubmit(e: Event) {
    this.taskListService.createNewTask(this.newTask, this.board.name);
    this.dialog.closeAll();
  }
  onTaskUpdateSubmit(e: Event) {
    if (this.updateTaskForm.invalid) {
      return;
    }
    this.taskListService.updateTask(this.updateTaskForm.value, this.board.name);
    this.dialog.closeAll();
  }
  // showNewStatusModal(e: Event) {
  //   this.modalService.open('new-status-modal');
  // }
  onNewStatusSubmit() {
    if (this.updateStatusForm.invalid) {
      return;
    }
    this.taskListService.createNewStatus(this.updateStatusForm.value.status);
    this.updateStatusForm.reset({status: ''});
    this.dialog.closeAll();
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
