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
  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true });

  }
  register(user: any) {
    return this.afAuth.auth
      // .createUserWithEmailAndPassword(user.email, user.password)
      .createUserWithEmailAndPassword(user.email, user.password)
      // .then(val => {
      //   console.log(user)
      // //   console.log('Welcome new user!', 'success', val);
      //   // return this.updateUserData(user); // if using firestore
      // })
      // .catch(error => console.log(error));
  }
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  // login(username: string, password: string) {
  //   return this.http.post<IUser>(`/user/login`, { username, password })
  //     .pipe(map(user => {
  //       if (user && user.token) {
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //       return user;
  //     }));
  // }
  // register(user: IUser) {
  //     return this.http.post(`/user/register`, user);
  // }
  logout() {
    this.afAuth.auth.signOut();
    this.currentUserSubject.next(null)
  }
}
