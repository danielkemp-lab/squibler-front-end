import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, selectSubSectionState } from '../../../store/app.states';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import {
  SubSectionAdd,
  SubSectionGetAll,
  SubSectionUpdate,
  SubSectionDelete,
} from '../../../store/actions/subsection.actions';

@Component({
  selector: 'app-sections',
  templateUrl: './subsections.component.html',
  styleUrls: ['./subsections.component.scss'],
})
export class SubSectionsComponent implements OnInit {
  openSubSectionPopup = false;
  getState: Observable<any>;
  getSectionState: Observable<any>;
  errorMessage: string;
  urlParams: any = {};
  subSectionList: any;
  deleteConfirmPopup: boolean;
  projectId: number;
  editOneSubSectionData: any;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.getSectionState = this.store.select(selectSubSectionState);
  }
  openSectionDialog(id) {
    this.subSectionList[id].opened = !this.subSectionList[id].opened;
  }
  editSubSection(section) {
    this.openSubSectionPopup = false;
    this.openSubSectionPopup = true;
    this.editOneSubSectionData = section;
  }
  onEditSubSectionSuccess(data) {
    this.route.params.subscribe(() => {
      data.projectId = this.urlParams.projectId;
      data.sectionId = this.urlParams.sectionId;
    });
    if (data.subSectionId) {
      this.store.dispatch(new SubSectionUpdate(data));
    } else {
      this.store.dispatch(new SubSectionAdd(data));
    }
  }
  showAddSubSectionPopup() {
    this.editOneSubSectionData = false;
    this.openSubSectionPopup = true;
  }
  onAddSectionCancel() {
    this.openSubSectionPopup = false;
  }
  onCancelSubSectionEditor() {
    this.openSubSectionPopup = false;
  }
  openDeleteConfirmPopup(subSection) {
    subSection.projectId = this.urlParams.projectId;
    this.deleteConfirmPopup = true;
    this.editOneSubSectionData = subSection;
  }
  deleteSubSection(data) {
    this.store.dispatch(new SubSectionDelete(data));
  }
  deleteConfirmPopupCancel() {
    this.deleteConfirmPopup = false;
  }
  ngOnInit() {
    const urlParamsSubscribe = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );
    urlParamsSubscribe.subscribe(routeParams => {
      this.urlParams.projectId = routeParams.projectId;
      this.urlParams.sectionId = routeParams.sectionId;
      this.urlParams.subsectionId = routeParams.subsectionsId;
      this.store.dispatch(new SubSectionGetAll(this.urlParams));
    });
    this.store.dispatch(new SubSectionGetAll(this.urlParams));
    this.getSectionState.subscribe(state => {
      this.openSubSectionPopup = false;
      if (state.subsections && state.subsections.length) {
        this.subSectionList = state.subsections;
      } else {
        this.subSectionList = false;
      }
      if (state.updated) {
        // this.store.dispatch(new ProjectGetAll('getThree'));
        this.store.dispatch(new SubSectionGetAll(this.urlParams));
        this.openSubSectionPopup = false;
        this.deleteConfirmPopup = false;
      }
      if (
        state.subsections &&
        this.urlParams.subsectionId &&
        state.subsections.length
      ) {
        const urlParamsFunc = this.urlParams;
        const selectedSubsection = state.subsections.find(function (obj) {
          return obj.id === Number(urlParamsFunc.subsectionId);
        });
        this.editSubSection(selectedSubsection);
      }
    });
  }
}
