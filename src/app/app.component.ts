import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task management system'
  taskList = [
    {
      name: 'To do',
      tasks: [
        {
          title: 'task 1',
          author: 'Maxim'
        },
        {
          title: 'task 2',
          author: 'Alex'
        }
      ]
    },
    {
      name: 'Working',
      tasks: [
        {
          title: 'task 3',
          author: 'Vasya'
        },
        {
          title: 'task 4',
          author: 'Maxim'
        }
      ]
    },
    {
      name: 'Done',
      tasks: [
        {
          title: 'task 5',
          author: 'Petya'
        },
        {
          title: 'task 6',
          author: 'Maxim'
        }
      ]
    },

  ]
}