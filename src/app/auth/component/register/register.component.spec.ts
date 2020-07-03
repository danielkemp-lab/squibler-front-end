import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { AuthenticationService, UserService } from '../../../_services/index';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { first } from 'rxjs/operators';
import { User } from '../../../models/user';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store/app.states';
import { environment } from '../../../../environments/environment';
import { helper } from '../../../helper/helper';
import { FormsModule } from '@angular/forms';

describe('Register Component', () => {
  let injector: TestBed;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, {}),
      ],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: AuthenticationService,
        },
        {
          provide: UserService,
          useClass: UserService,
        },
      ],
    }).compileComponents();
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register user', () => {
    const testUser = new User();

    const inputDebug: DebugElement = fixture.debugElement;

    testUser.email = helper('email', 'user@email.com', inputDebug);
    testUser.password = helper('password', 'password', inputDebug);

    service
      .create(testUser)
      .pipe(first())
      .subscribe(
        data => {
          expect(data['email']).toBe(testUser.email);
          expect(data['password']).toBe(testUser.password);
        },
        () => {
          this.loading = false;
        }
      );
    const req = httpMock.expectOne(`${environment.backUrl}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(testUser);
  });
});
