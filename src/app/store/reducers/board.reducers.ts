import { All, BoardActionTypes } from "../actions/board.actions";
import _ from "lodash";
export interface State {
  board: any;
  error: string | null;
  updated: boolean;
  deleted: boolean;
  created: boolean;
  deleteNote: boolean;
  boardInitSuccess: boolean;
  boardAssighnToBoard: boolean;
  boardCopyToBoard: boolean;
}

export let initialState: State = {
  board: {
    icon: "",
    color: "",
    uuid: "",
    name: "",
    notes: []
  },
  error: undefined,
  updated: false,
  created: true,
  boardInitSuccess: false,
  boardAssighnToBoard: false,
  boardCopyToBoard: true,
  deleted: false,
  deleteNote: false
};

// tslint:disable-next-line:cyclomatic-complexity
export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case BoardActionTypes.INIT: {
      initialState = {
        ...state,
        deleted: false,
        updated: false,
        boardAssighnToBoard: false,
        deleteNote: false,
        boardCopyToBoard: false
      };

      return initialState;
    }
    case BoardActionTypes.INIT_SUCCESS: {
      initialState = {
        ...state,
        board: action.payload.board,
        error: undefined,
        boardInitSuccess: true,
        boardAssighnToBoard: false,
        updated: false,
        boardCopyToBoard: false,
        deleted: false,
        deleteNote: false
      };

      return initialState;
    }
    case BoardActionTypes.INIT_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        error: action.payload.error,
        boardCopyToBoard: false,
        deleteNote: false
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENAME_SUCCESS: {
      initialState = {
        ...state,
        board: {
          ...state.board,
          name: action.payload.name
        },
        error: undefined,
        updated: true,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        deleted: false,
        boardCopyToBoard: false,
        deleteNote: false
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENAME_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        error: action.payload.error,
        deleteNote: false
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_DELETE_SUCCESS: {
      initialState = {
        ...state,
        updated: false,
        deleted: true,
        boardInitSuccess: false,
        boardAssighnToBoard: false,
        deleteNote: false,
        boardCopyToBoard: false,
        board: {
          uuid: "",
          name: "",
          notes: []
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_DELETE_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_ADDNOTE_SUCCESS: {
      initialState = {
        ...state,
        updated: true,
        boardInitSuccess: false,
        boardAssighnToBoard: false,
        deleteNote: false,
        boardCopyToBoard: false,
        deleted: false,
        board: {
          ...state.board,
          notes: [...state.board.notes, action.payload.note]
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_ADDNOTE_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_DELETENOTE_SUCCESS: {
      const notes = state.board.notes.filter(
        (obj: any) => obj.uuid !== action.payload.noteId
      );
      initialState = {
        ...state,
        updated: true,
        boardInitSuccess: false,
        boardAssighnToBoard: false,
        deleted: false,
        boardCopyToBoard: false,
        board: {
          ...state.board,
          notes
        },
        deleteNote: true
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_DELETENOTE_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENOTETITLE_SUCCESS: {
      const noteIndex = _.findIndex(state.board.notes, [
        "uuid",
        action.payload.noteId
      ]);

      initialState = {
        ...state,
        updated: true,
        boardInitSuccess: false,
        deleteNote: false,
        deleted: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        board: {
          ...state.board,
          notes: [
            ...state.board.notes.slice(0, noteIndex),
            {
              ...state.board.notes[noteIndex],
              title: action.payload.title
            },
            ...state.board.notes.slice(noteIndex + 1)
          ]
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENOTETITLE_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENOTETEXT_SUCCESS: {
      const noteIndex = _.findIndex(state.board.notes, [
        "uuid",
        action.payload.noteId
      ]);

      initialState = {
        ...state,
        updated: true,
        deleteNote: false,
        boardInitSuccess: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        deleted: false,
        board: {
          ...state.board,
          notes: [
            ...state.board.notes.slice(0, noteIndex),
            {
              ...state.board.notes[noteIndex],
              text: action.payload.text
            },
            ...state.board.notes.slice(noteIndex + 1)
          ]
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATENOTETEXT_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_SUCCESS: {
      return {
        ...state,
        board: {
          ...state.board,
          output: action.payload.user
        },
        created: true,
        updated: true,
        deleted: true,
        deleteNote: false,
        boardInitSuccess: false,
        error: undefined,
        boardAssighnToBoard: true,
        boardCopyToBoard: false
      };
    }
    case BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_FAILURE: {
      return {
        ...state,
        created: false,
        deleteNote: false,
        boardAssighnToBoard: false,
        boardInitSuccess: false,
        updated: false,
        boardCopyToBoard: false,
        error: "Incorrect email and/or password."
      };
    }
    case BoardActionTypes.BOARD_COPY_TO_BOARD_SUCCESS: {
      return {
        ...state,
        board: {
          ...state.board,
          output: action.payload.user
        },
        created: true,
        updated: true,
        deleted: true,
        deleteNote: false,
        boardInitSuccess: false,
        error: undefined,
        boardCopyToBoard: true,
        boardAssighnToBoard: false
      };
    }
    case BoardActionTypes.BOARD_COPY_TO_BOARD_FAILURE: {
      return {
        ...state,
        created: false,
        deleteNote: false,
        boardInitSuccess: false,
        updated: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        error: "Incorrect email and/or password."
      };
    }
    case BoardActionTypes.BOARD_UPDATECOLOR_SUCCESS: {
      initialState = {
        ...state,
        updated: true,
        deleteNote: false,
        deleted: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        board: {
          ...state.board,
          color: action.payload.color,
          iconName: undefined
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATECOLOR_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        boardAssighnToBoard: false,
        deleteNote: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATEICON_SUCCESS: {
      initialState = {
        ...state,
        updated: true,
        deleteNote: false,
        deleted: false,
        boardAssighnToBoard: false,
        boardCopyToBoard: false,
        board: {
          ...state.board,
          color: undefined,
          iconName: action.payload.icon
        }
      };

      return initialState;
    }
    case BoardActionTypes.BOARD_UPDATEICON_FAILURE: {
      initialState = {
        ...state,
        updated: false,
        boardAssighnToBoard: false,
        deleteNote: false,
        boardCopyToBoard: false,
        error: action.payload.error
      };

      return initialState;
    }
    default: {
      return state;
    }
  }
}
