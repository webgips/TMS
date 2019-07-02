import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import IBoard from '../models/IBoard';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';

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
                          JSON.parse(localStorage.getItem('currentBoard')) : null;
  private newBoard = '';
  constructor(
    private taskListService: TaskListService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {  }
  ngOnInit() {
    this.taskListService.getBoards().subscribe(boards => this.boards = boards);
  }
  showNewBoardModal(e: Event) {
    this.modalService.open('new-board-modal');
  }
  openDialog(e: Event, templateRef: TemplateRef<any>) {
    e.preventDefault();
    this.dialog.open(templateRef);
  }
  onNewBoardSubmit(e: Event) {
    this.taskListService.createNewBoard(this.newBoard).then(res => this.notificationService.message(res));
    this.newBoard = '';
    this.dialog.closeAll();
  }
  onChange(boardId: string) {
    this.currentBoard = boardId;
    localStorage.setItem('currentBoard', boardId);
  }

}
