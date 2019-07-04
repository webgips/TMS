import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import IBoard from '../models/IBoard';

const input: IBoard[] = [
  {
    id: 0,
    name: 'test',
    tasks: [
      {
        desc: 'test desc',
        id: '0',
        status: 'test',
        title: 'title'
      }
    ]
  },
  {
    id: 1,
    name: 'test2',
    tasks: [
      {
        desc: 'test2 desc',
        id: '0',
        status: 'test2',
        title: 'title2'
      }
    ]
  }
];
const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(from(input))
};
const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('TaskListService', () => {
  let angularFirestore: AngularFirestore;
  let service: TaskListService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [
      TaskListService,
      { provide: AngularFirestore, useValue: angularFirestoreStub }
    ]
  }));
  beforeEach(() => {
    angularFirestore = TestBed.get(AngularFirestore);
    service = TestBed.get(TaskListService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return boards', () => {
    const result: IBoard[] = [];
    collectionStub.valueChanges().subscribe(data => {
      result.push(data);
    });
    expect(result).toEqual(input);
  });

  // it('should be create new status', () => {
  //   service.createNewStatus('new status');
  //   expect(service.getStatuses([])).toContain('new status');
  // });

  it('should be create new board', () => {
    input.push({name: 'new board', id: input.length, tasks: []});
    const result: IBoard[] = [];
    collectionStub.valueChanges().subscribe(data => {
      result.push(data);
    });
    expect(result).toEqual(input);
  });

});
