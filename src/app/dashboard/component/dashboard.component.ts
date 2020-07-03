import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectDashboardState, selectProjectState } from '../../store/app.states';
import { Router } from '@angular/router';
import { ProjectExport } from '../../store/actions/project.actions';
import {GetProjects, Init} from '../../store/actions/dashboard.actions';
import { SegmentService } from 'ngx-segment-analytics';
import { environment } from '../../../environments/environment';
import {TrialService} from "../../_services/trial.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  file;
  exportedTitle = '';
  format = '';
  menuOpen = true;
  projects = [];
  exportPopup = false;
  trialExpired = false;
  dashboardSubscription: Subscription;
  getDashboardState: Observable<any>;
  projectSubscription: Subscription;
  getProjectState: Observable<any>;
  projectId: string;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private segment: SegmentService,
    private trailService: TrialService
  ) {
    this.getDashboardState = this.store.select(selectDashboardState);
    this.getProjectState = this.store.select(selectProjectState);

    this.trailService.openTrialGet().subscribe((res: any) => {
      if (this.router.url !== '/dashboard/profile'){
        this.trialExpired = res.trialExpired;
      }
      localStorage.paymentStatus = 'inactive';
    });
  }

  ngOnInit(): void {
    this.segment.identify(localStorage.getItem('userId'), {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
    });
    this.checkExpired();
    const regexp = /\/dashboard\/projects\/.+/;
    this.menuOpen = !(regexp.test(this.router.url));
    this.store.dispatch(new Init({}));
    this.dashboardSubscription = this.getDashboardState.subscribe(state => {
      if (state.projects)
        this.projects = state.projects || [];
      else
        this.projects = [];
    });
    this.projectSubscription = this.getProjectState.subscribe(state => {
      if (state.project)
        this.projectId = state.project.id;
      if (state.file) {
        this.file = state.file;
        this.saveExportedFile();
      }
    });
  }
  ngOnDestroy(): void {
    this.dashboardSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }
  routeChange(): void {
    this.checkExpired();
    const regexp = /\/dashboard\/projects\/.+/;
    this.menuOpen = !(regexp.test(this.router.url));
  }

  checkExpired(): void {
    if (localStorage.paymentStatus === 'inactive') {
      this.trialExpired = !(this.router.url === '/dashboard/profile');
    }
  }
  exportProject(project, format): void {
    this.segment.track('Export project', {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: project.id
    });
    this.exportedTitle = project.title;
    this.format = format;
    this.store.dispatch(new ProjectExport({ id: project.uuid, format }));

  }
  saveExportedFile(): void {
    const url = window.URL.createObjectURL(this.file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `${this.exportedTitle ? this.exportedTitle : 'project'}.${this.format}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    this.exportedTitle = '';
    this.format = '';
    this.segment.track('Export project saved', {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: this.projectId,
      projectTitle: this.exportedTitle,
      projectFileFormat: this.format
    });
  }

  clickOnElement(elementName, pageName): void {
    this.segment.track(`Click on ${elementName}:${pageName}`, {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
      projectId: this.projectId
    });
  }
}
