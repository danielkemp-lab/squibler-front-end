import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import {  Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  AppState,
  selectProjectState
} from '../../../../../../../store/app.states';

import { AddSection, DeleteSection, UpdateProjectTitle } from '../../../../../../../store/actions/project.actions';
import * as moment from 'moment';
import _ from 'lodash';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss']
})
export class SidebarToggleComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  title;
  @Input()
  count;
  @Input()
  content;
  @Input()
  project;
  @Input()
  selectedSectionId;
  @Input()
  selectedBoardId;
  @Input()
  loading;
  @Input()
  summary;
  @Input()
  boards;
  @Input()
  autoFocus;
  @Input()
  versionList;
  @Input()
  exporting;
  @Input()
  exportReady;
  @Input()
  exportFormat;
  @Input()
  versionAlert;
  @Input()
  workingon;
  @ViewChild('projectTitle') nameTitle: ElementRef;

  @Input()
  toggleNotesPopup;
  @Output()
  onSectionClick = new EventEmitter();
  @Output()
  onProjectClick = new EventEmitter();
  @Output()
  onFieldFocus = new EventEmitter();
  @Output()
  addBoard = new EventEmitter();
  @Output()
  onExportProject = new EventEmitter();
  @Output()
  onSaveExportedFile = new EventEmitter();
  @Output()
  onRedirectVersion = new EventEmitter();
  @Output()
  onDeleteVersion = new EventEmitter();
  @Output()
  onAddNewVersion = new EventEmitter();
  @Output()
  @Output()
  openSummary = new EventEmitter();
  @Output()
  onUpdateBoardName = new EventEmitter();
  @Output()
  onUpdateBoardNoteTitle = new EventEmitter();
  @Output()
  onBoardClick = new EventEmitter();
  @Output()
  onNoteAdd = new EventEmitter();
  @Output()
  onAddNewSection = new EventEmitter();
  @Input()
  open = false;
  showDeletePopup = false;
  showVersionDeletePopup = false;
  currentDeleteVersion;
  currentDeleteSection;
  projectExportOptions = false;
  projectSubscription: Subscription;
  getProjectState: Observable < any > ;
  firstLoad = true;
  newBoard = false;

  constructor(private router: Router, private store: Store < AppState > ) {
    this.getProjectState = this.store.select(selectProjectState);
  }

  ngOnInit(): void {
    this.projectSubscription = this.getProjectState.subscribe(state => {
      if (state.project)
        this.project = state.project;
      if (this.firstLoad && state.project && this.nameTitle && this.nameTitle.nativeElement && moment(state.project.createdAt).format('MM D YYYY, h:mm') === moment(state.project.updatedAt).format('MM D YYYY, h:mm')) {
        this.nameTitle.nativeElement.focus();
        this.firstLoad = false;
      }
      if(state.newBoard){
        this.newBoard = state.newBoard;
      }
    });
  }

  ngAfterViewChecked(){
    if (this.newBoard){
      const elementSelected = <HTMLInputElement>document.querySelector('app-board-item:last-child input[class="board-item__title"]');
      elementSelected.focus();

      const sidebarDiv = <HTMLElement>document.querySelector('[class="sidebar__toggles"]');
      sidebarDiv.scrollTop = sidebarDiv.scrollHeight;

      this.newBoard = false;
    }
  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
  onBoardDelete(board): void {
    const redirectBoard = this.redirectBoard(board.board);
    this.boards.splice(this.boards.indexOf(board.board), 1);
    this.onBoardClick.emit({ board: redirectBoard });
  }

  deleteVersion(e, parameter): void {
    if (parameter === true) {
      this.onDeleteVersion.emit(this.currentDeleteVersion);
      this.showVersionDeletePopup = false;
    }
    if (parameter === false)
      this.showVersionDeletePopup = false;
    e.stopPropagation();
  }

  deleteSection(e, parameter): void {
    if (parameter === true) {
      this.store.dispatch(new DeleteSection({ sectionId: this.currentDeleteSection.id }));
      this.showDeletePopup = false;
      const sectionIndex = _.findIndex(this.project.sections, ['uuid', this.selectedSectionId]);
      this.project.sections.splice(sectionIndex, 1);
      this.selectedSectionId = undefined;
      this.onProjectClick.emit();
    }
    if (parameter === false)
      this.showDeletePopup = false;
    e.stopPropagation();
  }
  addSection(): void {
    this.onAddNewSection.emit();
    this.store.dispatch(new AddSection({ projectId: this.project.uuid }));
  }
  showDetailsClick(): void {
    this.projectExportOptions = false;
    this.open = !this.open;
  }
  updateProjectTitle(value): void {
    this.store.dispatch(new UpdateProjectTitle({ projectId: this.project.uuid, value }));

    this.onFieldFocus.emit("[id='" + this.project.uuid + "-content']");

    this.project.show_title_placeHolder = value.length > 0 ? false : true;
  }
  versionDelete(e): void {
    this.currentDeleteVersion = e;
    this.showVersionDeletePopup = true;
    // if (this.selectedSectionId === e.id) this.onProjectClick.emit();
  }
  sectionDelete(e, event): void {
    this.currentDeleteSection = e;
    this.showDeletePopup = true;
    // if (this.selectedSectionId === e.id) this.onProjectClick.emit();
  }
  showIdeas(): void {}
  extractContent(s): string {
    const span = document.createElement('span');
    span.innerHTML = s;

    return span.textContent || span.innerText;
  }
  toggleSummaryPopup(project): void {}
  redirectBoard(board): string {
    const currentBoard = this.boards.filter(index => {
      return index.uuid === board.uuid;
    });
    if (this.boards.indexOf(currentBoard[0]) === 0 && this.boards.length === 1) {
      return 'click sections';
    }
    if (this.boards.indexOf(currentBoard[0]) === 0 && this.boards.length !== 1) {
      return this.boards[this.boards.indexOf(currentBoard[0]) + 1];
    }
    if (this.boards.indexOf(currentBoard[0]) > 0 && this.boards.length !== 1) {
      return this.boards[this.boards.indexOf(currentBoard[0]) - 1];
    }
  }
}
