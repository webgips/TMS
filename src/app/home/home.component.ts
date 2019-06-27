import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import IBoard from '../models/IBoard';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../modal/modal.component.scss'],
  providers: [
    TaskListService
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  boards: IBoard[] = [];
  private currentBoard: string = localStorage.getItem('currentBoard') ?
                          JSON.parse(localStorage.getItem('currentBoard')) : null;
  private newBoard = '';
  constructor(private taskListService: TaskListService, private modalService: ModalService ) {  }
  ngOnInit() {
    this.taskListService.getBoards().subscribe(boards => this.boards = boards);
  }
  ngOnDestroy() {
  }
  showNewBoardModal(e: Event) {
    this.modalService.open('new-board-modal');
  }
  onNewBoardSubmit(e: Event) {
    this.taskListService.createNewBoard(this.newBoard);
    this.newBoard = '';
  }
  onChange(boardId: string) {
    this.currentBoard = boardId;
    localStorage.setItem('currentBoard', boardId);
  }

}
