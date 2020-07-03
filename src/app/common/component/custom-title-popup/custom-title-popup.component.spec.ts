import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTitlePopupComponent } from './custom-title-popup.component';

describe('CustomTitlePopupComponent', () => {
  let component: CustomTitlePopupComponent;
  let fixture: ComponentFixture<CustomTitlePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTitlePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTitlePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
