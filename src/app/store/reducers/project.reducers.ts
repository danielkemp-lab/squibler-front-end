import { All, ProjectActionTypes } from '../actions/project.actions';
import _ from 'lodash';

export interface State {
  error: string | null;
  updated: boolean;
  created: boolean;
  newBoard: boolean;
  boarduuid: string;
  subsectionId: string;
  file: File;
  addVersion: boolean;
  updatedBoardOpened: boolean;
  updatedSectionOpened: boolean;
  project: any;
}

export let initialState: State = {
  error: undefined,
  updated: false,
  created: false,
  file: undefined,
  updatedSectionOpened: false,
  updatedBoardOpened: false,
  newBoard: false,
  boarduuid: '',
  addVersion: false,
  subsectionId: undefined,
  project: undefined
};

// tslint:disable-next-line:cyclomatic-complexity
export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ProjectActionTypes.INIT:
      {
        initialState = {
          ...state,
          file: undefined,
          updated: false,
          newBoard: false,
          addVersion: false,
          project: undefined
        };

        return initialState;
      }
    case ProjectActionTypes.INIT_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          updated: false,
          newBoard: false,
          addVersion: false,
          project: ((state.project)? state.project : action.payload.project)
        };

        return initialState;
      }
    case ProjectActionTypes.INIT_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDSECTION_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: false,
          newBoard: false,
          updated: true,
          updatedBoardOpened: false,
          project: {
            ...state.project,
            sectionsCount: state.project.sectionsCount + 1,
            sections: [...state.project.sections, action.payload.section]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDSECTION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDSUBSECTION_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        initialState = {
          ...state,
          file: undefined,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            subSectionsCount: state.project.subSectionsCount + 1,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                subSections: [...state.project.sections[sectionIndex].subSections, action.payload.subSection]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SUBSECTIONS_CLICK:
      {
        initialState = {
          ...state,
          subsectionId: action.payload.id
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDSUBSECTION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESECTION_SUCCESS:
      {
        const sections = state.project.sections.filter((obj: any) => obj.uuid !== action.payload.id);
        initialState = {
          ...state,
          file: undefined,
          updatedSectionOpened: false,
          updatedBoardOpened: false,
          newBoard: false,
          addVersion: false,
          updated: true,
          project: {
            ...state.project,
            sectionsCount: state.project.sectionsCount - 1,
            sections
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESECTION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESUBSECTION_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const subSections = state.project.sections[sectionIndex].subSections.filter((obj: any) => obj.uuid !== action.payload.subsectionId);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            subSectionsCount: state.project.subSectionsCount - 1,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                subSections
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESUBSECTION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESUMMARY_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          updatedBoardOpened: false,
          addVersion: false,
          updatedSectionOpened: false,
          updated: true,
          newBoard: false,
          project: {
            ...state.project,
            summary: action.payload.text
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESUMMARY_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATECONTENT_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: false,
          newBoard: false,
          updatedSectionOpened: false,
          updated: true,
          project: {
            ...state.project,
            content: action.payload.content
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATECONTENT_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        initialState = {
          ...state,
          file: undefined,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          addVersion: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                summary: action.payload.text
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONORDER_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
        };

        return initialState;

      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONORDER_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
        };

        return initialState;

      }
    case ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATETITLE_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          updatedBoardOpened: false,
          newBoard: false,
          updatedSectionOpened: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            title: action.payload.title
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATETITLE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                title: action.payload.title
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                text: action.payload.value
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const subsectionIndex = _.findIndex(state.project.sections[sectionIndex].subSections, ['uuid', action.payload.subsectionId]);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                subSections: [...state.project.sections[sectionIndex].subSections.slice(0, subsectionIndex),
                  {
                    ...state.project.sections[sectionIndex].subSections[subsectionIndex],
                    title: action.payload.value
                  },
                  ...state.project.sections[sectionIndex].subSections.slice(subsectionIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDBOARD_SUCCESS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: false,
          newBoard: true,
          updated: true,
          project: {
            ...state.project,
            boards: [...state.project.boards, action.payload.board]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDBOARD_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONADDBOARD_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        if (state.project.sections.length) {
          initialState = {
            ...state,
            file: undefined,
            updatedSectionOpened: action.payload.sectionOpen,
            updatedBoardOpened: false,
            newBoard: true,
            updated: true,
            addVersion: false,
            project: {
              ...state.project,
              sections: [...state.project.sections.slice(0, sectionIndex),
                {
                  ...state.project.sections[sectionIndex],
                  boards: [...state.project.sections[sectionIndex].boards, action.payload.board]
                },
                ...state.project.sections.slice(sectionIndex + 1)
              ]
            }
          };
        } else {
          initialState = {
            ...state,
            updatedBoardOpened: false,
            addVersion: false,
            updated: true
          };
        }

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONADDBOARD_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDNAME_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          file: undefined,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          addVersion: false,
          updated: true,
          project: {
            ...state.project,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                name: action.payload.name
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDNAME_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                color: action.payload.color,
                iconName: undefined
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDICON_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                iconName: action.payload.icon,
                color: undefined
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEBOARDICON_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    name: action.payload.name
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    color: action.payload.color,
                    iconName: undefined
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          addVersion: false,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    iconName: action.payload.icon,
                    color: undefined
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_FAILURE:
      {
        initialState = {
          ...state,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESECTIONBOARD_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boards = state.project.sections[sectionIndex].boards.filter((obj: any) => obj.uuid !== action.payload.boardId);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETESECTIONBOARD_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETEBOARD_SUCCESS:
      {
        const boards = state.project.boards.filter((obj: any) => obj.uuid !== action.payload.boardId);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            boards
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETEBOARD_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_BOARDADDNOTE_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          boarduuid: action.payload.boardId,
          updated: true,
          project: {
            ...state.project,
            notesCount: state.project.notesCount + 1,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                notes: [...state.project.boards[boardIndex].notes, action.payload.note]
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_BOARDADDNOTE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_SUCCESS:
      {
        console.log(action.payload.boardId);
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        initialState = {
          ...state,
          file: undefined,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          boarduuid: action.payload.boardId,
          addVersion: false,
          updated: true,
          project: {
            ...state.project,
            notesCount: state.project.notesCount + 1,

            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    notes: [...state.project.sections[sectionIndex].boards[boardIndex].notes, action.payload.note]
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        const notes = state.project.sections[sectionIndex].boards[boardIndex].notes.filter((obj: any) => obj.uuid !== action.payload.noteId);

        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            notesCount: state.project.notesCount - 1,

            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    notes
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_BOARDDELETENOTE_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        const notes = state.project.boards[boardIndex].notes.filter((obj: any) => obj.uuid !== action.payload.noteId);

        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            notesCount: state.project.notesCount - 1,

            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                notes
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_BOARDDELETENOTE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATENOTETITLE_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        const noteIndex = _.findIndex(state.project.boards[boardIndex].notes, ['uuid', action.payload.noteId]);

        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                notes: [...state.project.boards[boardIndex].notes.slice(0, noteIndex),
                  {
                    ...state.project.boards[boardIndex].notes[noteIndex],
                    title: action.payload.title
                  },
                  ...state.project.boards[boardIndex].notes.slice(noteIndex + 1)
                ]
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATENOTETITLE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        const noteIndex = _.findIndex(state.project.sections[sectionIndex].boards[boardIndex].notes, ['uuid', action.payload.noteId]);

        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          updatedSectionOpened: action.payload.sectionOpen,
          newBoard: false,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    notes: [...state.project.sections[sectionIndex].boards[boardIndex].notes.slice(0, noteIndex),
                      {
                        ...state.project.sections[sectionIndex].boards[boardIndex].notes[noteIndex],
                        title: action.payload.title
                      },
                      ...state.project.sections[sectionIndex].boards[boardIndex].notes.slice(noteIndex + 1)
                    ]
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATENOTETEXT_SUCCESS:
      {
        const boardIndex = _.findIndex(state.project.boards, ['uuid', action.payload.boardId]);
        const noteIndex = _.findIndex(state.project.boards[boardIndex].notes, ['uuid', action.payload.noteId]);

        initialState = {
          ...state,
          file: undefined,
          newBoard: false,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          updated: true,
          project: {
            ...state.project,
            boards: [...state.project.boards.slice(0, boardIndex),
              {
                ...state.project.boards[boardIndex],
                notes: [...state.project.boards[boardIndex].notes.slice(0, noteIndex),
                  {
                    ...state.project.boards[boardIndex].notes[noteIndex],
                    text: action.payload.text
                  },
                  ...state.project.boards[boardIndex].notes.slice(noteIndex + 1)
                ]
              },
              ...state.project.boards.slice(boardIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATENOTETEXT_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_SUCCESS:
      {
        const sectionIndex = _.findIndex(state.project.sections, ['uuid', action.payload.sectionId]);
        const boardIndex = _.findIndex(state.project.sections[sectionIndex].boards, ['uuid', action.payload.boardId]);
        const noteIndex = _.findIndex(state.project.sections[sectionIndex].boards[boardIndex].notes, ['uuid', action.payload.noteId]);

        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updatedBoardOpened: action.payload.boardOpen,
          newBoard: false,
          updatedSectionOpened: action.payload.sectionOpen,
          updated: true,
          project: {
            ...state.project,
            sections: [...state.project.sections.slice(0, sectionIndex),
              {
                ...state.project.sections[sectionIndex],
                boards: [...state.project.sections[sectionIndex].boards.slice(0, boardIndex),
                  {
                    ...state.project.sections[sectionIndex].boards[boardIndex],
                    notes: [...state.project.sections[sectionIndex].boards[boardIndex].notes.slice(0, noteIndex),
                      {
                        ...state.project.sections[sectionIndex].boards[boardIndex].notes[noteIndex],
                        text: action.payload.text
                      },
                      ...state.project.sections[sectionIndex].boards[boardIndex].notes.slice(noteIndex + 1)
                    ]
                  },
                  ...state.project.sections[sectionIndex].boards.slice(boardIndex + 1)
                ]
              },
              ...state.project.sections.slice(sectionIndex + 1)
            ]
          }
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_CLOSEBOARDS:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          updated: false,
          updatedBoardOpened: false
        };

        return initialState;
      }

    case ProjectActionTypes.PROJECT_EXPORT_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_EXPORT_SUCCESS:
      {
        initialState = {
          ...state,
          file: action.payload.file,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }

    case ProjectActionTypes.PROJECT_ADDVERSION_SUCCESS:
      {
        initialState = {
          ...state,
          newBoard: false,
          file: undefined,
          project: {
            ...state.project,
            related: action.payload.projects
          },
          addVersion: true,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_ADDVERSION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }

    case ProjectActionTypes.PROJECT_DELETEVERISON_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_DELETEVERSION_SUCCESS:
      {

        initialState = {
          ...state,
          newBoard: false,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }

    case ProjectActionTypes.PROJECT_UPDATEVERSION_FAILURE:
      {
        initialState = {
          ...state,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    case ProjectActionTypes.PROJECT_UPDATEVERSION_SUCCESS:
      {
        initialState = {
          ...state,
          newBoard: false,
          file: undefined,
          addVersion: false,
          error: action.payload.error
        };

        return initialState;
      }
    default:
      {
        return state;
      }
  }
}
