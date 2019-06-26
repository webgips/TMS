import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('TaskListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [
      TaskListService,
      AngularFirestore,
      AuthenticationService,
      { provide: AngularFirestore, useValue: FirestoreStub }
    ],
  }));

  it('should be created', () => {
    const service: TaskListService = TestBed.get(TaskListService);
    expect(service).toBeTruthy();
  });
});
