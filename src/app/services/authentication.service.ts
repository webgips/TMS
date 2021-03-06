import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import IUser from '../models/IUser';
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public userId;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.currentUserSubject.asObservable();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.userId = user.uid;
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
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.uid}`);
    return userRef.get();
  }
  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }
  register(user: IUser) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  anonymosLogin() {
    return this.afAuth.auth.signInAnonymously();
  }
  logout() {
    this.afAuth.auth.signOut();
    this.currentUserSubject.next(null);
    this.userId = null;
  }
}
