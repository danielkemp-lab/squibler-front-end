import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectSubSectionState
} from '../../../../../../../store/app.states';
import { UpdateSectionOrder } from '../../../../../../../store/actions/project.actions';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit {
  @Input()
  sections;
  @Input()
  projectId;
  @Input()
  selectedSectionId;
  @Input()
  selectedSubSectionId;

  @Output()
  onSectionClick = new EventEmitter();
  @Output()
  onSectionDelete = new EventEmitter();
  @Output()
  onFieldFocus = new EventEmitter();
  @Output()
  onSectionDrag = new EventEmitter();
  constructor(private store: Store < AppState > ) {}
  ngOnInit(): void {}
  onSectionEditNumber(id): void {
    this.selectedSubSectionId = id;
  }
  drop(event: CdkDragDrop < Array < string > > ): void {
    const id = event.item.element.nativeElement.children[0].id;
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.store.dispatch(new UpdateSectionOrder({ projectId: this.projectId, sectionId: id, order: event.currentIndex }));
  }

}
