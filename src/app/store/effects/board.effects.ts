import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { forwardRef, Injectable, NgModule } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { BoardService } from '../../_services';
import {
    AddNote,
    AddNoteFailure,
    AddNoteSuccess,
    BoardActionTypes,
    BoardAssighnToBoard,
    BoardAssighnToBoardFailure,
    BoardAssighnToBoardSuccess,
    BoardCopyToBoard,
    BoardCopyToBoardFailure,
    BoardCopyToBoardSuccess,
    DeleteBoard,
    DeleteBoardFailure,
    DeleteBoardSuccess,
    DeleteNote,
    DeleteNoteFailure,
    DeleteNoteSuccess,
    Init,
    InitFailure,
    InitSuccess,
    UpdateBoardColor,
    UpdateBoardColorFailure,
    UpdateBoardColorSuccess,
    UpdateBoardIcon,
    UpdateBoardIconFailure,
    UpdateBoardIconSuccess,
    UpdateBoardName,
    UpdateBoardNameFailure,
    UpdateBoardNameSuccess,
    UpdateNoteText,
    UpdateNoteTextFailure,
    UpdateNoteTextSuccess,
    UpdateNoteTitle,
    UpdateNoteTitleFailure,
    UpdateNoteTitleSuccess
} from '../actions/board.actions';
import { DeleteListBoard, UpdateListBoardColor, UpdateListBoardIcon, UpdateListBoardName } from '../actions/dashboard.actions';

@Injectable()
export class BoardEffects {

    @Effect()
    Init: Observable<any> = this.actions
        .ofType(BoardActionTypes.INIT)
        .map((action: Init) => action.payload)
        .switchMap(payload => {
            return this.boardService.init(payload)
                .then(responseData => {
                    const { data } = responseData;
                    if (data) return new InitSuccess(data);
                    else return new InitFailure({ error: 'Error!' });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    InitSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.INIT_SUCCESS)
    );

    @Effect({ dispatch: false })
    InitFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.INIT_FAILURE)
    );

