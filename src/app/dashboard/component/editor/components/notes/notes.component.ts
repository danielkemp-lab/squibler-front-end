import {
  Component,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  AppState,
  selectIdeaState,
  selectProjectState,
} from '../../../../../store/app.states';
import {
  IdeaAdd,
  IdeaDelete,
  IdeaUpdate,
} from '../../../../../store/actions/idea.actions';
import { getFroalaOptions } from '../../../../../helper/helper';
declare var $: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnChanges {
  froalaForm: FormGroup;
  getState: Observable<any>;
  getIdeasState: Observable<any>;
  currentIdea: any;
  saveIdeaMethod: any;
  sectionNote = false;
  @ViewChild('noteName')
  noteName: ElementRef;
  @Input()
  globalId;
  @Input()
  idea;
  @Input()
  open;
  @Input()
  summaryIdea;
  @Input()
  parentNotesSubject: Subject<any>;
  @Output()
  addIdeaToNewProject = new EventEmitter();
  projectList = [
    {
      title: 'project',
      descr: 'descr',
    },
    {
      title: 'project',
      descr: 'descr',
    },
    {
      title: 'project',
      descr: 'descr',
    },
    {
      title: 'project',
      descr: 'descr',
    },
  ];
  ideasList = [
    {
      title: 'title1',
      description: 'descripted1',
      project_id: '9',
    },
    {
      title: 'title2',
      description: 'descripted2',
      project_id: '9',
    },
    {
      title: 'title3',
      description: 'descripted3',
      project_id: '9',
    },
    {
      title: 'title4',
      description: 'descripted4',
      project_id: '9',
    },
    {
      title: 'title5',
      description: 'descripted5',
      project_id: '9',
    },
  ];
  title: 'ideas';
  editorContent = "My Document's Title";
  _that = this;
  options = getFroalaOptions({
    'froalaEditor.image.error': this.froalaImageError,
  });
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getState = this.store.select(selectProjectState);
    this.getIdeasState = this.store.select(selectIdeaState);
  }

  insertFroalaArea(item) {
    if (item) {
      this.currentIdea = item;
      this.froalaForm = this.formBuilder.group({
        title: [this.currentIdea.title, [Validators.required]],
        description: [this.currentIdea.description, [Validators.required]],
      });
    }
  }
  addNewIdea() {
    this.ideasList.unshift({
      title: '',
      description: '',
      project_id: null,
    });
    this.insertFroalaArea(this.ideasList[0]);
  }
  saveIdea() {
    if (!this.sectionNote) {
      if (this.currentIdea.section_id === null) {
        if (this.globalId.urlProjectId) {
          if (this.froalaForm.value.title === '') {
            this.froalaForm.value.title = 'Untitle idea';
          }
          this.froalaForm.value.project_id = Number(this.globalId.urlProjectId);
          this.store.dispatch(new IdeaAdd(this.froalaForm.value));
          this.saveIdeaMethod = true;
        } else {
          if (this.froalaForm.value.title === '') {
            this.froalaForm.value.title = 'Untitle idea';
          }
          this.addIdeaToNewProject.emit(this.froalaForm.value);
          // this.store.dispatch(new IdeaAdd('this.froalaForm.value'));
        }
      } else if (
        this.globalId.urlProjectId ||
        (isNaN(this.currentIdea.project_id) &&
          (!this.currentIdea.index && this.currentIdea.index !== 0))
      ) {
        this.currentIdea.title = this.froalaForm.value.title;
        this.currentIdea.description = this.froalaForm.value.description;
        if (this.currentIdea.title === '') {
          this.currentIdea.title = 'Untitle idea';
        }
        if (this.globalId.urlProjectId) {
          this.store.dispatch(new IdeaUpdate(this.currentIdea));
        }

        this.saveIdeaMethod = false;
      } else {
        this.froalaForm.value.index = this.froalaForm.value.index = this.currentIdea.index;
        this.addIdeaToNewProject.emit(this.froalaForm.value);
      }
    } else {
      const responseObj = {
        title: this.froalaForm.value.title
          ? this.froalaForm.value.title
          : 'Untitle idea',
        description: this.froalaForm.value.description,
        project_id: this.summaryIdea.projectId,
        section_id: this.summaryIdea.id,
        id: null,
      };
      if (!this.currentIdea.id) {
        this.store.dispatch(new IdeaAdd(responseObj));
        this.sectionNote = false;
      } else {
        responseObj.id = this.currentIdea.id;
        this.store.dispatch(new IdeaUpdate(responseObj));
        this.sectionNote = false;
      }
    }
  }
  addNewProject() {
    this.router.navigateByUrl('/dashboard/projects');
  }
  deletePopup(idea) {
    this.store.dispatch(new IdeaDelete(idea));
    this.ideasList.splice(this.ideasList.indexOf(idea), 1);
  }
  ngOnChanges(): void {
    if (
      this.idea &&
      this.idea.project_id &&
      this.idea.section_id !== -1 &&
      this.idea.section_id !== null
    )
      this.sectionNote = true;
    this.insertFroalaArea(this.idea);

    if (this.open) {
      this.noteName.nativeElement.focus();
    }
  }
  ngOnInit() {
    this.parentNotesSubject.subscribe(event => {
      if (event) {
        this.saveIdea();
      }
    });
    $.FroalaEditor.DefineIcon('Add Section', { NAME: 'heading' });
    $.FroalaEditor.RegisterCommand('heading', {
      title: 'Insert Title',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback(): void {},
    });
    const _thisVar = this;
    $.FroalaEditor.RegisterCommand('Save Document', {
      title: 'Save Document',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback() {
        _thisVar.saveIdea();
      },
    });
    this.insertFroalaArea(this.ideasList[0]);
  }
  private froalaImageError(_e, editor, error, response): void {
    if (error.code === 3 || error.code === 4)
      alert('Image too big. Max size is 1MB');
  }
}
