import { Injectable } from '@angular/core';
import ITask from '../models/ITask';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TaskListService {
  private statusList: string[] = [];
  modalData: ITask;
  private boards: ITask[][] = [];
  private taskList: ITask[] = [];
  userRef = this.afs.doc(`users/${this.authenticationService.userValue.uid}`);
  // private taskList: ITask[] = [
  //   {
  //     id: 0,
  //     title: 'task 1',
  //     author: 'Petya',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'To do'
  //   },
  //   {
  //     id: 1,
  //     title: 'task 2',
  //     author: 'Alex',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'To do'
  //   },
  //   {
  //     id: 2,
  //     title: 'task 3',
  //     author: 'Alex',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'Doing'
  //   },
  //   {
  //     id: 3,
  //     title: 'task 4',
  //     author: 'Vasya',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'Doing'
  //   },
  //   {
  //     id: 4,
  //     title: 'task 5',
  //     author: 'Petya',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'Done'
  //   },
  //   {
  //     id: 5,
  //     title: 'task 6',
  //     author: 'Alex',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'Done'
  //   },
  //   {
  //     id: 6,
  //     title: 'task 7 new',
  //     author: 'masha',
  //     desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  //     status: 'Done'
  //   }
  // ];
  // getTasks = (): ITask[] => this.taskList;
  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    // this.afs.doc(`users/${this.authenticationService.userValue.uid}`).set({ boards : this.boards });
    // this.getTasks().subscribe(data => console.log(data))
    // if()
    this.userRef.get().subscribe(data => {
      this.boards = data.get('boards')
      console.log(data.get('boards'));
    });
    // console.log(this.getBoards())
  }
  getTasks = (): any => {
    return this.afs.doc(`users/${this.authenticationService.userValue.uid}`).get()
  }
  getBoards = (): any => {
    return this.boards;
  }

  getStatuses = (): string[] => {
    this.taskList.forEach(task => !this.statusList.includes(task.status) ? this.statusList.push(task.status) : false );
    return this.statusList;
  }
  setModalData(taskInfo: ITask) {
    this.modalData = taskInfo;
  }
  moveTask(task: ITask, val: string) {
    this.taskList.filter(item => item.id === task.id)[0].status = val;
  }
  deleteTask(task: ITask) {
    this.taskList.splice(this.taskList.map(item => item.id).indexOf(task.id), 1);
  }
  createNewTask(task: ITask) {
    this.taskList.push(task);
  }
  createNewStatus(status: string) {
    this.statusList.push(status);
  }
  createNewBoard(val: string) {
    this.userRef.get().subscribe(data => {
      // data.{merge: true });
      const newBoards = data.get('boards')
      console.log(newBoards)
      newBoards.push({name: val, tasks: []})
      data.ref.set({boards: newBoards}, {merge: true});
    })
    console.log(val);
  }
  updateTask(task: ITask) {
  }
}
