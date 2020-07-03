import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-custom-title-popup',
    templateUrl: './custom-title-popup.component.html',
    styleUrls: ['./custom-title-popup.component.scss']
})
export class CustomTitlePopupComponent implements OnInit {
    @Input()
    active;
    @Output()
    onColorClick = new EventEmitter();
    @Output()
    onIconClick = new EventEmitter();
    icons = ['mountain', 'scissors', 'music', 'family', 'queen', 'bulb', 'pin', 'detective', 'pen', 'notepad'];
    colors = ['#bfbfbf', '#d0021b', '#f5a623', '#8b572a', '#7ed321', '#bd10e0', '#4a90e2', '#50e3c2', '#4a4a4a'];

    constructor() {

    }

    ngOnInit(): void {

    }
}
