import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { NotificationService } from '../services/notification.service';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import createId from '../createId';
import IStatuses from '../models/IStatuses';

class Task {
  id: string;
  title: string;
  desc: string;
  status: string;
  constructor(id: string, title: string, desc: string, status: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.status = status;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [
    TaskListService
  ]
})

export class BoardComponent implements OnInit {
  private updateTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    desc: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    status: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    oldStatus: new FormControl(''),
    id: new FormControl('')
  });
  private updateStatusForm: FormGroup = new FormGroup({
    status: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
  }, { updateOn: 'blur' });
  private modalTaskInfo: Task = new Task('', '', '', '');
  private newTask: Task = new Task('', '', '', '');
  private statuses: IStatuses[] = [];
  @Input() board: IBoard;

  constructor(
    private taskListService: TaskListService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }
  @ViewChild('taskInfoModal', { static: false }) taskInfoModal: TemplateRef<any>;
  @ViewChild('taskEditModal', { static: false }) taskEditModal: TemplateRef<any>;
  @ViewChild('newTaskModal', { static: false }) newTaskModal: TemplateRef<any>;
  ngOnInit() {
    if (this.board) {
      this.taskListService.getStatuses(this.board).subscribe(data => this.statuses = data);
    }
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  onOpenTaskModal(task: ITask) {
    this.modalTaskInfo = task;
    this.openDialog(this.taskInfoModal);
  }
  onOpenTaskEditModal(task: ITask) {
    this.modalTaskInfo = task;
    this.updateTaskForm.setValue({
      title: task.title,
      desc: task.desc,
      status: task.status,
      id: task.id,
      oldStatus: task.status
    });
    this.openDialog(this.taskEditModal);
  }
  showNewTaskModal(status: any) {
    this.openDialog(this.newTaskModal);
    this.newTask = new Task(createId(), '', '', status.name);
  }
  onNewTaskSubmit(e: Event) {
    this.taskListService.createNewTask(this.newTask, this.board.name, this.newTask.status);
    this.dialog.closeAll();
  }
  onTaskUpdateSubmit(e: Event) {
    if (this.updateTaskForm.invalid) {
      return;
    }
    this.taskListService.updateTask(this.updateTaskForm.value, this.board.name);
    this.dialog.closeAll();
  }
  onNewStatusSubmit() {
    if (this.updateStatusForm.invalid) {
      return;
    }
    this.taskListService.createNewStatus(this.board.name, this.updateStatusForm.value.status).then(res => {
      this.dialog.closeAll();
      this.notificationService.message(`Status "${this.updateStatusForm.value.status}" successfully added!`);
      this.updateStatusForm.reset({ status: '' });
    });
  }
  deleteTask(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.taskListService.deleteTask(this.modalTaskInfo, this.board.name);
    this.dialog.closeAll();
  }
  deleteBoard(e: Event, board: IBoard) {
    e.preventDefault();
    this.taskListService.deleteBoard(board.name).then(res => this.notificationService.message(res));
  }
  deleteStatus(e: Event, board: IBoard, statusName: string) {
    e.preventDefault();
    this.taskListService.deleteStatus(board.name, statusName).then(res => this.notificationService.message(res));
  }

}
