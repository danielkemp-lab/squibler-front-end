import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardingFooterComponent} from './boarding.footer.component';

describe('BoardingFooterComponent', () => {
    let component: BoardingFooterComponent;
    let fixture: ComponentFixture<BoardingFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoardingFooterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardingFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
