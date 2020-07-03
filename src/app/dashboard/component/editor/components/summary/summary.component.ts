import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output, ViewContainerRef, ComponentRef, ComponentFactoryResolver,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  AppState,
  selectIdeaState,
  selectProjectState
} from '../../../../../store/app.states';
import { SectionUpdate } from '../../../../../store/actions/section.actions';
import { SegmentService } from 'ngx-segment-analytics'
import { environment } from '../../../../../../environments/environment';
import {EditorToolbarComponent} from "../../../wysiwyg-editor/components/editor-toolbar/editor-toolbar.component";
import {UpdateProjectSummary, UpdateSectionSummary} from "../../../../../store/actions/project.actions";
declare var $: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnChanges {
  summaryForm: FormGroup;
  getState: Observable<any>;
  getIdeasState: Observable<any>;
  currentIdea: any;
  saveIdeaMethod: any;
  @ViewChild('summaryName') summaryName: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('toolbarConatiner', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  ref: ComponentRef<any>;

  @Output()
  projectData = new EventEmitter();
  sectionFlag = false;
  @Input()
  globalId;
  @Input()
  project;
  @Input() workingOn;
  @Input() selectedSectionId;
  @Input() sectionOpened;
  @Input()
  parentSummarySubject: Subject<any>;

  title: 'ideas';
  public editorContent = "My Document's Title";

  options: any;
  sidebarActive = false;
  editorFull = false;

  _that = this;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private segment: SegmentService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.getState = this.store.select(selectProjectState);
    this.getIdeasState = this.store.select(selectIdeaState);
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
      quickInsertButtons: [],
      imagePopupDivLeftPosition: '275',
      urlPopupDivLeftPosition: '180',
      urlInsertSpaceOpen: false,
      imageUploadSpaceOpen: false
    };
  }
  toggleFullScr(): void {
    this.sidebarActive = false;
    this.editorFull = !this.editorFull;
  }

  addEditor(): void {
    if (!this.ref) {
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

    this.ref.instance.configs = this.options;
    this.ref.instance.configs.hideBar = true;
  }

  removeEditor(): void {
    this.ref.instance.configs.hideBar = false;
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
  saveProject() {
    this.store.dispatch(this.workingOn === 'project' ? new UpdateProjectSummary({
      projectId: this.project.uuid,
      text: this.editorContent
    }) : new UpdateSectionSummary({
      projectId: this.project.uuid,
      sectionId: this.selectedSectionId,
      text: this.editorContent,
      sectionOpen: this.sectionOpened
    }));
  }
  ngOnChanges() {
    if (this.project && this.project.label) {
      this.sectionFlag = true;
    } else {
      this.sectionFlag = false;
    }
    this.addEditor();
  }
  ngOnInit() {
    this.segment.identify(localStorage.getItem('userId'), {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
    });
    this.parentSummarySubject.subscribe(event => {
      if (this.project !== this.summaryForm.value && !event) {
        this.addEditor();
      }
      if (event) {
        this.saveProject();
      }
    });
    this.addEditor();
    this.options.placeholderText = 'Give your ' + this.workingOn + ' clarity and direction by adding a ' + this.workingOn + ' summary here...';
  }
}
