import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';
import IBoard from '../models/IBoard';

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
  constructor(private taskListService: TaskListService, private modalService: ModalService ) {
    taskListService.boards.subscribe(x => this.boards = x);
  }

  ngOnInit() {

  }
  showNewBoardModal(e: any) {
    this.modalService.open('new-board-modal');
  }
  onNewBoardSubmit(e: any) {
    this.taskListService.createNewBoard(this.newBoard);
    this.newBoard = '';
  }
  onChange(boardId: string) {
    this.currentBoard = boardId;
    localStorage.setItem('currentBoard', boardId);
  }

}
