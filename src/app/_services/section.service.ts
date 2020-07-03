import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SectionService {
  constructor(private http: HttpClient) { }

  getAllSections(section) {
    return this.http.get(
      `${
      environment.backUrl
      }/projects/${section}/sections?include_paragraphs=true`,
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  addSection(section) {
    return this.http.post(
      `${environment.backUrl}/projects/${section.projectId}/sections`,
      section,
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  getOneSection(section) {
    return this.http.post(
      `${environment.backUrl}/projects/${section.projectId}/sections/${
      section.id
      }`,
      {
        title: section.input,
        description: section.textarea,
        copyright: 'Copyright',
        dedication: '-----'
      },
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  updateSection(sections) {
    return this.http.post(
      `${environment.backUrl}/projects/${
      sections.PUT.sections[0].projectId
      }/sections`,
      sections,
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  deleteSection(section) {
    return this.http.post(
      `${environment.backUrl}/projects/${section[0].projectId}/sections`,
      {
        DELETE: {
          sections: [
            {
              id: section[0].id,
              ordering: section[0].ordering
            }
          ]
        }
      },
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }
}
