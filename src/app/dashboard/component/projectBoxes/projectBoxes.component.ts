import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-project-boxes',
  templateUrl: './projectBoxes.component.html',
  styleUrls: ['./projectBoxes.component.scss'],
})
export class ProjectBoxesComponent implements OnInit {
  buttonText;
  projectUrl;
  openDeletePopup:boolean = false;
  @Input() active: boolean;
  @Input() project: any;
  @Output()
  deleteProject = new EventEmitter();
  @Output()
  duplicateProject = new EventEmitter();
  @Output()
  updateProjectPhoto = new EventEmitter();

  constructor(private router: Router) {}
  ngOnInit() {
    if (this.project.uuid === environment.DEFAULT_FICTION_ID ||
      this.project.uuid === environment.DEFAULT_NON_FICTION_ID) {
      this.buttonText = 'Open demo';
      this.projectUrl = "/dashboard/projects/" + this.project.uuid + "?appcue=" + environment.APPCUSE_ID;
    } else {
      this.buttonText = 'Continue editing';
      this.projectUrl = `/dashboard/projects/${this.project.uuid}`;
    }
  }
  redirectToProject() {
    this.router.navigateByUrl(this.projectUrl);
  }
  _deleteProject(e, id): void {
    e.stopPropagation();
    this.deleteProject.emit(id);
  }
  _duplicateProject(e, id): void {
    e.stopPropagation();
    this.duplicateProject.emit(id);
  }
  _updateProjectImage(e, id): void {
    this.updateProjectPhoto.emit({ projectId: id, file: e.target.files[0] });
  }
  getDate(dateStr: string): any {
    return moment(dateStr)
      .format('MMM D, YY');

  }
  extractContent(s): string {
    const span = document.createElement('span');
    span.innerHTML = s;

    return span.textContent || span.innerText;
  }
}
