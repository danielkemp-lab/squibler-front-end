import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectProjectState
} from '../../../../../../../../../store/app.states';
import {
  AddSubsection,
  DeleteSection,
  DeleteSubsection,
  SubSectionClick,
  UpdateSectionTitle,
  UpdateSubsectionTitle,
  UpdateSubSectionOrder
} from '../../../../../../../../../store/actions/project.actions';
import { Observable, Subscription } from 'rxjs';

import _ from 'lodash';
@Component({
  selector: 'project-tree-section',
  templateUrl: './project-tree-section.component.html',
  styleUrls: ['./project-tree-section.component.scss']
})
export class ProjectTreeSectionComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  section;
  @Input()
  active;
  @Input()
  projectId;
  @Input()
  selectedSubSectionId;
  projectSubscription: Subscription;
  getProjectState: Observable < any > ;
  @Output()
  onSectionClick = new EventEmitter();
  @Output()
  onFieldFocus = new EventEmitter();
  @Output()
  onSectionDelete = new EventEmitter();
  opened: boolean;
  @Output()
  subSectionEditNumber = new EventEmitter();
  updating = true;
  selectedElement;
  openDeletePopup = false;
  updateFlag = false;
  constructor(private store: Store < AppState > ) {
    this.getProjectState = this.store.select(selectProjectState);
    this.opened = false;
  }
  addSubsection(e): void {
    e.stopPropagation();
    this.store.dispatch(new AddSubsection({ projectId: this.projectId, sectionId: this.section.uuid, sectionOpen: this.opened }));

  }

  toggleSection(e): void {
    e.stopPropagation();
    this.opened = !this.opened;
  }
  deleteSection(e): void {
    this.onSectionDelete.emit({ id: this.section.uuid });
  }
  updateSectionTitle(e, value): void {

    this.store.dispatch(new UpdateSectionTitle({
      projectId: this.projectId,
      sectionId: this.section.uuid,
      value,
      sectionOpen: this.opened
    }));

    this.section.title = value;

    this.onSectionClick.emit({section: this.section, opened: false, element: e});

    this.onFieldFocus.emit("div[id='"+this.section.uuid+"'][title='section_text']");

  }
  sectionClick(event): void {
    if (event.target && event.target.localName === 'input')
      event.target.select();
    event.stopPropagation();
  }
  updateSubsectionTitle(e, subsectionId): void {
    this.subSectionEditNumber.emit({ subSectionTitle: this.selectedElement });
    this.store.dispatch(new UpdateSubsectionTitle({
      projectId: this.projectId,
      sectionId: this.section.uuid,
      subsectionId,
      value: e.target.value,
      sectionOpen: this.opened
    }));

    this.selectedElement = undefined;
  }

  subSectionClick(event): void {
    this.selectedElement = event.target.id;
    if (event.target && event.target.localName === 'input')
      event.target.select();
    event.stopPropagation();
    this.store.dispatch(new SubSectionClick({
      id: event.target.id
    }));
  }
  deleteSubsection(e, subsection): void {
    e.stopPropagation();
    this.store.dispatch(new DeleteSubsection({ sectionId: this.section.uuid, subsectionId: subsection.uuid, sectionOpen: this.opened }));
  }
  trackByFn(index: number): number {
    return index;
  }
  ngOnInit(): void {
    this.projectSubscription = this.getProjectState.subscribe(state => {
      if (state.project)
        if (this.updating) {
          this.opened = state.updatedSectionOpened;
        }
      const sectionIndex = _.findIndex(state.project.sections, ['uuid', this.section.uuid]);
      this.section = state.project.sections[sectionIndex];

    });

    this.updating = false;

  }
  ngAfterViewInit(): void {
    // if (document.getElementById(this.selectedSubSectionId && this.selectedSubSectionId.subSectionTitle)) {
    //   const focusElement = document.getElementById(this.selectedSubSectionId.subSectionTitle) as HTMLElement;
    //   focusElement.focus();
    // } else if (document.getElementsByClassName('section__items')[0].childNodes.length > 2) {
    //   const focusElement = document.getElementsByClassName('section__items')[0].childNodes[1].firstChild as HTMLElement;
    //   focusElement.focus();
    // }
    // this.updateFlag = false;
  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
  extractContent(s): string {
    const span = document.createElement('span');
    span.innerHTML = s;

    return span.textContent || span.innerText;
  }
}
