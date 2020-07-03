import { Component, ElementRef, OnInit, ViewChild, OnChanges} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.states';
import { environment } from '../../../../environments/environment';
import { UpdateSectionTitle } from '../../../store/actions/project.actions';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss']
})
export class WysiwygEditorComponent implements OnInit {
  toolbarConfigs: Object;

  focusEvent = false;
  projectID = '16c74992-4987-4b25-a70f-9273f918c62e';
  sectionID = '1ad42973-ce5e-4acd-bd67-fef503fee951';


  model = 'some text';
  @ViewChild('editor') editor: ElementRef;

  constructor(
      private store: Store < AppState >
  ) {
    this.toolbarConfigs = {
      tooltips: false,
      placeholderText: 'Start writing here...',
      toolbarButtons: {
        fontFamily: true,
        bold: true,
        italic: true,
        underline: true,
        formatUL: true,
        align: true,
        image: true
      },
      fontFamily: {
        'Times New Roman': "'Times New Roman',Times,serif",
        'Arial': "'Arial'",
        'Courier': "'Courier'",
        'Garamond': "'Garamond'",
        // "'Comic Sans'": 'Comic Sans',
        'Papyrus': "'Papyrus'",
        'Palatino': "'Palatino'",
        'Century Schoolbook': "'Century Schoolbook'",
        'Georgia': "'Georgia'",
        'Australian Sunset': "'Australian Sunset'",
        'Adobe Caslon Pro': "'Adobe Caslon Pro'",
        'Bembo': "'Bembo'",
        'ITC Baskerville': "'ITC Baskerville'",
        'Minion Pro': "'Minion Pro'",
        'Garamond Premier Pro': "'Garamond Premier Pro'",
        'Franklin Gothic Medium': "'Franklin Gothic Medium'",
        'Janson': "'Janson'",
        'Futura': "'Futura'"

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

  ngOnInit() {

  }

  contentFormat(event): void {
    document.execCommand(event.action, false, event.value);
  }

  blurFunction(event) {
    if (!event.relatedTarget) {
      this.focusEvent = false;
    }
    this.updateSectionById();
  }
  updateSectionById() {
    let sectionText = this.editor.nativeElement.innerHTML;
    let projectid = this.projectID;
    let sectionid = this.sectionID;
    setTimeout(() => {
      this.store.dispatch(new UpdateSectionTitle({
        projectId: projectid,
        sectionId: sectionid,
        value: sectionText,
        sectionOpen: undefined
      }));
    }, 5000);
  }
  focusFunction(event) {
    this.focusEvent = true;
  }
}
