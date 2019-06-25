import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import IUser from '../models/IUser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  // user: User;
  // user: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.currentUserSubject.asObservable();
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // console.log(this.userdata)
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          localStorage.setItem('user', null);
        }
      });
  }

  public get userValue() {
    return this.currentUserSubject.value;
  }
  public get userdata() {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userValue.uid}`);
    return userRef.get();
  }
  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      boards: user.boards
    };
    return userRef.set(data, { merge: true });
  }
  register(user: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth.auth.signOut();
    this.currentUserSubject.next(null);
  }
}
