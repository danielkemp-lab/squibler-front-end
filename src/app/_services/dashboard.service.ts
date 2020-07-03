import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  constructor(private apollo: Apollo) { }

  init(): any {
    const clearCache = 0;

    return this.apollo
      .watchQuery({
        query: gql`
          query Dashboard {
            user{
              uuid,
              email,
              paymentInfo {
                cardNumber,
                userEmail,
                isActive,
                status,
                expMonth,
                expYear,
                currentPeriodEnd
              },
              createdByGoogle,
              profile {
                  photoUrl,
                name,
              },
            },
            projects {
              title,
              uuid,
              sectionsCount,
              subSectionsCount,
              notesCount,
              color,
              updatedAt,
              thumbnail,
              boards {
                uuid,
                name,
                notes {
                  text,
                  title,
                  uuid
                }
              },
              sections {
                uuid,
                title,
                boards {
                  uuid,
                  name
                }
              }
            },
            boards {
              uuid,
              name,
              color,
              iconName,
              notes {
                text,
                title,
                uuid
              }
            }
          }
        `
      })
      .result()
      
  }
  getProjects(): any {
    return this.apollo
      .watchQuery({
        query: gql`
          query Dashboard {
            projects {
              title,
              uuid,
              thumbnail,
              sectionsCount,
              subSectionsCount,
              notesCount,
              color,
              updatedAt,
            },
          }
        `
      })
      .valueChanges
      .pipe(map(result => result.data));
  }
  duplicateProject(payload): any {
    const { uuid } = payload;

    return this.apollo
      .mutate({
        mutation: gql`
          mutation duplicateProject{
            duplicateProject(uuid: "${uuid}") {
              ok,
              error,
              project {
                title,
                uuid,
                thumbnail,
                sectionsCount,
                subSectionsCount,
                notesCount,
                color,
                updatedAt,
              },
            }
          }
        `
      })
      .pipe(map(result => result.data.duplicateProject));
  }

  deleteProject(payload): any {
    const { uuid } = payload;

    return this.apollo
      .mutate({
        mutation: gql`
          mutation deleteProject{
            deleteProject(uuid: "${uuid}", deleteAll: true) {
              ok,
              error,
            }
          }
        `
      })
      .pipe(map(result => {

        result.data.deleteProject.id = uuid;

        return result.data.deleteProject;
      }
      ));
  }

  getBoards(payload): any {
    return this.apollo
      .watchQuery({
        query: gql`
          query getBoards {
            boards {
              uuid,
              name,
              color,
              iconName,
              notes {
                uuid
              }
            }
          }
        `
      })
      .valueChanges
      .pipe(
        map((result: any) => {
          return result.data;

        })
      );
  }

  createBoard(): any {
    return this.apollo
      .mutate({
        mutation: gql` mutation Boards {
          createOrUpdateBoards(name: ""){
            boardOutput {
              board {
                uuid,
                name,
                iconName,
                color,
                notes {
                  uuid,
                  title,
                  text,
                }
              }
            }
            ,ok
            ,error
          }
        }`
      })
      .pipe(map(result => result.data.createOrUpdateBoards));

  }

}
