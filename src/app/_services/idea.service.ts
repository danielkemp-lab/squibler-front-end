import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class IdeaService {
  constructor(private http: HttpClient) { }

  getAllIdeas(id) {
    return this.http.get(
      `${environment.backUrl}/ideas${id ? '?project_id=' + id : ''}`,
      {
        headers: { Authorization: `JWT ${localStorage.token}` }
      }
    );
  }

  addIdea(idea) {

    return this.http.post(`${environment.backUrl}/ideas`, Array.isArray(idea) ? idea : [idea], {
      headers: { Authorization: `JWT ${localStorage.token}` }
    });
  }

  getOneIdea(section) {
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

  updateIdea(idea) {
    return this.http.put(`${environment.backUrl}/ideas/${idea.id}`, idea, {
      headers: { Authorization: `JWT ${localStorage.token}` }
    });
  }

  deleteIdea(idea) {
    return this.http.delete(`${environment.backUrl}/ideas/${idea.id}`, {
      headers: { Authorization: `JWT ${localStorage.token}` }
    });
  }
}
