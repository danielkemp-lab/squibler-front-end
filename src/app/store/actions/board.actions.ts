import { Action } from '@ngrx/store';

export enum BoardActionTypes {
    INIT = '[Board] - Init board',
    INIT_SUCCESS = '[Board] - Init success',
    INIT_FAILURE = '[Board] - Init failure',
    BOARD_UPDATENAME = '[Board] - Update board name',
    BOARD_UPDATENAME_SUCCESS = '[Board] - Update board name success',
    BOARD_UPDATENAME_FAILURE = '[Board] - Update board name failure',
    BOARD_DELETE = '[Board] - Delete board',
    BOARD_DELETE_SUCCESS = '[Board] - Delete board success',
    BOARD_DELETE_FAILURE = '[Board] - Delete board failure',
    BOARD_ADDNOTE = '[Board] - Add note',
    BOARD_ADDNOTE_SUCCESS = '[Board] - Add note success',
    BOARD_ADDNOTE_FAILURE = '[Board] - Add note failure',
    BOARD_DELETENOTE = '[Board] = Delete note',
    BOARD_DELETENOTE_SUCCESS = '[Board] - Delete note success',
    BOARD_DELETENOTE_FAILURE = '[Board] - Delete note failure',
    BOARD_UPDATENOTETITLE = '[Board] - Update note title',
    BOARD_UPDATENOTETITLE_SUCCESS = '[Board] - Update note title success',
    BOARD_UPDATENOTETITLE_FAILURE = '[Board] - Update note title failure',
    BOARD_UPDATENOTETEXT = '[Board] - Update note text',
    BOARD_UPDATENOTETEXT_SUCCESS = '[Board] - Update note text success',
    BOARD_UPDATENOTETEXT_FAILURE = '[Board] - Update note text failure',
    BOARD_ASSIGHN_TO_BOARD = '[Board] Board Assighn to Board',
    BOARD_ASSIGHN_TO_BOARD_SUCCESS = '[Board] Board Assighn to Success',
    BOARD_ASSIGHN_TO_BOARD_FAILURE = '[Board] Board Assighn to Failure',
    BOARD_COPY_TO_BOARD = '[Board] Board Copy to Board',
    BOARD_COPY_TO_BOARD_SUCCESS = '[Board] Board Copy to Success',
    BOARD_COPY_TO_BOARD_FAILURE = '[Board] Board Copy to Failure',
    BOARD_UPDATECOLOR = '[Board] - Update color',
    BOARD_UPDATECOLOR_SUCCESS = '[Board] - Update color success',
    BOARD_UPDATECOLOR_FAILURE = '[Board] - Update color failure',
    BOARD_UPDATEICON = '[Board] - Update icon',
    BOARD_UPDATEICON_SUCCESS = '[Board] - Update icon success',
    BOARD_UPDATEICON_FAILURE = '[Board] - Update icon failure'
}

export class Init implements Action {
    readonly type = BoardActionTypes.INIT;
    constructor(public payload: any) { }
}

export class InitSuccess implements Action {
    readonly type = BoardActionTypes.INIT_SUCCESS;
    constructor(public payload: any) { }
}

export class InitFailure implements Action {
    readonly type = BoardActionTypes.INIT_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateBoardName implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENAME;
    constructor(public payload: any) { }
}

export class UpdateBoardNameSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENAME_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateBoardNameFailure implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENAME_FAILURE;
    constructor(public payload: any) { }
}

export class DeleteBoard implements Action {
    readonly type = BoardActionTypes.BOARD_DELETE;
    constructor(public payload: any) { }
}

export class DeleteBoardSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_DELETE_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteBoardFailure implements Action {
    readonly type = BoardActionTypes.BOARD_DELETE_FAILURE;
    constructor(public payload: any) { }
}

export class AddNote implements Action {
    readonly type = BoardActionTypes.BOARD_ADDNOTE;
    constructor(public payload: any) { }
}

export class AddNoteSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_ADDNOTE_SUCCESS;
    constructor(public payload: any) { }
}

export class AddNoteFailure implements Action {
    readonly type = BoardActionTypes.BOARD_ADDNOTE_FAILURE;
    constructor(public payload: any) { }
}
export class DeleteNote implements Action {
    readonly type = BoardActionTypes.BOARD_DELETENOTE;
    constructor(public payload: any) { }
}

export class DeleteNoteSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_DELETENOTE_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteNoteFailure implements Action {
    readonly type = BoardActionTypes.BOARD_DELETENOTE_FAILURE;
    constructor(public payload: any) { }
}
export class UpdateNoteTitle implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETITLE;
    constructor(public payload: any) { }
}

export class UpdateNoteTitleSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETITLE_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateNoteTitleFailure implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETITLE_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateNoteText implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETEXT;
    constructor(public payload: any) { }
}

export class UpdateNoteTextSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETEXT_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateNoteTextFailure implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATENOTETEXT_FAILURE;
    constructor(public payload: any) { }
}

export class BoardAssighnToBoard implements Action {
    readonly type = BoardActionTypes.BOARD_ASSIGHN_TO_BOARD;
    constructor(public payload: any) { }
}

export class BoardAssighnToBoardSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_SUCCESS;
    constructor(public payload: any) { }
}

export class BoardAssighnToBoardFailure implements Action {
    readonly type = BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_FAILURE;
    constructor(public payload: any) { }
}

export class BoardCopyToBoard implements Action {
    readonly type = BoardActionTypes.BOARD_COPY_TO_BOARD;
    constructor(public payload: any) { }
}

export class BoardCopyToBoardSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_COPY_TO_BOARD_SUCCESS;
    constructor(public payload: any) { }
}

export class BoardCopyToBoardFailure implements Action {
    readonly type = BoardActionTypes.BOARD_COPY_TO_BOARD_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateBoardColor implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATECOLOR;
    constructor(public payload: any) { }
}

export class UpdateBoardColorSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATECOLOR_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateBoardColorFailure implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATECOLOR_FAILURE;
    constructor(public payload: any) { }
}
export class UpdateBoardIcon implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATEICON;
    constructor(public payload: any) { }
}

export class UpdateBoardIconSuccess implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATEICON_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateBoardIconFailure implements Action {
    readonly type = BoardActionTypes.BOARD_UPDATEICON_FAILURE;
    constructor(public payload: any) { }
}
export type All = Init
    | InitSuccess
    | InitFailure
    | UpdateBoardName
    | UpdateBoardNameSuccess
    | UpdateBoardNameFailure
    | DeleteBoard
    | DeleteBoardSuccess
    | DeleteBoardFailure
    | AddNote
    | AddNoteSuccess
    | AddNoteFailure
    | DeleteNote
    | DeleteNoteFailure
    | DeleteNoteSuccess
    | UpdateNoteTitle
    | UpdateNoteTitleSuccess
    | UpdateNoteTitleFailure
    | UpdateNoteText
    | UpdateNoteTextSuccess
    | UpdateNoteTextFailure
    | BoardAssighnToBoard
    | BoardAssighnToBoardSuccess
    | BoardAssighnToBoardFailure
    | BoardCopyToBoard
    | BoardCopyToBoardSuccess
    | BoardCopyToBoardFailure
    | UpdateBoardColor
    | UpdateBoardColorSuccess
    | UpdateBoardColorFailure
    | UpdateBoardIcon
    | UpdateBoardIconSuccess
    | UpdateBoardIconFailure;
