import { Injectable } from '@angular/core';

@Injectable()
export class TaskListService {
  private taskList: {status: string, tasks: {title: string, author: string, desc: string}[] }[] = [
    {
      status: "To do",
      tasks: [
        {
          title: 'task 1',
          author: 'Petya',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
          title: 'task 2',
          author: 'Alex',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        }
      ]
    },
    {
      status: "Doing",
      tasks: [
        {
          title: 'task 3',
          author: 'Alex',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
          title: 'task 4',
          author: 'Vasya',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
      ]
    },
    {
      status: "Done",
      tasks: [
        {
          title: 'task 5',
          author: 'Petya',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
          title: 'task 6',
          author: 'Alex',
          desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        }
      ]
    }
  ];
  getTasks(): {status: string, tasks: {title: string, author: string, desc: string}[] }[]{
    return this.taskList;
  }
  // addTask(name: string){
  //   this.taskList.push(name);
  // }
}