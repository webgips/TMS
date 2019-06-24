import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../services/task-list.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    TaskListService
  ]
})
export class HomeComponent implements OnInit {
  boards: [] = [];
  private newBoard = '';
  constructor(private taskListService: TaskListService, private modalService: ModalService ) {
    this.boards = taskListService.getBoards();
  }

  ngOnInit() {
    console.log(this.boards)
  }
  showNewBoardModal(e: any) {
    this.modalService.open('new-board-modal');
  }
  onNewBoardSubmit(e: any) {
    this.taskListService.createNewBoard(this.newBoard);
    this.newBoard = '';
  }

}
