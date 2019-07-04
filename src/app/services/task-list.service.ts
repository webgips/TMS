import { Injectable } from '@angular/core';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import createId from '../createId';
import IStatuses from '../models/IStatuses';

@Injectable()
export class TaskListService {
  private statusList: string[] = [];
  modalData: ITask;
  private boardsSubject: BehaviorSubject<IBoard[]> = new BehaviorSubject([]);
  public boards: Observable<IBoard[]> = this.boardsSubject.asObservable();
  private boardsRef: AngularFirestoreCollection<IBoard>;
  private statusesRef: AngularFirestoreCollection<any>;
  private userId;
  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(data => {
      if (data && data.uid) {
        this.userId = data.uid;
        this.boardsRef = this.afs.doc(`users/${this.userId}`).collection('boards');
        this.boardsRef.valueChanges().subscribe(res => {
          this.boardsSubject.next(res);
        });
      }
    });
  }
  getBoards = (): Observable<IBoard[]> => {
    return this.boards;
  }
  getStatuses = (board: IBoard): Observable<IStatuses[]> => {
    this.statusesRef =  this.boardsRef.doc(board.name).collection('statuses');
    return this.statusesRef.valueChanges();
  }
  setModalData(taskInfo: ITask) {
    this.modalData = taskInfo;
  }
  createNewBoard(val: string) {
    return this.boardsRef.doc(val).set({name: val, id: createId()})
    .then(() => `Board "${val}" successfully added!`);
  }
  deleteBoard(val: string) {
    return this.boardsRef.doc(val).delete().then(() => `Board "${val}" successfully deleted!`);
  }
  createNewStatus(board: string, status: string) {
    return this.boardsRef.doc(board).collection('statuses').doc(status).set({name: status, tasks: []}, {merge: true});
  }
  createNewTask(task: ITask, currentBoard: string, status: string) {
    this.boardsRef.doc(currentBoard).collection('statuses').doc(status).get().subscribe(data => {
      const newTasksList = data.get('tasks');
      newTasksList.push(Object.assign({}, task));
      this.boardsRef.doc(currentBoard).collection('statuses').doc(status).set({tasks: newTasksList}, {merge: true});
    });
  }
  updateTask(task: ITask, currentBoard: string) {
    if (task.status !== task.oldStatus) {
      let newTasksList;
      this.boardsRef.doc(currentBoard).collection('statuses').doc(task.oldStatus).get().subscribe(data => {
        newTasksList = data.get('tasks');
        newTasksList.forEach((item, index) => {
          if (item.id === task.id) {
            newTasksList.splice(index, 1);
          }
        });
        this.boardsRef.doc(currentBoard).collection('statuses').doc(task.oldStatus).set({tasks: newTasksList}, {merge: true});
      });
      this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).get().subscribe(data => {
        newTasksList = data.get('tasks');
        newTasksList.push(task);
        this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).set({tasks: newTasksList}, {merge: true});
      });
    } else {
      this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).get().subscribe(data => {
        const newTasksList = data.get('tasks');
        newTasksList.forEach((item, index) => {
          if (item.id === task.id) {
            newTasksList[index] = task;
          }
        });
        this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).set({tasks: newTasksList}, {merge: true});
      });
    }
  }
  deleteTask(task: ITask, currentBoard) {
    this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).get().subscribe(data => {
      const newTasksList = data.get('tasks');
      newTasksList.splice(newTasksList.map(item => item.id).indexOf(task.id), 1);
      this.boardsRef.doc(currentBoard).collection('statuses').doc(task.status).set({tasks: newTasksList}, {merge: true});
    });
  }
}
