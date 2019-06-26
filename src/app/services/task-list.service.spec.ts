import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { from, BehaviorSubject } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import IBoard from '../models/IBoard';

// const FirestoreStub = {
//   collection: (name: string) => ({
//     doc: (_id: string) => ({
//       valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//       set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//     }),
//   }),
// };

const input: IBoard[] = [
  {
    id: 1,
    name: 'test',
    tasks: [
      {
        desc: 'test desc',
        id: 0,
        status: 'test',
        title: 'title'
      }
    ]
  }
];
const data = from(input);
const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};
const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('TaskListService', () => {
  let angularFirestore: AngularFirestore;
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
  

  it('should be created', () => {
    angularFirestore = TestBed.get(AngularFirestore);
    const service = TestBed.get(TaskListService);
    expect(service).toBeTruthy();
  });
});
