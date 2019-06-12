import { Injectable } from '@angular/core';

@Injectable()
export class TaskListService {
  private statuses = []
  private taskList: { id: number, title: string, author: string, desc: string, status: string }[] = [
    {
      id: 1,
      title: 'task 1',
      author: 'Petya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'To do'
    },
    {
      id: 2,
      title: 'task 2',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'To do'
    },
    {
      id: 3,
      title: 'task 3',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Doing'
    },
    {
      id: 4,
      title: 'task 4',
      author: 'Vasya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Doing'
    },
    {
      id: 5,
      title: 'task 5',
      author: 'Petya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    },
    {
      id: 6,
      title: 'task 6',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    },
    {
      id: 7,
      title: 'task 7 new',
      author: 'masha',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    }
  ]
  getTasks = (): { title: string, author: string, desc: string }[] => this.taskList;
  getStatuses() {
    this.taskList.forEach(task => !this.statuses.includes(task.status)? this.statuses.push(task.status) : false )
    return this.statuses
  }
  moveTask(task: any, val: string){
    this.taskList.filter(item => item.id == task.id)[0].status = val
    console.log(this.getStatuses())
  }
}