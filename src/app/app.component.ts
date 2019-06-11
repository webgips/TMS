import { Component, OnInit } from '@angular/core';
import { TaskListService } from './task-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[
    TaskListService
  ],
})
export class AppComponent implements OnInit {
  title = 'Task management system';
  taskList = []
  constructor(private taskListService: TaskListService){}

  ngOnInit(){
      this.taskList =  this.taskListService.getTasks();
      console.log(this.taskList)
  }
}