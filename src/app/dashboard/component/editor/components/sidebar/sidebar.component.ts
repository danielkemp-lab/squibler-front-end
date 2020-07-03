import {
  Component, ComponentFactoryResolver, ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild, ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import _ from 'lodash';
import {
  AppState,
  selectProjectState,
  selectSectionState
} from '../../../../../store/app.states';

import {
  // GetVersion,
  // UpdateVersion,
  // DeleteVersion,
  CloseBoards,
  Init,
  ProjectAddBoard,
  ProjectExport, ProjectUpdateNoteTitle,
  SectionAddBoard, SectionUpdateNoteTitle,
  UpdateProjectBoardName,
  UpdateProjectSummary,
  UpdateSectionBoardName,
  UpdateSectionSummary,
  VersionAdd,
  VersionDelete,
  ProjectBoardAddNote,
  SectionBoardAddNote,
  VersionUpdate
} from '../../../../../store/actions/project.actions';
import {environment} from "../../../../../../environments/environment";
import {EditorToolbarComponent} from "../../../wysiwyg-editor/components/editor-toolbar/editor-toolbar.component";

@Component({
  selector: 'editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() active;
  @Output() onToggle = new EventEmitter();
  @Output() onSectionClick = new EventEmitter();
  @Output() onProjectClick = new EventEmitter();
  @Output() onBoardClick = new EventEmitter();
  @Output() onFieldFocus = new EventEmitter();

  selectedSectionId = '';
  selectedBoardId = '';
  projectExportOptions = false;
  exporting = false;
  exportReady = false;
  summaryPopup = false;
  versionAllert = false;
  openedTitle: string;
  boardOpen;
  exportFormat = '';
  workingOn = 'project';
  summaryloading = false;
  summary: string;
  boards: Array < any > ;
  projectDetails = false;
  project;
  board;
  file;
  firstLoad = true;
  requestSent = false;
  selectedNote: any;
  newSectionFlag = false;
  versionList;
  summaryBar = '';
  subject = new Subject < string > ();
  sectionOpened = false;
  noteAddCheck = false;
  boarduuid = false;
  section;
  sectionSubscription: Subscription;
  projectSubscription: Subscription;
  getSectionState: Observable < any > ;
  getProjectState: Observable < any > ;

  @ViewChild('summaryContent') summaryContent: ElementRef;
  @ViewChild('summaryEditor') summaryEditor: ElementRef;
  @ViewChild('toolbarConatiner', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  options: any;
  editorFull = false;

  ref: ComponentRef<any>;

  constructor(
    private store: Store < AppState > ,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.getSectionState = this.store.select(selectSectionState);
    this.getProjectState = this.store.select(selectProjectState);
    // this.subject.pipe(debounceTime(500))
    //   .subscribe(() => {
    //     this.saveSummary();
    //   });
    this.options = {
      tooltips: false,
      hideBar: true,
      placeholderText: 'Start writing here...',
      multiLine: false,
      toolbarButtons: {
        fontFamily: true,
        bold: true,
        italic: true,
        underline: true,
        formatUL: true,
        align: true,
        image: false
      },
      fontFamily: {
        'Times New Roman': "Times New Roman',Times,serif",
        'Arial': "Arial",
        'Courier': "Courier",
        'Garamond': "Garamond",
        // "Comic Sans": 'Comic Sans',
        'Papyrus': "Papyrus",
        'Palatino': "Palatino",
        'Century Schoolbook': "Century Schoolbook",
        'Georgia': "Georgia",
        'Australian Sunset': "Australian Sunset",
        'Adobe Caslon Pro': "Adobe Caslon Pro",
        'Bembo': "Bembo",
        'ITC Baskerville': "ITC Baskerville",
        'Minion Pro': "Minion Pro",
        'Garamond Premier Pro': "Garamond Premier Pro",
        'Franklin Gothic Medium': "Franklin Gothic Medium",
        'Janson': "Janson",
        'Futura': "Futura"

      },
      charCounterCount: false,
      imageUploadURL: `${environment.backUrlImage}/upload`,
      imageMaxSize: 10 * 10000 * 10000,
      paragraphFormatSelection: true,
      fontFamilySelection: true,
      requestHeaders: {
        Authorization: `JWT ${localStorage.token}`
      },
      fontSizeSelection: true,
      quickInsertButtons: []
    };
  }

  toggleFullScr(): void {
    this.active = true;
    this.editorFull = !this.editorFull;
  }

  addEditor(): void {
    if (!this.ref && this.viewContainerRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(EditorToolbarComponent);
      this.ref = this.viewContainerRef.createComponent(factory);
      this.ref.instance.configs = this.options;
      this.ref.instance.onFormat.subscribe(
          (event: any) => {
            document.execCommand(event.action, false, event.value);
          }
      );
      this.ref.changeDetectorRef.detectChanges();
    }
    if (this.ref) {
      this.ref.instance.configs = this.options;
      this.ref.instance.configs.hideBar = true;
    }
  }

  removeEditor(): void {
    this.ref.instance.configs.hideBar = false;
  }

  onSummaryChange(e): void {
    if(!this.requestSent){
      this.requestSent = true;
      this.saveSummary(e);

      setTimeout(() => {
        this.requestSent = false;
      }, 3000);

    }
  }

  blurFunction(e): void {
    if (!e.relatedTarget) {
      this.removeEditor();
    }
  }

  focusFunction(e): void {
    if (e.relatedTarget) {
      this.removeEditor();
    }
    this.addEditor();
  }

  sectionClick(e): void {
    if (this.active) this.toggleSidebar();
    this.section = e.section;
    this.summaryBar = this.summary = e.section.summary;
    this.boards = e.section.boards;
    this.openedTitle = e.section.title;
    this.sectionOpened = e.opened;
    this.workingOn = 'section';
    this.selectedSectionId = e.section.uuid;
    this.selectedBoardId = '';
    this.onSectionClick.emit(e);
    this.store.dispatch(new CloseBoards({}));
  }

  detailsClickOutside(event: any): void {
    if (event.target && event.target.localName === 'input') {
      event.target.select();
    }
    if (event && event['value'] === true) {
      this.projectDetails = false;
    }
  }
  openSummary(): void {
    this.summaryBar = this.summary;
    this.selectedBoardId = '';
    if (!this.active) this.toggleSidebar();
    const _this = this;
    setTimeout(function(){
      const elementSelected = _this.summaryEditor.nativeElement;
      elementSelected.focus();

      if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined" && elementSelected !== null) {
        const range = document.createRange();
        range.selectNodeContents(elementSelected);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 1000);

    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
    this.addEditor();
  }
  toggleSidebar(): void {
    this.onToggle.emit();
  }
  saveExportedFile(): void {
    const url = window.URL.createObjectURL(this.file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${this.project.title ? this.project.title : 'project'}.${this.exportFormat}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    this.exporting = false;
    this.projectExportOptions = false;
    this.exportFormat = '';
  }

  addNewVersion(): void {
    if (this.versionList.length === 4) {
      this.versionAllert = true;
      setTimeout(() => {
        this.versionAllert = false;
      }, 2000);
    }
    this.store.dispatch(new VersionAdd(this.project));
  }

  deleteVersion(version): void {
    this.versionList.splice(this.versionList.indexOf(version), 1);
    this.store.dispatch(new VersionDelete(version));
    const redirectUuid = this.versionList[this.versionList.length - 1].uuid;
    this.router.navigateByUrl(`/dashboard/projects/${redirectUuid}`);
    this.store.dispatch(new Init({ uuid: redirectUuid }));
  }
  onblur(e): void{
    this.summaryBar = e.target.innerHTML;
    this.saveSummary(e);
  }
  saveSummary(e): void {
    this.store.dispatch(this.workingOn === 'project' ? new UpdateProjectSummary({
      projectId: this.project.uuid,
      text: e.target.innerHTML
    }) : new UpdateSectionSummary({
      projectId: this.project.uuid,
      sectionId: this.selectedSectionId,
      text: e.target.innerHTML,
      sectionOpen: this.sectionOpened
    }));
  }

  exportProject(format): void {
    this.exportFormat = format;
    this.exporting = true;
    this.store.dispatch(new ProjectExport({ id: this.project.uuid, format }));
  }
  onSummaryKeyUp(): void {
    this.subject.next();
  }
  addBoard(): void {
    this.store.dispatch(this.workingOn === 'project' ? new ProjectAddBoard({
      projectId: this.project.uuid
    }) : new SectionAddBoard({
      projectId: this.project.uuid,
      sectionId: this.selectedSectionId,
      sectionOpen: this.sectionOpened
    }));

  }
  redirectVersion(version): void {
    this.router.navigateByUrl(`/dashboard/projects/${version.uuid}`);
    this.store.dispatch(new Init({ uuid: version.uuid }));
  }
  updateBoardName(e): void {
    this.store.dispatch(this.workingOn === 'project' ? new UpdateProjectBoardName({
      projectId: this.project.uuid,
      boardId: e.boardId,
      name: e.name,
      boardOpen: e.opened
    }) : new UpdateSectionBoardName({
      projectId: this.project.uuid,
      sectionId: this.selectedSectionId,
      boardId: e.boardId,
      sectionOpen: this.sectionOpened,
      boardOpen: e.opened,
      name: e.name
    }));
  }

  updateBoardNoteTitle(e): void {
    this.store.dispatch(this.workingOn === 'project' ? new ProjectUpdateNoteTitle({
      projectId: this.project.uuid,
      boardId: e.boardId,
      noteId: e.noteId,
      title: e.name,
      boardOpen: e.opened
    }) : new SectionUpdateNoteTitle({
      projectId: this.project.uuid,
      sectionId: this.selectedSectionId,
      boardId: e.boardId,
      noteId: e.noteId,
      sectionOpen: this.sectionOpened,
      boardOpen: e.opened,
      title: e.name
    }));

  }
  boardDelete(e): void {
    this.selectedBoardId = '';
    if (e.target === 'section')
      this.onSectionClick.emit({ section: this.section, opened: this.sectionOpened });
    else
      this.onProjectClick.emit(this.project);
  }
  addNewSection(): void {
    this.newSectionFlag = true;
  }

  ngOnInit(): void {
    this.projectSubscription = this.getProjectState.subscribe(state => {
      let sectionIndex = null;
      if (state.addVersion) {
        const redirectUuid = state.project.related[state.project.related.length - 1].uuid;
        this.router.navigateByUrl(`/dashboard/projects/${redirectUuid}`);
        this.store.dispatch(new Init({ uuid: redirectUuid }));
      }

      if (state.project && !state.addVersion) {
        this.project = state.project;
        this.versionList = state.project.related;
        if (!this.selectedSectionId) {
          this.summary = this.project.summary;
          this.boards = this.project.boards;
          this.openedTitle = this.project.title;
          this.workingOn = 'project';
          if (state.newBoard) {
            localStorage.setItem('newBoard', '');

            this.boardClick({ board: state.project.boards[state.project.boards.length - 1] });
          }
          if (this.selectedBoardId) {
            const boardIndex = _.findIndex(state.project.boards, ['uuid', this.selectedBoardId]);
            this.board = state.project.boards[boardIndex];
          }
        } else {
          sectionIndex = _.findIndex(state.project.sections, ['uuid', this.selectedSectionId]);
          this.openedTitle = state.project.sections[sectionIndex].title;
          this.boards = state.project.sections[sectionIndex].boards || [];
          if (state.newBoard) {
            localStorage.setItem('newBoard', '');
            this.boardClick({ board: state.project.sections[sectionIndex].boards[state.project.sections[sectionIndex].boards.length - 1] });
          }
          if (this.selectedBoardId) {
            const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', this.selectedBoardId]);
            this.board = state.project.sections[sectionIndex].boards[boardIndex];
          }
          this.summary = this.project.sections[sectionIndex].summary;
        }

        if (this.noteAddCheck && state.boarduuid != '') {
          if(sectionIndex !== null) {
            const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', state.boarduuid]);
            state.project.sections[sectionIndex].boards[boardIndex].noteAdded = this.noteAddCheck;
            this.boards = state.project.sections[sectionIndex].boards;
          }else{
            const boardIndex = _.findIndex(state.project.boards, ['uuid', state.boarduuid]);
            state.project.boards[boardIndex].noteAdded = this.noteAddCheck;
            this.boards = state.project.boards;
          }
          this.noteAddCheck = false;
          state.boarduuid = '';
        }

        if (this.noteAddCheck && state.boarduuid != '') {
          if(sectionIndex !== null) {
            const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', state.boarduuid]);
            state.project.sections[sectionIndex].boards[boardIndex].noteAdded = this.noteAddCheck;
            this.boards = state.project.sections[sectionIndex].boards;
          }else{
            const boardIndex = _.findIndex(state.project.boards, ['uuid', state.boarduuid]);
            state.project.boards[boardIndex].noteAdded = this.noteAddCheck;
            this.boards = state.project.boards;
          }
          this.noteAddCheck = false;
          state.boarduuid = '';
        }
      }
      if (state.file) {
        this.file = state.file;
        this.exportReady = true;
      }
      if (this.newSectionFlag && state.updated) {
        this.section = state.project.sections[state.project.sections.length - 1];
        this.sectionOpened = true;
        const newSectionData = {
          section: {
            boards: [],
            subSections: [],
            summary: '',
            text: '',
            title: '',
            uuid: this.section ? this.section.uuid : ''
          },
          opened: false,
          newSection: true
        };

        this.sectionClick(newSectionData);
        this.newSectionFlag = false;
      }
    });

    this.sectionSubscription = this.getSectionState.subscribe(state => {});

  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.sectionSubscription.unsubscribe();
  }
  boardClick(e): void {
    if (this.active) this.toggleSidebar();
    this.selectedNote = e.note;
    this.selectedBoardId = e.board.uuid;
    this.boardOpen = e.boardOpen;
    this.board = e.board;
    this.active = true;
    this.onBoardClick.emit({ board: e.board, note: e.note });
  }

  noteAdd(e): void {
    if (this.project && !this.section) {
        this.store.dispatch(new ProjectBoardAddNote({
            projectId: this.project.uuid,
            boardId: e.board.uuid,
            boardOpen: true,
            title: '',
            text: ''
        }));
    }
    if (this.project && this.section) {
        this.store.dispatch(new SectionBoardAddNote({
            projectId: this.project.uuid,
            sectionId: this.section.uuid,
            boardId: e.board.uuid,
            sectionOpen: this.sectionOpened,
            boardOpen: this.boardOpen,
            title: '',
            text: ''
        }));
    }
    this.noteAddCheck = true;
    this.boarduuid = e.board.uuid;
  }


  projectClick(): void {
    if (this.active) this.toggleSidebar();
    this.section = undefined;
    this.sectionOpened = false;
    this.onProjectClick.emit(this.project);
    this.summaryBar = this.summary = this.project.summary;
    this.boards = this.project.boards;
    this.openedTitle = this.project.title;
    this.workingOn = 'project';
    this.selectedSectionId = '';
    this.selectedBoardId = '';
    this.store.dispatch(new CloseBoards({}));
    if (this.project.title !== '') {
      this.onFieldFocus.emit("[id='" + this.project.uuid + "-content']");
    }
  }
  extractContent(s): string {
    const span = document.createElement('span');
    span.innerHTML = s;

    return span.textContent || span.innerText;
  }
}
