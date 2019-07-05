import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import IBoard from '../models/IBoard';
import IStatuses from '../models/IStatuses';

const board: IBoard[] = [
  {
    id: '0',
    name: 'test',
    statuses: [
      {
        name: 'test status',
        tasks: [
          {
            desc: 'test desc',
            id: '0',
            status: 'test',
            title: 'title'
          }
        ]
      }
    ]
  }
];
const statuses: IStatuses[] = [
  {
    name: 'test status',
    tasks: [
      {
        desc: 'test desc',
        id: '0',
        status: 'test',
        title: 'title'
      }
    ]
  }
];

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(from(board))
};
const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};
const statusesCollectionStub = {
  valueChanges: jasmine.createSpy('collection').and.returnValue(from(statuses))
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
    expect(result).toEqual(board);
  });

  it('should be create new status', () => {
    const result: IStatuses[] = [];
    statuses.push({name: 'new test status', tasks: []});
    statusesCollectionStub.valueChanges().subscribe(data => {
      result.push(data);
    });
    expect(result).toEqual(statuses);
  });

  it('should be create new board', () => {
    board.push({name: 'new board', id: 'tegkadsfdk', statuses: [{name: 'test task', tasks: []}]});
    const result: IBoard[] = [];
    collectionStub.valueChanges().subscribe(data => {
      result.push(data);
    });
    expect(result).toEqual(board);
  });

});
