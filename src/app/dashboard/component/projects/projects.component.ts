import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { SegmentService } from 'ngx-segment-analytics'
import { environment } from '../../../../environments/environment';

import {
  GetProjects,
  ProjectCreate,
  ProjectDelete,
  ProjectDuplicate,
  UpdateProjectPhoto
} from '../../../store/actions/dashboard.actions';

import { AppState, selectDashboardState } from '../../../store/app.states';

@Component({
  selector: 'dashboard-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: any;
  loading: boolean;
  projectCreating = false;
  dashboardSubscription: Subscription;
  getDashboardState: Observable < any > ;
  errorMessage: string | null;
  projectId: string;
  confirmDeletePopup = false;
  constructor(
    private store: Store < AppState > ,
    private router: Router,
    private segment: SegmentService
  ) {
    this.getDashboardState = this.store.select(selectDashboardState);

  }
  ngOnInit(): void {
    this.segment.identify(localStorage.getItem('userId'), {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
    });
    this.loading = true;
    this.store.dispatch(new GetProjects({}));
    this.dashboardSubscription = this.getDashboardState.subscribe(state => {
      if (state.projects) {
        this.projects = state.projects || [];
        this.loading = false;
      }else{
        this.projects = [];
        this.loading = false;
      }

      if (state.projectCreated && this.projectCreating) {
        this.segment.track("Project created", {
          environment: environment.NAME,
          userId: localStorage.getItem('userId'),
          projectId: state.project.uuid
        });
        this.router.navigateByUrl(`/dashboard/projects/${state.project.uuid}`)
      };
    });

    this.segment.page("Projects", {
      environment: environment.NAME,
      userId: localStorage.getItem('userId'),
    });

  }
  ngOnDestroy(): void {
    this.dashboardSubscription.unsubscribe();
  }
  createProject(): void {
    this.projectCreating = true;
    this.store.dispatch(new ProjectCreate({}));
  }
  duplicateProject(projectId): void {
    this.store.dispatch(new ProjectDuplicate({ uuid: projectId }));
  }
  deleteProject(projectId): void {
    this.confirmDeletePopup = false;
    this.store.dispatch(new ProjectDelete({ uuid: projectId }));
  }
  updateProjectPhoto(props): void {
    if (props.file.size <= 10000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.store.dispatch(new UpdateProjectPhoto({ projectId: props.projectId, file: reader.result }));
      };
      reader.readAsDataURL(props.file);
    } else alert('FIle too big!');
  }
}
