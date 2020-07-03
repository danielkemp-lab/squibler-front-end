import { Observable } from 'rxjs/Observable';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  AppState,
  selectIdeaState,
  selectProjectState
} from '../../../store/app.states';
import {
  IdeaAdd,
  IdeaDelete,
  IdeaGetAll,
  IdeaUpdate
} from '../../../store/actions/idea.actions';
import { SegmentService } from 'ngx-segment-analytics'

declare var $: any;

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit, AfterViewInit {
  @ViewChild('ideaName')
  ideaName: ElementRef;
  froalaForm: FormGroup;
  getState: Observable<any>;
  getIdeasState: Observable<any>;
  currentIdea: any;
  saveIdeaMethod: any;
  duplicateFlag = false;
  assignToProjectFlag = false;
  addPopupFlag = false;
  assignedProjectName = '';
  assignedProjectId = '';
  showQuote = true;
  switchFlag = false;
  saveDocumentFlag = false;
  searchActive = false;
  autosaveFlag = false;
  addIdeaFlag = false;
  loader: boolean;
  openedProjectPopupVar = false;
  projectList = [
    {
      title: 'project',
      descr: 'descr'
    },
    {
      title: 'project',
      descr: 'descr'
    },
    {
      title: 'project',
      descr: 'descr'
    },
    {
      title: 'project',
      descr: 'descr'
    }
  ];
  ideasList = [];
  title: 'ideas';
  user = {
    imageUrl: 'assets/images/user.png',
    name: 'Helen Britne',
    account: 'Resonate Premium'
  };
  editorContent = "My Document's Title";
  _that = this;
  options = {
    key: 'JA3B4A5A1qB1F1A4C3I1A15A10D3C6E5djknuC-21rzrD3kl==',
    content: 'qwertytim',
    placeholderText: 'Start your thoughts here ... ',
    imageUploadURL: `${environment.backUrlImage}/upload`,
    events: {
      'froalaEditor.contentChanged': () => {
        this.autosaveFunction(5000);
      },
      'froalaEditor.image.uploaded': () => {
        this.autosaveFunction(1000);
      },
      'froalaEditor.image.error': (e, editor, error, response) => {
        if (error.code === 3) {
          alert('Image too big. Max size is 10MB');
        }
      }
    },
    toolbarButtons: ['insertImage', 'insertLink'],
    tooltips: false,
    charCounterCount: false,
    paragraphFormatSelection: true,
    fontFamilySelection: true,
    fontSizeSelection: true,
    quickInsertButtons: []
  };
  openCustomTitle: boolean = false;

  constructor(
    private ngZone: NgZone,
    private store: Store<AppState>,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private segment: SegmentService

  ) {
    this.getState = this.store.select(selectProjectState);
    this.getIdeasState = this.store.select(selectIdeaState);
  }

  insertFroalaArea(item) {
    this.currentIdea = item;
    if (this.currentIdea) {
      this.froalaForm = this.formBuilder.group({
        title: [this.currentIdea.title, [Validators.required]],
        description: [this.currentIdea.description, [Validators.required]]
      });
      this.froalaForm.controls['title'].valueChanges.subscribe(() => {
        this.autosaveFunction(5000);
      });
    }
  }

  autosaveFunction(time) {
    if (!this.autosaveFlag) {
      this.autosaveFlag = true;
      setTimeout(() => {
        this.autosaveFlag = false;
        this.saveIdea();
        this.ngZone.run(() => {
          this.saveDocumentFlag = true;
        });
      }, time);
    }
  }

  openedProjectPopup() {
    this.openedProjectPopupVar = !this.openedProjectPopupVar;
    this.segment.track("Toggle project popup", {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: this.assignedProjectId
    });
  }

  getIdeas(item) {
    if (item.id !== this.currentIdea.id) {
      this.switchFlag = true;
      this.saveIdea();
    }
    this.currentIdea = item;
    this.insertFroalaArea(this.currentIdea);
  }

  addNewIdea() {
    this.ideasList.unshift({
      title: '',
      description: '',
      project_id: null
    });
    this.insertFroalaArea(this.ideasList[0]);
    setTimeout(() => {
      this.ideaName ? this.ideaName.nativeElement.focus() : null;
    }, 1000);
  }

  saveIdea() {
    this.saveDocumentFlag = true;
    setTimeout(() => {
      this.ngZone.run(() => {
        this.saveDocumentFlag = false;
      });
    }, 2000);
    if (!this.froalaForm.value.title) {
      this.froalaForm.value.title = 'Untitled idea';
    }
    if (this.currentIdea.project_id === null) {
      this.addIdeaFlag = true;
      this.store.dispatch(new IdeaAdd(this.froalaForm.value));
      this.saveIdeaMethod = true;
    } else {

      this.currentIdea.title = this.froalaForm.value.title;
      this.currentIdea.description = this.froalaForm.value.description;
      this.store.dispatch(new IdeaUpdate(this.currentIdea));
      this.saveIdeaMethod = false;
    }
  }

  deleteIdea(idea) {
    this.store.dispatch(new IdeaDelete(idea));
    this.ideasList.splice(this.ideasList.indexOf(idea), 1);
  }

  duplicateIdea(idea) {
    this.addIdeaFlag = true;
    this.store.dispatch(new IdeaAdd(idea));
    this.duplicateFlag = true;
  }

  addIdeaToProject(project) {
    this.ideasList.splice(this.ideasList.indexOf(this.currentIdea), 1);
    this.currentIdea.project_id = project.id;
    this.assignedProjectId = project.id;
    this.assignedProjectName = project.title;
    this.assignToProjectFlag = true;
    this.store.dispatch(new IdeaUpdate(this.currentIdea));
  }
  ngAfterViewInit() {
    this.ideaName.nativeElement.focus();
  }
  addNewProject() {
    this.router.navigateByUrl('/dashboard/projects');
  }

  deletePopup(idea) {
    this.store.dispatch(new IdeaDelete(idea));
    this.ideasList.splice(this.ideasList.indexOf(idea), 1);
  }

  hideQuote() {

    this.showQuote = false;
    localStorage.setItem('showIdeasQuote', 'true');
  }

  checkElement(idea) {
    const doc = new DOMParser().parseFromString(idea.description, 'text/html');
    const imagesArray = [];
    Array.from(doc.body.children).forEach(element => {
      Array.from(element.children).forEach(childrenTag => {
        if (childrenTag.tagName === 'IMG') {
          imagesArray.push(childrenTag['src']);
        }
      });
    });
    return imagesArray;
  }
  ngOnInit() {
    this.segment.identify(localStorage.getItem('userId'), {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
    });
    this.loader = true;
    const data = null;
    this.showQuote = localStorage.getItem('showIdeasQuote') ? false : true;
    this.store.dispatch(new IdeaGetAll(data));
    // this.store.dispatch(new ProjectGetAll(data));
    this.getIdeasState.subscribe(state => {
      if (state.ideas && state.ideas.length) {
        const ideasArr = [];
        state.ideas.forEach(element => {
          if (element.project_id === -1) {
            this.checkElement(element);
            element.imageArray = this.checkElement(element);
            ideasArr.unshift(element);
          }
        });
        this.ideasList = ideasArr;
        this.currentIdea = state.ideas[0];
        this.insertFroalaArea(this.ideasList[0]);
        this.loader = false;
      } else {
        this.loader = false;
      }
      if (state.ideas && !state.ideas.length && state.ideas.data) {
        if (!state.ideas.data.length) {
          state.ideas.data = [state.ideas.data];
        }
        state.ideas.data[0].imageArray = undefined;
        state.ideas.data[0].imageArray = this.checkElement(state.ideas.data);
        if (this.saveIdeaMethod) {
          this.ideasList[0] = state.ideas.data[0];
          if (!this.switchFlag) {
            this.currentIdea = this.ideasList[0];
          }
          this.saveIdeaMethod = false;
        } else {
          if (state.ideas.data[0]) {
            if (!this.switchFlag) {
              this.ideasList[this.ideasList.indexOf(this.currentIdea)] =
                state.ideas.data[0];
              this.currentIdea = state.ideas.data[0];
              this.currentIdea.imageArray = this.checkElement(this.currentIdea);
              if (this.duplicateFlag) {
                this.duplicateFlag = false;
                this.ideasList.unshift(state.ideas.data[0]);
              }
              if (this.assignToProjectFlag) {
                this.assignToProjectFlag = false;
                this.currentIdea = this.ideasList[0];
                this.insertFroalaArea(
                  this.ideasList[0] ? this.ideasList[0] : null
                );
                this.addPopupFlag = true;
                setTimeout(() => {
                  this.addPopupFlag = false;
                }, 5000);
              }
            } else {
              this.switchFlag = false;
            }
          }
        }
        this.ngZone.run(() => {
          this.ideasList = this.ideasList;
        });
      }
      if (state.ideas && state.ideas.length) {
        const ideasArr = [];
        state.ideas.forEach(element => {
          if (element.project_id === -1) {
            this.checkElement(element);
            element.imageArray = this.checkElement(element);
            ideasArr.unshift(element);
          }
        });
        this.ideasList = ideasArr;
        this.currentIdea = state.ideas[0];
        this.insertFroalaArea(this.ideasList[0]);
        this.loader = false;
      }
      if (state.ideas && !state.ideas.length) {
        this.loader = false;
      }
    });
    this.getState.subscribe(state => {
      if (state.projects && state.projects.data) {
        this.projectList = state.projects.data;
      }
    });
    const _thisVar = this;
    $.FroalaEditor.RegisterCommand('Save Document', {
      title: 'Save Document',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback() {
        _thisVar.saveIdea();
      }
    });
    this.insertFroalaArea(this.ideasList[0]);
  }
  showCustomTitle(e) {
    if (e) e.stopPropagation();
    this.openCustomTitle = !this.openCustomTitle;
  }
}
