import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Apollo
} from 'apollo-angular';
import gql from 'graphql-tag';
import {
  Injectable
} from '@angular/core';
import {
  map
} from 'rxjs/operators';
import {
  environment
} from '../../environments/environment';

@Injectable()
export class ProjectService {
  constructor(private apollo: Apollo, private http: HttpClient) {}

  CreateProject(): any {
    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject {
         createOrUpdateProject(title: "", boards: [{name: "Notes"}, {name: "Research"}]) {
            ok,
            error,
            projectOutput {
              created,
              project {
                title,
                uuid,
                thumbnail,
                sectionsCount,
                subSectionsCount,
                notesCount,
                updatedAt,
                color,
              },
            }
          }
         }`
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  addVersion(payload): any {
    const {
      projectId,
      sectionId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation addNewVersion {
         addNewVersion(uuid: "${payload.uuid}") {
            ok,
            projects{
              uuid,
              title,
              createdAt
            },
            error,
          }
         }`
      })
      .pipe(map(result => result.data.addNewVersion));
  }
  addSection(payload): any {
    const {
      projectId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject {
         createOrUpdateProject(uuid: "${projectId}", sections: [{title: ""}]) {
            ok,
            error,
            projectOutput {
              created,
              sectionsOutput {
                section {
                  uuid,
                  title,
                  summary,
                  text,
                  subSections {
                    uuid,
                    title,
                  },
                  boards {
                    uuid,
                    name,
                    color,
                    iconName,
                    notes {
                      uuid,
                      title,
                      text
                    }
                  },
                }
              }
            }
          }
         }`
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }

  deleteVersion(payload): any {
    const { uuid } = payload;

    return this.apollo
      .mutate({
        mutation: gql `
          mutation deleteProject{
            deleteProject(uuid: "${payload.uuid}") {
              ok,
              error,
            }
          }
        `
      })
      .pipe(map(result =>
        result.data.deleteProject
      ));
  }

  exportProject(payload): any {
    const {
      id,
      format
    } = payload;

    return this.http
      .get(`${environment.backUrlImage}/export/${id}/${format}`, {
        headers: new HttpHeaders({
          Authorization: `JWT ${localStorage.token}`,
          'Content-Type': `application/${format}`
        }),
        responseType: 'blob'
      })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // ${ideas ? `, notes: [{ title: "${ideas.title}", text:"${ideas.text}"}]` : ''}

  addBoard(payload): any {
    const { projectId, name, ideas, copy } = payload;

    return this.apollo
      .mutate({
        mutation: gql `
        mutation CreateOrUpdateProject {
         ${(ideas && copy === 'moveTo') ? `
             deleteNote(uuid: "${ideas.uuid}") {
                 ok,
                 error,
             },` : ''}
         createOrUpdateProject(uuid: "${projectId}", boards: [{name: "${name ? name : ''}" ${ideas ? `, notes: [{ title: "${ideas.title}", text:"${ideas.text}"}]` : ''}  }]) {
            ok,
            error,
            projectOutput {
              created,
              boardsOutput {
                board {
                  uuid,
                  name,
                  iconName,
                  color,
                  notes {
                    uuid,
                    title,
                    text
                  }
                }
              }
            }
          }
         }`
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }

  sectionAddBoard(payload): any {
    const { projectId, sectionId, name, ideas, copy } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject {
          ${(ideas && copy === 'moveTo') ? `
          deleteNote(uuid: "${ideas.uuid}") {
              ok,
              error,
          },` : ''}
         createOrUpdateProject(uuid: "${projectId}", sections: {uuid: "${sectionId}", boards: [{name: "${name ? name : ''}" ${ideas ? `, notes: [{ title: "${ideas.title}", text:"${ideas.text}"}]` : ''}  }]     }   ) {
            ok,
            error,
            projectOutput {
              created,
              sectionsOutput {
                boardsOutput {
                  board {
                    uuid,
                    name,
                    iconName,
                    color,
                    notes {
                      uuid,
                      title,
                      text
                    }
                  }
                }
              }
            }
          }
         }`
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  addSubsection(payload): any {
    const {
      projectId,
      sectionId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject {
         createOrUpdateProject(uuid: "${projectId}",  sections: [{ uuid: "${sectionId}", subSections: [{title: ""}] }]) {
            ok,
            error,
            projectOutput {
              created,
              sectionsOutput {
                subSectionsOutput {
                  subSection {
                    uuid,
                    title,
                  },
                },
              },
            },
          }
         }`
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }

  deleteSubsection(payload): any {
    const {
      sectionId,
      subsectionId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation DeleteSubSection {
        deleteSubSection(uuid: "${subsectionId}") {
            ok,
            error,
          }
         }`
      })
      .pipe(map(result => result.data.deleteSubSection));
  }
  deleteSection(payload): any {
    const {
      sectionId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation DeleteSection {
        deleteSection(uuid: "${sectionId}") {
            ok,
            error,
          }
         }`
      })
      .pipe(map(result => result.data.deleteSection));
  }

  updateProjectSummary(payload): any {
    const {
      projectId,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($summary: String) {
         createOrUpdateProject(uuid: "${projectId}", summary: $summary) {
            ok,
            error,
          }
         }`,
        variables: {
          summary: text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateProjectContent(payload): any {
    const {
      projectId,
      content
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($content: String) {
         createOrUpdateProject(uuid: "${projectId}", content: $content) {
            ok,
            error,
          }
         }`,
        variables: {
          content
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateProjectPhoto(payload): any {
    const {
      projectId,
      file
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($file: Upload!) {
         createOrUpdateProject(uuid: "${projectId}", file: $file) {
            ok,
            error,
            projectOutput {
              project {
                thumbnail
              }
            }
          }
         }`,
        variables: {
          file
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateProjectTitle(payload): any {
    const {
      projectId,
      value
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String) {
         createOrUpdateProject(uuid: "${projectId}", title: $title) {
            ok,
            error,
          }
         }`,
        variables: {
          title: value
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionTitle(payload): any {
    const {
      projectId,
      sectionId,
      value
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String) {
         createOrUpdateProject(uuid: "${projectId}", sections:[{uuid: "${sectionId}", title: $title}]) {
            ok,
            error,
          }
         }`,
        variables: {
          title: value
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSubsectionTitle(payload): any {
    const {
      projectId,
      sectionId,
      subsectionId,
      value
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String) {
         createOrUpdateProject(uuid: "${projectId}", sections:[{
                uuid: "${sectionId}",
                subSections: [{
                  uuid: "${subsectionId}",
                  title: $title
                }]
            }]) {
            ok,
            error,
          }
         }`,
        variables: {
          title: value
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionSummary(payload): any {
    const {
      projectId,
      sectionId,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($summary: String) {
         createOrUpdateProject(uuid: "${projectId}",sections: [{ uuid: "${sectionId}", summary: $summary }]) {
            ok,
            error,
          }
         }`,
        variables: {
          summary: text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionOrder(payload): any {
    const {
      projectId,
      sectionId,
      order
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($order: Int) {
         createOrUpdateProject(uuid: "${projectId}",sections: [{ uuid: "${sectionId}", ordering: $order }]) {
            ok,
            error,
          }
         }`,
        variables: {
          order
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSubSectionOrder(payload): any {
    const {
      projectId,
      sectionId,
      subsectionId,
      order
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($order: Int) {
         createOrUpdateProject(uuid: "${projectId}",sections: [{ uuid: "${sectionId}",  subSections: [{
                  uuid: "${subsectionId}",
                  ordering: $order
                }] }]) {
            ok,
            error,
          }
         }`,
        variables: {
          order
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionText(payload): any {
    const {
      projectId,
      sectionId,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($text: String) {
         createOrUpdateProject(uuid: "${projectId}",sections: [{ uuid: "${sectionId}", text: $text }]) {
            ok,
            error,
          }
         }`,
        variables: {
          text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }

  updateBoardName(payload): any {
    const {
      projectId,
      boardId,
      name
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($name: String) {
         createOrUpdateProject(uuid: "${projectId}", boards: [{ uuid: "${boardId}", name: $name }]) {
            ok,
            error,
          }
         }`,
        variables: {
          name
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateBoardColor(payload): any {
    const {
      projectId,
      boardId,
      color
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($color: String) {
         createOrUpdateProject(uuid: "${projectId}", boards: [{ uuid: "${boardId}", color: $color }]) {
            ok,
            error,
          }
         }`,
        variables: {
          color
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateBoardIcon(payload): any {
    const {
      projectId,
      boardId,
      icon
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($icon: String) {
         createOrUpdateProject(uuid: "${projectId}", boards: [{ uuid: "${boardId}", iconName: $icon }]) {
            ok,
            error,
          }
         }`,
        variables: {
          icon
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionBoardName(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      name
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($name: String) {
         createOrUpdateProject(uuid: "${projectId}", sections: [{uuid: "${sectionId}", boards: [{ uuid: "${boardId}", name: $name }]}]) {
            ok,
            error,
          }
         }`,
        variables: {
          name
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionBoardColor(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      color
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($color: String) {
         createOrUpdateProject(uuid: "${projectId}", sections: [{uuid: "${sectionId}", boards: [{ uuid: "${boardId}", color: $color }]}]) {
            ok,
            error,
          }
         }`,
        variables: {
          color
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateSectionBoardIcon(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      icon
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($icon: String) {
         createOrUpdateProject(uuid: "${projectId}", sections: [{uuid: "${sectionId}", boards: [{ uuid: "${boardId}", iconName: $icon }]}]) {
            ok,
            error,
          }
         }`,
        variables: {
          icon
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  deleteBoard(payload): any {
    const {
      boardId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation DeleteBoard {
                    deleteBoard(uuid: "${boardId}") {
                        ok,
                        error,
                    }
                    }`
      })
      .pipe(map(result => result.data.deleteBoard));
  }

  boardAddNote(payload): any {
    const {
      projectId,
      boardId,
      title,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String, $text: String) {
                    createOrUpdateProject(uuid: "${projectId}", boards: [{uuid: "${boardId}", notes: [{title: $title, text: $text}]}]) {
                        ok,
                        error,
                        projectOutput {
                          boardsOutput {
                            notesOutput {
                                note {
                                    uuid,
                                    title,
                                    text
                                }
                            }
                        }
                        }
                    }
                    }`,
        variables: {
          title,
          text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateNoteTitle(payload): any {
    const {
      projectId,
      boardId,
      noteId,
      title
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String) {
                    createOrUpdateProject(uuid: "${projectId}",
                    boards: [{uuid: "${boardId}", notes: [{uuid: "${noteId}", title: $title}]}]) {
                        ok,
                        error,
                    }
                    }`,
        variables: {
          title
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  sectionUpdateNoteTitle(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      noteId,
      title
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String) {
                    createOrUpdateProject(uuid: "${projectId}",
                    sections: [{uuid: "${sectionId}", boards: [{uuid: "${boardId}", notes: [{uuid: "${noteId}", title: $title}]}]}]) {
                        ok,
                        error,
                    }
                    }`,
        variables: {
          title
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  updateNoteText(payload): any {
    const {
      projectId,
      boardId,
      noteId,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($text: String) {
                    createOrUpdateProject(uuid: "${projectId}",
                    boards: [{uuid: "${boardId}", notes: [{uuid: "${noteId}", text: $text}]}]) {
                        ok,
                        error,
                    }
                    }`,
        variables: {
          text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  sectionUpdateNoteText(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      noteId,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($text: String) {
                    createOrUpdateProject(uuid: "${projectId}",
                    sections: [{uuid: "${sectionId}", boards: [{uuid: "${boardId}", notes: [{uuid: "${noteId}", text: $text}]}]}]) {
                        ok,
                        error,
                    }
                    }`,
        variables: {
          text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  sectionBoardAddNote(payload): any {
    const {
      projectId,
      sectionId,
      boardId,
      title,
      text
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation CreateOrUpdateProject($title: String, $text: String) {
                    createOrUpdateProject(uuid: "${projectId}",
                    sections: [{uuid: "${sectionId}", boards: [{uuid: "${boardId}", notes: [{title: $title, text: $text}]}]}]) {
                        ok,
                        error,
                        projectOutput {
                          sectionsOutput {
                            boardsOutput {
                              notesOutput {
                                note {
                                    uuid,
                                    title,
                                    text
                                }
                              }
                            }
                          }
                        }
                    }
                    }`,
        variables: {
          title,
          text
        }
      })
      .pipe(map(result => result.data.createOrUpdateProject));
  }
  deleteNote(payload): any {
    const {
      noteId
    } = payload;

    return this.apollo
      .mutate({
        mutation: gql ` mutation DeleteNote {
                    deleteNote(uuid: "${noteId}") {
                        ok,
                        error,
                    }
                    }`
      })
      .pipe(map(result => result.data.deleteNote));
  }
  init(payload): any {
    const {
      uuid
    } = payload;

    return this.apollo
      .watchQuery({
        query: gql `
          query Project {
            project(uuid: "${uuid}") {
              uuid,
              title,
              summary,
              content,
              createdAt,
              updatedAt,
              thumbnail,
              sectionsCount,
              subSectionsCount,
              notesCount,
              related {
                uuid,
                title,
                createdAt,
                updatedAt
              },
              boards {
                uuid,
                name,
                iconName,
                color,
                notes {
                  uuid,
                  title,
                  text,
                }
              },
              sections {
                uuid,
                title,
                summary,
                text,
                subSections {
                  uuid,
                  title,
                },
                boards {
                  uuid,
                  name,
                  notes {
                    uuid,
                    title,
                    text,
                  }
                },
              },
            },
          }
        `
      })
      .valueChanges
      .pipe(map(result => result.data));
  }
}
