import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingHeaderComponent } from './boarding.header.component';

describe('BoardingHeaderComponent', () => {
  let component: BoardingHeaderComponent;
  let fixture: ComponentFixture<BoardingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
