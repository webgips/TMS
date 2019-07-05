import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'firebase';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authenticationService: AuthenticationService;
  let mockUser;
  let mockUserNoEmail;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    mockUser = {
      uid: 'testuid',
      email: 'test@test.test',
      displayName: 'name'
    };
    mockUserNoEmail = {
      uid: 'testuid',
      email: null,
      displayName: null
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user email', () => {
    authenticationService.currentUserSubject.next(mockUser);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.header__user').innerText).toEqual(`Hi ${mockUser.displayName}!`);
  });
  it('should set user email to anonym', () => {
    authenticationService.currentUserSubject.next(mockUserNoEmail);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.header__user').innerText).toEqual(`Hi anonym!`);
  });
});
