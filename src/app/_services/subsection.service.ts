import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SubsectionService {
  constructor(private http: HttpClient) { }

  public getAllSubSections(section) {
    return this.http.get(
      `${environment.backUrl}/projects/${section.projectId}/sections/${
      section.sectionId
      }/sub-sections`,
      {
        headers: { Authorization: `JWT ${localStorage.token}` },
      }
    );
  }

  public addSubSection(subsections) {

    return this.http.post(
      `${environment.backUrl}/projects/${subsections[0].projectId}/sections/${
      subsections[0].sectionId
      }/sub-sections`,
      subsections
      ,
      {
        headers: { Authorization: `JWT ${localStorage.token}` },
      }
    );
  }

  public getOneSubSection(section) {
    return this.http.post(
      `${environment.backUrl}/projects/${section.projectId}/sections/${
      section.id
      }`,
      {
        title: section.input,
        description: section.textarea,
        copyright: 'Copyright',
        dedication: '-----',
      },
      {
        headers: { Authorization: `JWT ${localStorage.token}` },
      }
    );
  }

  public updateSubSection(section) {
    return this.http.put(
      `${environment.backUrl}/projects/${section.projectId}/sections/${
      section.sectionId
      }/sub-sections/${section.subsectionId}`,
      {
        title: section.label,
        start_point: 1,
      },
      {
        headers: { Authorization: `JWT ${localStorage.token}` },
      }
    );
  }

  public deleteSubSection(section) {
    return this.http.delete(
      `${environment.backUrl}/projects/${section.projectId}/sections/${
      section.sectionId
      }/sub-sections/${section.subsectionId}`,
      {
        headers: { Authorization: `JWT ${localStorage.token}` },
      }
    );
  }
}
