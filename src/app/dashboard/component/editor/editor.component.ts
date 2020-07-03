import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import { SegmentService } from 'ngx-segment-analytics';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppState, selectProjectState } from '../../../store/app.states';
import {
  UpdateProjectContent,
  UpdateProjectTitle,
  UpdateSectionText,
  UpdateSectionTitle,
  Init
} from '../../../store/actions/project.actions';
import { EditorToolbarComponent } from '../wysiwyg-editor/components/editor-toolbar/editor-toolbar.component';
import { ImageToolbarComponent } from '../wysiwyg-editor/components/image-toolbar/image-toolbar.component';
import { ImageUploadService } from '../../../_services/image-upload.service';

declare var $: any;
@Component({
  selector: 'dashboard-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewChecked {
  ElementRef
  active = false;
  project: any;
  projectId: string;
  editorHtml = '';
  exportedFile = undefined;
  projectloader = true;
  editorFull = false;
  requestSent = false;
  projectExportOptions = false;
  exportReady = false;
  exporting = false;
  sidebarActive = false;
  exportFormat = '';
  workingOn = 'project';
  section;
  current_target;
  editingProject = false;
  board = undefined;
  sectionOpened;
  projectSubscription: Subscription;
  getProjectState: Observable < any > ;
  updated = false;
  selectedSectionId = undefined;
  // currentTime =
  placeHolder = true;
  options: any;
  projectOptions: any;
  projectTitleOptions: any;
  sectionTitleOptions: any;

  updateElement: any;
  fontActive = false;
  selectedImage:any;

  elementSelectorQuery: string = null;
  nodeSelected: any = '';
  nodePosition: any = 0;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('toolbarConatiner', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  ref: ComponentRef<any>;

  imageToolbarRef: ComponentRef<any>;
  @ViewChild('projectEditor') projectEditor: ElementRef;

  @ViewChild('sidebar') sidebar;

  constructor(
    private store: Store < AppState > ,
    private route: ActivatedRoute,
    private segment: SegmentService,
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    private imageFactoryResolver: ComponentFactoryResolver,
    private imageUpload: ImageUploadService,
    private cdRef:ChangeDetectorRef
  ) {
    this.getProjectState = this.store.select(selectProjectState);
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
        image: true,
        url: false
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
      imageUploadSpaceOpen: false,
      imageLoader: false
    };

    this.projectOptions = this.options;
    this.projectOptions.multiLine = true;
    this.projectTitleOptions = Object.assign({}, this.options);
    this.sectionTitleOptions = Object.assign({}, this.options);

    this.projectOptions.placeholderText = this.project && this.project.sections && !this.project.sections.length ? 'Welcome to the editor! This is where you put the pen to the pad. If you want to avoid any distractions try our “Distraction Free Mode.” If you’re looking to do some planning, try switching to the planner, where you can add research, notes, and custom Boards. You can also create an Outline for your project, and use it to navigate to different sections of your text. Good luck and happy writing!' : 'Start writing here...';
    this.projectTitleOptions.placeholderText = 'Untitled project';
    this.projectTitleOptions.multiLine = false;
    this.projectTitleOptions.toolbarButtons = {
      fontFamily: true,
      bold: true,
      italic: true,
      underline: true
    };

    this.sectionTitleOptions.placeholderText = 'Untitled section';
    this.sectionTitleOptions.multiLine = false;
    this.sectionTitleOptions.toolbarButtons = {
      fontFamily: true,
      bold: true,
      italic: true,
      underline: true
    };
  }
  addEditor(configsOptions): void {
    if (!this.ref) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(EditorToolbarComponent);
      this.ref = this.viewContainerRef.createComponent(factory);
      this.ref.instance.configs = configsOptions;
      this.ref.instance.onFormat.subscribe(
          (event: any) => {
            document.execCommand(event.action, false, event.value);
          }
      );
      this.ref.instance.onImageUpload.subscribe(
          (props: any) => {
          this.ref.instance.configs.imageLoader = true;
          this.updateProjectPhoto(props);
        }
      );
      this.ref.instance.onUrlAdd.subscribe(
          (props: any) => {
            this.updateUrlLink(props);
          }
      );
      this.ref.changeDetectorRef.detectChanges();
    }

    this.ref.instance.configs = configsOptions;
    this.ref.instance.configs.hideBar = true;
  }
  removeEditor(): void {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
    // this.ref.instance.configs.hideBar = false;
  }

  toggleFullScr(): void {
    this.sidebarActive = false;
    this.editorFull = !this.editorFull;
    this.board = undefined;
  }

  exportProject(format): void {

    this.exportFormat = format;
    this.exportFormat = format;
    this.exporting = true;
    // this.store.dispatch(new ProjectExport({ id: this.projectId, format }));
  }

  onSubmit(): void {
    // this.onEditSubSectionSuccess.emit(this.textForm.value);
  }

  toggleSidebar(): void {
    this.sidebarActive = this.board ? false : !this.sidebarActive;
    this.board = undefined;
    this.segment.track('Toggle sidebar', {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: this.projectId
    });
  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
  getSectionText(html): string {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.innerText.replace(/\s/g, '');
  }
  ngOnInit(): void {
    this.segment.identify(localStorage.getItem('userId'), {
      environment: environment.NAME,
      userId: localStorage.getItem('userId')
    });
    this.projectloader = true;
    this.route.params.subscribe(params => {
      this.projectId = params.projectId;
    });
    this.segment.page('Project editor', {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: this.projectId
    });
    if (this.projectId && !this.project) {
      this.store.dispatch(new Init({
        uuid: this.projectId
      }));
    }

    this.projectSubscription = this.getProjectState.subscribe(state => {
      if (state.project) {
        if (this.workingOn === 'project') {
          if (!this.project || this.project.title !== state.project.title) {
            this.project = state.project;
            if(typeof this.project.show_text_placeHolder === 'undefined'){
              if(!this.project.title) this.project.show_title_placeHolder = true;
              if(!this.project.content) this.project.show_text_placeHolder = true;
            }
          }
        } else {
          const sectionIndex = _.findIndex(state.project.sections || undefined, ['uuid', this.section.uuid || undefined]);
          if (!this.section) {
            this.section = state.project.sections[sectionIndex];
          }
          if(!this.section.title) {
            this.section.show_title_placeHolder = true;
          }else{
            this.section.show_title_placeHolder = false;
          }
          if(!this.section.text) {
            this.section.show_text_placeHolder = true;
          }else{
            this.section.show_text_placeHolder = false;
          }
        }
        this.projectloader = false;
      }
      this.active = this.sidebar.active;
      if (!state.error && state.updated) {
        this.ngZone.run(() => {
          this.updated = true;
        });
        setTimeout(() => {
          this.ngZone.run(() => {
            this.updated = false;
          });
        }, 2000);
      }
      this.editingProject = false;
    });

  }
  trackByFn(index, section): any {
    return section.uuid;
  }

  onSectionClick(e): void {
    this.syncStateWithSideBar();
    this.workingOn = 'section';

    if(e.section) this.section = e.section;
    const sectionIndex = _.findIndex(this.project.sections, ['uuid', e.section.uuid]);
    if (sectionIndex == -1 || sectionIndex == undefined) {
      this.project.sections[this.project.sections.length] = e.section;
    } else {
      this.project.sections[sectionIndex] = e.section;
    }
    this.sectionOpened = e.opened;
    this.board = undefined;

    /* Save selected section id */
    this.selectedSectionId = e.section.uuid;

    if (e.element && e.element.target && e.element.target.children[1]) {
      e.element.target.children[1].focus();
      if(e.element.target.children[1].value){
        setTimeout(() => {
          this.fieldFocus("div[id='" + e.section.uuid + "'][title='section_text']");
        }, 200);
      }
      else{
        e.element.target.children[1].focus();
      }
    }
    if (e.newSection) {
      setTimeout(() => {
        if (document.getElementById('project-tree')) {
          const element = document.getElementById('project-tree').childNodes[document.getElementById('project-tree').childNodes.length - 2] as HTMLElement;
          element.getElementsByTagName('input')[0].focus();
        }
        document.querySelector("div[id='" + e.section.uuid + "'][title='section_text']").innerHTML = '';
      }, 500);

    }
  }

  onProjectClick(e): void {
    this.syncStateWithSideBar();
    this.workingOn = 'project';
    if (e.sections) {
      this.project.sections = e.sections;
    }

    /* Update project from individual section */
    if (this.selectedSectionId) {
      const sectionIndex = _.findIndex(this.project.sections, ['uuid', this.selectedSectionId]);
      // if (sectionIndex == -1 || sectionIndex == undefined) {
      //   this.project.sections[this.project.sections.length] = this.section;
      // } else {
        this.project.sections[sectionIndex] = this.section;
      // }
      this.selectedSectionId = undefined;
    }
  }
  syncStateWithSideBar(): void{
    if(typeof this.current_target !== 'undefined'){
      if (this.current_target.title === 'section_text') {
        const sectionIndex = _.findIndex(this.project.sections, ['uuid', this.section.uuid]);
        this.project.sections[sectionIndex].text = this.current_target.innerHTML;
        this.section.text = this.current_target.innerHTML;
      }
      if (this.current_target.title === 'project_text')
        this.project.content = this.current_target.innerHTML;

      this.current_target = undefined;
    }

  }
  updateSection(targetElement): any {
    if (this.workingOn === 'section' || (this.current_target && this.current_target.title === 'section_text')) {
        this.store.dispatch(new UpdateSectionText({
          projectId: this.projectId,
          sectionId: this.section.uuid,
          text: targetElement.innerHTML,
          sectionOpen: this.sectionOpened
        }));
    }

  }
  updateSectionById(e, editor): any {
    const sectionId = this.workingOn === 'section' ? this.section.uuid : e.target.id;
    this.store.dispatch(new UpdateSectionText({
      projectId: this.projectId,
      sectionId,
      text: editor.el.innerHTML,
      sectionOpen: this.sectionOpened
    }));
  }

  updateSectionTitle(e): void {
    this.store.dispatch(new UpdateSectionTitle({
      projectId: this.projectId,
      sectionId: e.target.id,
      value: e.target.innerHTML,
      sectionOpen: this.sectionOpened
    }));

  }

  updateAndFocusSection(e): void {
    this.updateSectionTitle(e);

    this.fieldFocus("div[id='"+e.target.id+"'][title='section_text']");
  }

  preventEnter(e): void {
    e.preventDefault();
  }
  updateAndFocusProject(e): void {
    this.updateProjectTitle(e);

    this.fieldFocus("[id='"+this.projectId + "-content']");
  }
  updateProjectTitle(e): void {

    this.store.dispatch(new UpdateProjectTitle({
      projectId: this.projectId,
      value: e.target.innerHTML
    }));

  }

  updateProjectContent(targetElement): any {
      this.editingProject = true;
      this.store.dispatch(new UpdateProjectContent({
        projectId: this.project.uuid,
        content: targetElement.innerHTML
      }));
  }

  boardClick(e): void {
    this.board = e.board;
    this.sidebarActive = true;
  }

  saveExportedFile(): void {
    const url = window.URL.createObjectURL(this.exportedFile);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${(this.project.title ? this.project.title : 'project')}.${this.exportFormat}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    this.exporting = false;
    this.projectExportOptions = false;
    this.exportFormat = '';
  }

  textImageError(): void {
    alert('Image too big. Max size is 10MB');
  }

  addImageToolbar(e): any {
    const topPosition = e.getBoundingClientRect().top - 130;
    const bottomPosition = e.getBoundingClientRect().bottom - 60;
    const windowHeight = window.innerHeight;
    let positionCheck = (topPosition >= 0) ? topPosition : ((bottomPosition < windowHeight) ? bottomPosition : 0);
    let isTopPosition = false;
    let isBottomPosition = false;
    if(topPosition >= 0){
      positionCheck = topPosition;
      isTopPosition = true;
    }else if(bottomPosition < windowHeight){
      positionCheck = bottomPosition;
      isBottomPosition = true;
    }
    if (!this.imageToolbarRef && positionCheck !== 0) {
        const imageFactory = this.componentFactoryResolver.resolveComponentFactory(ImageToolbarComponent);
        this.imageToolbarRef = this.viewContainerRef.createComponent(imageFactory);
        this.imageToolbarRef.instance.linkAvailability = e.parentElement.getAttribute('href');
        this.imageToolbarRef.instance.onImageFormat.subscribe(
          (event: any) => {
              if (event.action === 'delete') {
                  this.selectedImage.remove();
                  document.execCommand(event.action, false, event.value);
                  this.removeImageToolbar();
              }
              else if (event.action === 'link') {
                  this.selectedImage.firstElementChild.setAttribute('href', event.value);
              }
              else if (event.action === 'caption') {
                  this.selectedImage.firstElementChild.style['display'] = 'inline-block';
                  this.selectedImage.firstElementChild.style['text-align'] = 'center';
                  this.selectedImage.firstElementChild.lastElementChild.innerText = event.value;
              }
              else if (event.action === 'alt') {
                  this.selectedImage.firstElementChild.firstElementChild.alt = event.value;
              }
              else {
                  const attributeList = Object.keys(event.value);
                  for (let i = 0; i < attributeList.length; i++) {
                      const key = attributeList[i];
                      if (key === 'textAlign' || key === 'display') {
                          this.selectedImage.style[key] = event.value[key];
                      } else {
                          if (this.selectedImage.firstElementChild.firstElementChild.style[key] === event.value[key] && (key === 'borderRadius' || key === 'border' || key === 'boxShadow')) {
                              this.selectedImage.firstElementChild.firstElementChild.style[key] = '';
                          } else {
                              this.selectedImage.firstElementChild.firstElementChild.style[key] = event.value[key];
                          }
                      }
                  }
              }
              this.updateFunction(undefined);
          });
        this.imageToolbarRef.instance.toolbarPositionTop = positionCheck;
        this.imageToolbarRef.instance.isTopPosition = isTopPosition;
        this.imageToolbarRef.instance.isBottomPosition = isBottomPosition;
    }
  }

  removeImageToolbar(): void {
    if (this.imageToolbarRef) {
        this.imageToolbarRef.destroy();
        this.imageToolbarRef = undefined;
    }
  }

  textImageUploaded(_e, response): any {
      const imageUrl = response['link'];
      const imageId = imageUrl.split("/")[7];
      const insertedImage =  `<div><a href="#" target="_blank"><img style="width:100%;max-width: 1000px;height:100%;max-height: 1000px" src="${imageUrl}"><div></div></a></div>`
      document.execCommand("insertHTML", false, insertedImage);
      this.ref.instance.configs.imageLoader = false;
      this.ref.instance.configs.imageUploadSpaceOpen = false;
      return true;
  }

  textMousedown(e, event): any {
    e.preventDefault();
  }

  contentFormat(event): void {
    document.execCommand(event.action, false, event.value);
  }

  blurFunction(e): void {
    let caretpos = 0;
    const elementSelected = <HTMLElement>document.querySelector('[id="projectEditor"');

    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined" && elementSelected !== null) {
      const range = document.createRange();
      range.selectNodeContents(elementSelected);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const rangeValue = sel.getRangeAt(0);
        caretpos = rangeValue.endOffset;
      }
      this.nodeSelected = sel.focusNode;
      this.nodePosition = caretpos;

    }

    if (!e.relatedTarget) {
      this.removeEditor();
    }
  }

  focusFunction(e, configOptions): void {
    if (e.relatedTarget) {
      this.removeEditor();
    }
    this.addEditor(configOptions);
  }

  clickFunction(e): void {
    if (e.target.nodeName.toLowerCase() === 'img') {
        // find out the editor part containing image
        this.removeImageToolbar();
        this.updateElement = e.target.closest('.wysiwyg-editor__content');
        this.selectedImage = e.target.parentElement.parentElement;
        this.addImageToolbar(e.target);
    } else {
        this.removeImageToolbar();
    }
  }

  updateProjectPhoto(props): void {
    if (props.value.size <= 10000000) {
      // calling upload image API
      const formData = new FormData();
      formData.append('file', props.value);
      this.imageUpload.uploadImage(formData).subscribe(
          data => {
              this.textImageUploaded(props._event, data);
          });
    } else {this.textImageError()};
  }

  updateUrlLink(props): void {
    const sel = window.getSelection();
    sel.setPosition(this.nodeSelected, this.nodePosition);
    this.nodeSelected = '';
    this.nodePosition = 0;
    const newTab = (props.newTab)? 'target="_blank"' : '';
    const insertedLink =  `<a href="${props.link}" ${newTab}>${props.text}</a>`;
    document.execCommand("insertHTML", false, insertedLink);
  }

  changeFunction(e): void {
    this.current_target = e.target;
    this.placeHolder = e.target.innerText.length > 0 ? false : true;
    if (e.target.title === 'section_title') {
      const sectionIndex = _.findIndex(this.project.sections, ['uuid', e.target.id]);
      this.section = this.project.sections[sectionIndex];
      this.section.show_title_placeHolder = this.placeHolder;
    } else if (e.target.title === 'section_text') {
      const sectionIndex = _.findIndex(this.project.sections, ['uuid', e.target.id]);
      this.section = this.project.sections[sectionIndex];
      this.section.show_text_placeHolder = this.placeHolder;
    } else if (e.target.title === 'project_title') {
      this.project.show_title_placeHolder = this.placeHolder;
    } else if (e.target.title === 'project_text') {
      this.project.show_text_placeHolder = this.placeHolder;
    }

    this.updateFunction(e);
  }

  updateFunction(e): void {
    let targetElement;
    if (e) {
        targetElement = e.target;
    } else {
      this.requestSent = false;
      targetElement = this.updateElement;
    }
    if (!this.requestSent){
      this.requestSent = true;
      if (targetElement.title === 'section_text') {
        this.updateSection(targetElement);
      } else if (targetElement.title === 'project_text') {
        this.updateProjectContent(targetElement);
      }

      setTimeout(() => {
        this.requestSent = false;
      }, 3000);

    }
  }

  toolbarBtnChange(e): void {
    if (this.ref && this.ref.instance) {
      this.ref.instance.underlineBtnClass = e.target.closest('u') !== null ? 'te-active' : '';
      this.ref.instance.italicBtnClass = e.target.closest('i') !== null ? 'te-active' : '';
      this.ref.instance.boldBtnClass = e.target.closest('b') !== null ? 'te-active' : '';
      this.fontActive = e.target.closest('font') !== null ? true : false;
      if (this.fontActive) {
        this.ref.instance.fontFamilyText = (e.target.closest('font')).attributes.face.nodeValue;
      } else {
        this.ref.instance.fontFamilyText = 'Lora';
      }
    }
  }

  fieldFocus(elementSelectorQuery): void {
    this.elementSelectorQuery = elementSelectorQuery;
    const elementSelected = <HTMLElement>document.querySelector(elementSelectorQuery);
    if(elementSelected !== null) {
      elementSelected.focus();

      if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(elementSelected);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        // elementSelected.scrollTop = elementSelected.scrollHeight;

      }
    }
  }

  ngAfterViewChecked(){
    if(this.elementSelectorQuery !== null){
      this.fieldFocus(this.elementSelectorQuery);
      this.elementSelectorQuery = null;
    }
    this.cdRef.detectChanges();
  }
}