    @Effect()
    UpdateBoardName: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_UPDATENAME)
        .map((action: UpdateBoardName) => action.payload)
        .switchMap(payload => {
            return this.boardService.updateBoardName(payload)
                .mergeMap(data => {
                    if (data.ok) return [new UpdateBoardNameSuccess({ name: payload.value }),
                    new UpdateListBoardName({ boardId: payload.boardId, name: payload.value })];
                    else return new UpdateBoardNameFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    UpdateBoardNameSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENAME_SUCCESS)
    );

    @Effect({ dispatch: false })
    UpdateBoardNameFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENAME_FAILURE)
    );

    @Effect()
    DeleteBoard: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_DELETE)
        .map((action: DeleteBoard) => action.payload)
        .switchMap(payload => {
            return this.boardService.deleteBoard(payload)
                .mergeMap(data => {
                    if (data.ok) return [new DeleteBoardSuccess({}),
                    new DeleteListBoard({ boardId: payload.boardId })];
                    else return new DeleteBoardFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    DeleteBoardSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_DELETE_SUCCESS)
    );

    @Effect({ dispatch: false })
    DeleteBoardFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_DELETE_FAILURE)
    );
    @Effect()
    AddNote: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_ADDNOTE)
        .map((action: AddNote) => action.payload)
        .switchMap(payload => {
            return this.boardService.addNote(payload)
                .map(data => {
                    if (data.ok) return new AddNoteSuccess({ note: data.boardOutput.notesOutput[0].note });
                    else return new AddNoteFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    AddNoteSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ADDNOTE_SUCCESS)
    );

    @Effect({ dispatch: false })
    AddNoteFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ADDNOTE_FAILURE)
    );

    @Effect()
    DeleteNote: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_DELETENOTE)
        .map((action: DeleteNote) => action.payload)
        .switchMap(payload => {
            return this.boardService.deleteNote(payload)
                .map(data => {
                    if (data.ok) return new DeleteNoteSuccess({ noteId: payload.noteId });
                    else return new DeleteNoteFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    DeleteNoteSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_DELETENOTE_SUCCESS)
    );

    @Effect({ dispatch: false })
    DeleteNoteFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_DELETENOTE_FAILURE)
    );

    @Effect()
    UpdateNoteTitle: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_UPDATENOTETITLE)
        .map((action: UpdateNoteTitle) => action.payload)
        .switchMap(payload => {
            return this.boardService.updateNoteTitle(payload)
                .map(data => {
                    if (data.ok) return new UpdateNoteTitleSuccess({ noteId: payload.noteId, title: payload.value });
                    else return new UpdateNoteTitleFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    UpdateNoteTitleSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENOTETITLE_SUCCESS)
    );

    @Effect({ dispatch: false })
    UpdateNoteTitleFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENOTETITLE_FAILURE)
    );

    @Effect()
    UpdateNoteText: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_UPDATENOTETEXT)
        .map((action: UpdateNoteText) => action.payload)
        .switchMap(payload => {
            return this.boardService.updateNoteText(payload)
                .map(data => {
                    if (data.ok) return new UpdateNoteTextSuccess({ boardId: payload.boardId, noteId: payload.noteId, text: payload.text });
                    else return new UpdateNoteTextFailure({ error: data.error });
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect({ dispatch: false })
    UpdateNoteTextSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENOTETEXT_SUCCESS)
    );

    @Effect({ dispatch: false })
    UpdateNoteTextFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATENOTETEXT_FAILURE)
    );
    @Effect()
    BoardAssighnToBoard: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_ASSIGHN_TO_BOARD)
        .switchMap(payload => {
            return this.boardService
                .boardAssighnToBoard(payload)
                .map((user: any) => {
                    return new BoardAssighnToBoardSuccess({ user });
                })
                .catch(error => {
                    return Observable.of(new BoardAssighnToBoardFailure({ error }));
                });
        });

    @Effect({ dispatch: false })
    BoardAssighnToBoardSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_SUCCESS),
        tap(() => { })
    );

    @Effect({ dispatch: false })
    BoardAssighnToBoardFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_FAILURE)
    );

    @Effect()
    BoardCopyToBoard: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_COPY_TO_BOARD)
        .switchMap(payload => {
            return this.boardService
                .boardCopyToBoard(payload)
                .map((user: any) => {
                    return new BoardCopyToBoardSuccess({ user });
                })
                .catch(error => {
                    return Observable.of(new BoardCopyToBoardFailure({ error }));
                });
        });

    @Effect({ dispatch: false })
    BoardCopyToBoardSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_SUCCESS),
        tap(() => { })
    );

    @Effect({ dispatch: false })
    BoardCopyToBoardFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_ASSIGHN_TO_BOARD_FAILURE)
    );

    @Effect()
    UpdateBoardColor: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_UPDATECOLOR)
        .map((action: UpdateBoardColor) => action.payload)
        .switchMap(payload => {
            return this.boardService
                .updateBoardColor(payload)
                .mergeMap(data => {
                    if (data.ok) return [new UpdateBoardColorSuccess({
                        color: payload.color
                    }), new UpdateListBoardColor({ boardId: payload.boardId, color: payload.color })];
                    else return new UpdateBoardColorFailure({ error: data.error });
                });
        });

    @Effect({ dispatch: false })
    UpdateBoardColorFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATECOLOR_FAILURE)
    );

    @Effect({ dispatch: false })
    UpdateBoardColorSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATECOLOR_SUCCESS)
    );
    @Effect()
    UpdateBoardIcon: Observable<any> = this.actions
        .ofType(BoardActionTypes.BOARD_UPDATEICON)
        .map((action: UpdateBoardIcon) => action.payload)
        .switchMap(payload => {
            return this.boardService
                .updateBoardIcon(payload)
                .mergeMap(data => {
                    if (data.ok) return [new UpdateBoardIconSuccess({
                        icon: payload.icon
                    }), new UpdateListBoardIcon({ boardId: payload.boardId, icon: payload.icon })];
                    else return new UpdateBoardIconFailure({ error: data.error });
                });
        });

    @Effect({ dispatch: false })
    UpdateBoardIconFailure: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATEICON_FAILURE)
    );

    @Effect({ dispatch: false })
    UpdateBoardIconSuccess: Observable<any> = this.actions.pipe(
        ofType(BoardActionTypes.BOARD_UPDATEICON_SUCCESS)
    );
    constructor(
        private actions: Actions,
        private boardService: BoardService
    ) { }

}
