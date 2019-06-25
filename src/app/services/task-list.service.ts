import { Injectable } from '@angular/core';
import ITask from '../models/ITask';
import IBoard from '../models/IBoard'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable()
export class TaskListService {
  private statusList: string[] = [];
  modalData: ITask;
  private _boards: BehaviorSubject<IBoard[]> = new BehaviorSubject([]);
  public boards: Observable<IBoard[]> = this._boards.asObservable();
  private taskList: ITask[] = [];
  private boardsRef: AngularFirestoreCollection<IBoard> = this.afs
                .doc(`users/${this.authenticationService.userValue.uid}`)
                .collection('boards');
  constructor(private afs: AngularFirestore, private authenticationService: AuthenticationService) {
    this.boardsRef.valueChanges().subscribe(data => {
      this._boards.next(data);
    });
  }
  getTasks = () => {
    return this.afs.doc(`users/${this.authenticationService.userValue.uid}`).get();
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
  moveTask(task: ITask, val: string) {
    this.taskList.filter(item => item.id === task.id)[0].status = val;
  }
  deleteTask(task: ITask) {
    this.taskList.splice(this.taskList.map(item => item.id).indexOf(task.id), 1);
  }
  createNewTask(task: ITask, currentBoard: string) {
    this.boardsRef.doc(currentBoard).get().subscribe(data => {
      const newTasks = data.get('tasks');
      newTasks.push(task);
      this.boardsRef.doc(currentBoard).set({tasks: newTasks}, {merge: true});
    });
  }
  createNewStatus(status: string) {
    this.statusList.push(status);
  }
  createNewBoard(val: string) {
    this.boardsRef.doc(val).set({name: val, id: this._boards.value.length, tasks: []});
  }
  updateTask(task: ITask) {

  }
}