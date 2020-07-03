
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { User } from '../../../models/user';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store/app.states';
import { environment } from '../../../../environments/environment';
import { helper } from '../../../helper/helper';


describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: AuthenticationService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, {}),
      ],
      declarations: [LoginComponent],
      providers: [{
        provide: AuthenticationService,
        useClass: AuthenticationService,
      }]
    })
      .compileComponents();
    injector = getTestBed();
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test title', () => {
    fixture.detectChanges();
    const title: DebugElement = fixture.debugElement;
    const paragraphDe = title.query(By.css('.auth__logo-text'));
    const div: HTMLElement = paragraphDe.nativeElement;
    expect(div.textContent).toEqual('Squibler');
  });

  it('Test login request', () => {
    fixture.detectChanges();
    const testUser = new User;

    const inputDebug: DebugElement = fixture.debugElement;
    testUser.email = helper('email', 'nikita@asd.com', inputDebug);
    testUser.password = helper('password', '123321123', inputDebug);

    const dummyUsers = {
      login: testUser.email,
      password: testUser.password
    };

    const items = component.loginForm.value;
    service.login(items.email, items.password).subscribe(user => {
      expect(user.login).toEqual(component.loginForm.value.email);
    });

    const req = httpMock.expectOne(`${environment.backUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUsers);

  });
});
