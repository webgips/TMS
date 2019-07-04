import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import IBoard from '../models/IBoard';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../modal/modal.component.scss'],
  providers: [
    TaskListService
  ]
})
export class HomeComponent implements OnInit {
  boards: IBoard[] = [];
  private currentBoard: string = localStorage.getItem('currentBoard') ?
                          localStorage.getItem('currentBoard') : null;
  // private newBoard = '';
  private newBoardForm: FormGroup = new FormGroup({
    newBoard: new FormControl('', { validators: [Validators.required, this.newBoardValidator.bind(this)], updateOn: 'blur'}),
  });
  constructor(
    private taskListService: TaskListService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {  }
  ngOnInit() {
    this.taskListService.getBoards().subscribe(boards => this.boards = boards);
  }
  newBoardValidator(control: FormControl): {[ s: string]: boolean} {
    const boardsName = [];
    this.boards.forEach((board, index) => {
     boardsName.push(board.name);
    });
    console.log(boardsName.includes(control.value))
    if (boardsName.includes(control.value)) {
      return {'newBoard': true};
    }
    return null;
  }
  showNewBoardModal(e: Event) {
    this.modalService.open('new-board-modal');
  }
  openDialog(e: Event, templateRef: TemplateRef<any>) {
    e.preventDefault();
    this.dialog.open(templateRef);
  }
  onNewBoardSubmit(e: Event) {
    this.taskListService.createNewBoard(this.newBoardForm.value.newBoard).then(res => this.notificationService.message(res));
    this.newBoardForm.value.newBoard = '';
    this.dialog.closeAll();
  }
  onChange(boardId: string) {
    this.currentBoard = boardId;
    localStorage.setItem('currentBoard', boardId);
  }

}
