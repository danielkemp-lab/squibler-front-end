import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable()
export class BoardService {
    constructor(private apollo: Apollo) { }

    init(payload): any {
        const { uuid } = payload;
        const clearCache = 0;

        return this.apollo
            .watchQuery({
                query: gql`
                    query Board {
                        board(uuid: "${uuid}") {
                        uuid,
                        name,
                        color,
                        iconName,
                        notes {
                            uuid,
                            title,
                            text
                        },
                        },
                    }`
            })
            .result();
    }

    updateBoardName(payload): any {
        const { boardId, value } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($name: String) {
                    createOrUpdateBoards(uuid: "${boardId}", name: $name) {
                        ok,
                        error,
                    }
                    }`,
                variables: {
                    name: value
                }
            })
            .pipe(map(result => result.data.createOrUpdateBoards));
    }
    updateBoardColor(payload): any {
        const { boardId, color } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($color: String) {
                    createOrUpdateBoards(uuid: "${boardId}", color: $color) {
                        ok,
                        error,
                    }
                    }`,
                variables: {
                    color
                }
            })
            .pipe(map(result => result.data.createOrUpdateBoards));
    }
    deleteBoard(payload): any {
        const { boardId } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation DeleteBoard {
                    deleteBoard(uuid: "${boardId}") {
                        ok,
                        error,
                    }
                    }`
            })
            .pipe(map(result => result.data.deleteBoard));
    }
    addNote(payload): any {
        const { boardId, title, text } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($title: String, $text: String) {
                    createOrUpdateBoards(uuid: "${boardId}", notes: [{title: $title, text: $text}]) {
                        ok,
                        error,
                        boardOutput {
                            notesOutput {
                                note {
                                    uuid,
                                    title,
                                    text
                                }
                            }
                        }
                    }
                    }`, variables: {
                    title, text
                }
            })
            .pipe(map(result => {
                return result.data.createOrUpdateBoards;
            }));
    }

    deleteNote(payload): any {
        const { noteId } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation DeleteNote {
                    deleteNote(uuid: "${noteId}") {
                        ok,
                        error,
                    }
                    }`
            })
            .pipe(map(result => result.data.deleteNote));
    }
    updateBoardIcon(payload): any {
        const { boardId, icon } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($icon: String) {
                    createOrUpdateBoards(uuid: "${boardId}", iconName: $icon) {
                        ok,
                        error,
                    }
                    }`,
                variables: {
                    icon
                }
            })
            .pipe(map(result => result.data.createOrUpdateBoards));
    }
    updateNoteTitle(payload): any {
        const { boardId, noteId, value } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($title: String) {
                    createOrUpdateBoards(uuid: "${boardId}", notes: [{uuid: "${noteId}", title: $title}]) {
                        ok,
                        error,
                    }
                    }`,
                variables: {
                    title: value
                }
            })
            .pipe(map(result => result.data.createOrUpdateBoards));
    }
    updateNoteText(payload): any {
        const { boardId, noteId, text } = payload;

        return this.apollo
            .mutate({
                mutation: gql` mutation CreateOrUpdateBoards($text: String) {
                    createOrUpdateBoards(uuid: "${boardId}", notes: [{uuid: "${noteId}", text: $text}]) {
                        ok,
                        error,
                    }
                    }`,
                variables: {
                    text
                }
            })
            .pipe(map(result => result.data.createOrUpdateBoards));
    }
    boardAssighnToBoard(board): any {
        delete board.payload.ideas.imageArray;
        delete board.payload.ideas.__typename;

        board.payload.ideas.boardId = board.payload.assighnBoard.uuid;
        const newBoardNotes = [];
        newBoardNotes.push(board.payload.ideas);

        return this.apollo
            .mutate({
                mutation: gql`
             mutation updateBoardTest($notes: [NoteInput]) {
            createOrUpdateBoards(uuid: "${board.payload.currentBoard.uuid}", name: "${board.payload.currentBoard.name}", notes: $notes) {
                boardOutput {
                    notesOutput {
                       created,
                       note {
                           uuid,
                           title,
                           text
                       }
                    }
                }
            ok,
            error
        }
      }
    `, variables: {
                    notes: newBoardNotes ? newBoardNotes : []
                }
            })
            .pipe(map(result => {

                return result.data.createOrUpdateBoards;
            }));
    }
    boardCopyToBoard(board): any {
        delete board.payload.ideas.imageArray;
        delete board.payload.ideas.__typename;
        delete board.payload.ideas.uuid;
        const newBoardNotes = [];
        newBoardNotes.push(board.payload.ideas);

        return this.apollo
            .mutate({
                mutation: gql`
                 mutation updateBoardTest($notes: [NoteInput]) {
                createOrUpdateBoards(uuid: "${board.payload.assighnBoard.uuid}",
                name: "${board.payload.assighnBoard.name}", notes: $notes) {
                    boardOutput {
                        notesOutput {
                           created,
                           note {
                               uuid,
                               title,
                               text
                           }
                        }
                    }
                ok,
                error
            }
          }
        `, variables: {
                    notes: newBoardNotes ? newBoardNotes : []
                }
            })
            .pipe(map(result => {
                return result.data.createOrUpdateBoards;
            }));
    }

}
