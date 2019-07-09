import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import IBoard from '../models/IBoard';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    TaskListService
  ]
})
export class HomeComponent implements OnInit {
  boards: IBoard[] = [];
  private isLoading = true;
  private currentBoard: string = localStorage.getItem('currentBoard') ?
    localStorage.getItem('currentBoard') : null;
  private newBoardForm: FormGroup = new FormGroup({
    newBoard: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1), this.newBoardValidator.bind(this)],
      updateOn: 'blur'
    }),
  });
  constructor(
    private taskListService: TaskListService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.taskListService.getBoards().subscribe(boards => {
      this.boards = boards;
      if (this.boards.length) {
        this.isLoading = false;
      }
    });
  }
  newBoardValidator(control: FormControl): { [s: string]: boolean } {
    const boardsName = [];
    this.boards.forEach(board => {
      boardsName.push(board.name);
    });
    if (boardsName.includes(control.value)) {
      return { nameExist: true, name: control.value };
    }
    return null;
  }
  openDialog(e: Event, templateRef: TemplateRef<any>) {
    e.preventDefault();
    this.dialog.open(templateRef, { autoFocus: false });
  }
  onNewBoardSubmit(e: Event) {
    e.preventDefault();
    this.taskListService.createNewBoard(this.newBoardForm.value.newBoard).then(res => this.notificationService.message(res));
    this.newBoardForm.reset();
    this.dialog.closeAll();
  }
  onChange(boardId: string) {
    this.currentBoard = boardId;
    localStorage.setItem('currentBoard', boardId);
  }
  get inpt() { return this.newBoardForm.controls; }
  newBoardFormError() {
    return (this.inpt.newBoard.errors && this.inpt.newBoard.errors.nameExist)
      && (this.newBoardForm.dirty || this.newBoardForm.touched);
  }

}
