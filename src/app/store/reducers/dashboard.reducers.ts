import { All, DashboardActionTypes } from "../actions/dashboard.actions";
import _ from "lodash";
export interface State {
  boards: Array < Object > | null;
  projects: Array < Object > | null;
  user: Object;
  initSuccess: boolean;
  project: Object;
  error: string | null;
  newBoard: boolean;
  userUpdated: boolean;
  projectCreated: boolean;
  initLoaded: boolean;
}

export const initialState: State = {
  user: undefined,
  projects: undefined,
  initSuccess: true,
  boards: [],
  error: undefined,
  project: undefined,
  newBoard: false,
  userUpdated: false,
  projectCreated: false,
  initLoaded: false
};
// tslint:disable-next-line:cyclomatic-complexity
export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case DashboardActionTypes.INIT:
      {
        return {
          ...state,
          user: action.payload.user,
          initSuccess: true,
          projects: action.payload.projects,
          boards: action.payload.boards,
          projectCreated: false,
          project: undefined,
          initLoaded: false
        };
      }
    case DashboardActionTypes.INIT_SUCCESS:
      {
        return {
          ...state,
          user: action.payload.user,
          initSuccess: true,
          projects: action.payload.projects,
          boards: action.payload.boards,
          projectCreated: false,
          project: undefined,
          initLoaded: true
        };
      }
    case DashboardActionTypes.INIT_FAILURE:
      {
        return {
          ...state,
          error: action.payload.error
        };
      }
    case DashboardActionTypes.BOARD_ADD_SUCCESS:
      {
        return {
          ...state,
          newBoard: true,
          boards: [...state.boards, action.payload.boardOutput.board]
        };
      }
    case DashboardActionTypes.USER_UPDATE:
      {
        return {
          ...state,
          error: action.payload.error,
          userUpdated: false
        };
      }
    case DashboardActionTypes.USER_UPDATE_SUCCESS:
      {
        return {
          ...state,
          error: action.payload.erorr,
          userUpdated: true,
          user: action.payload.user
        };
      }
    case DashboardActionTypes.USER_UPDATE_FAILURE:
      {
        return {
          ...state,
          error: action.payload.error
        };
      }
    case DashboardActionTypes.PROJECT_CREATE:
      {
        return {
          ...state,
          project: undefined,
          projectCreated: false
        };
      }
    case DashboardActionTypes.PROJECT_UPDATEPHOTO_SUCCESS:
      {
        const projectIndex = _.findIndex(state.projects, [
          "uuid",
          action.payload.projectId
        ]);

        return {
          ...state,
          project: undefined,
          projectCreated: false,
          projects: [
            ...state.projects.slice(0, projectIndex),
            {
              ...state.projects[projectIndex],
              thumbnail: action.payload.thumbnail
            },
            ...state.projects.slice(projectIndex + 1)
          ]
        };
      }
    case DashboardActionTypes.PROJECT_UPDATEPHOTO_FAILURE:
      {
        return {
          ...state,
          project: undefined,
          projectCreated: false,
          error: action.payload.error
        };
      }
    case DashboardActionTypes.PROJECT_CREATE_SUCCESS:
      {
        return {
          ...state,
          project: action.payload.projectOutput.project,
          projectCreated: action.payload.projectOutput.created,
          projects: [...state.projects, action.payload.projectOutput.project]
        };
      }
    case DashboardActionTypes.PROJECT_CREATE_FAILURE:
      {
        return {
          ...state,
          project: undefined,
          projectCreated: false
        };
      }
    case DashboardActionTypes.PROJECT_DUPLICATE_SUCCESS:
      {
        return {
          ...state,
          projects: [...state.projects, action.payload.project]
        };
      }
    case DashboardActionTypes.PROJECT_DUPLICATE_FAILURE:
      {
        return {
          ...state,
          error: action.payload.error
        };
      }
    case DashboardActionTypes.PROJECT_DELETE_SUCCESS:
      {
        const projects = state.projects.filter(
          (obj: any) => obj.uuid !== action.payload.id
        );

        return {
          ...state,
          projects
        };
      }
    case DashboardActionTypes.PROJECT_DELETE_FAILURE:
      {
        return {
          ...state,
          error: action.payload.erorr
        };
      }
    case DashboardActionTypes.BOARD_UPDATENAME:
      {
        const boardIndex = _.findIndex(state.boards, [
          "uuid",
          action.payload.boardId
        ]);
        if (state.boards)
          return {
            ...state,
            boards: [
              ...state.boards.slice(0, boardIndex),
              {
                ...state.boards[boardIndex],
                name: action.payload.name
              },
              ...state.boards.slice(boardIndex + 1)
            ]
          };
      }
    case DashboardActionTypes.BOARD_UPDATECOLOR:
      {
        const boardIndex = _.findIndex(state.boards, [
          "uuid",
          action.payload.boardId
        ]);
        if (state.boards)
          return {
            ...state,
            boards: [
              ...state.boards.slice(0, boardIndex),
              {
                ...state.boards[boardIndex],
                color: action.payload.color,
                iconName: undefined
              },
              ...state.boards.slice(boardIndex + 1)
            ]
          };
      }
    case DashboardActionTypes.BOARD_UPDATEICON:
      {
        const boardIndex = _.findIndex(state.boards, [
          "uuid",
          action.payload.boardId
        ]);
        if (state.boards)
          return {
            ...state,
            boards: [
              ...state.boards.slice(0, boardIndex),
              {
                ...state.boards[boardIndex],
                color: undefined,
                iconName: action.payload.icon
              },
              ...state.boards.slice(boardIndex + 1)
            ]
          };
      }
    case DashboardActionTypes.BOARD_DELETE:
      {
        let boards = state.boards;
        if (state.boards)
          boards = state.boards.filter(
            (obj: any) => obj.uuid !== action.payload.boardId
          );

        return {
          ...state,
          boards
        };
      }
    case DashboardActionTypes.DASHBOARD_GETPROJECTS_SUCCESS:
      {
        return {
          ...state,
          projects: action.payload.projects
        };
      }
    case DashboardActionTypes.DASHBOARD_GETPROJECTS_FAILURE:
      {
        return {
          ...state,
          error: action.payload.error
        };
      }
    default:
      {
        return state;
      }
  }
}
