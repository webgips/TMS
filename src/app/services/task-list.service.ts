import { Injectable } from '@angular/core';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TaskListService {
  private statusList: string[] = [];
  modalData: ITask;
  private boardsSubject: BehaviorSubject<IBoard[]> = new BehaviorSubject([]);
  public boards: Observable<IBoard[]> = this.boardsSubject.asObservable();
  private boardsRef: AngularFirestoreCollection<IBoard>;
  private userId;
  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(data => {
      if (data && data.uid) {
        this.userId = data.uid;
        this.boardsRef = this.afs.doc(`users/${this.userId}`).collection('boards');
        this.boardsRef.valueChanges().subscribe(data => {
          this.boardsSubject.next(data);
        });
      }
    });
  }

  getBoards = (): Observable<IBoard[]> => {
    return this.boards;
  }
  getStatuses = (taskList: ITask[]): string[] => {
    taskList.forEach(task => !this.statusList.includes(task.status) ? this.statusList.push(task.status) : false );
    return this.statusList;
  }
  setModalData(taskInfo: ITask) {
    this.modalData = taskInfo;
  }
  deleteTask(task: ITask, currentBoard) {
    this.boardsRef.doc(currentBoard).get().subscribe(data => {
      const newTasksList = data.get('tasks');
      newTasksList.splice(newTasksList.map(item => item.id).indexOf(task.id), 1);
      this.boardsRef.doc(currentBoard).set({tasks: newTasksList}, {merge: true});
    });
  }
  createNewTask(task: ITask, currentBoard: string) {
    this.boardsRef.doc(currentBoard).get().subscribe(data => {
      const newTasksList = data.get('tasks');
      newTasksList.push(Object.assign({}, task));
      this.boardsRef.doc(currentBoard).set({tasks: newTasksList}, {merge: true});
    });
  }
  createNewStatus(status: string) {
    this.statusList.push(status);
  }
  createNewBoard(val: string) {
    return this.boardsRef.doc(val).set({name: val, id: this.boardsSubject.value.length, tasks: []})
    .then(() => `Board "${val}" successfully added!`);
  }
  deleteBoard(val: string) {
    return this.boardsRef.doc(val).delete().then(() => `Board "${val}" successfully deleted!`);
  }
  updateTask(task: ITask, currentBoard: string) {
    this.boardsRef.doc(currentBoard).get().subscribe(data => {
      const newTasksList = data.get('tasks');
      newTasksList.forEach((item, index) => {
        if (item.id === task.id) {
          newTasksList[index] = task;
        }
      });
      this.boardsRef.doc(currentBoard).set({tasks: newTasksList}, {merge: true});
    });
  }
}
