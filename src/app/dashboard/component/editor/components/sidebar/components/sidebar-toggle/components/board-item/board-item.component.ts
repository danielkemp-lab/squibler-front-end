import {AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectProjectState
} from '../../../../../../../../../store/app.states';
import { Observable, Subscription } from 'rxjs';
import {
    AddNote,
    DeleteBoard
} from '../../../../../../../../../store/actions/board.actions';
import {ProjectUpdateNoteTitle} from "../../../../../../../../../store/actions/project.actions";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit, OnDestroy, AfterViewChecked {

  board: any;
  openDeletePopup:boolean = false;
  openDeleteBoardPopup:boolean = false;
  @Input('board')

  set name(board: any) {
    this.board = board;
  }

  @Input()
  active;
  @Output()
  onUpdateBoardName = new EventEmitter();
  @Output()
  onUpdateBoardNoteTitle = new EventEmitter();
  @Output()
  onBoardClick = new EventEmitter();
  @Output()
  onBoardDelete = new EventEmitter();

  @ViewChild('boardNoteTitle') boardNoteTitle;

  @Output()
  onNoteAdd = new EventEmitter();
  open = true;
  updating = false;
  projectId = '';
  projectSubscription: Subscription;
  subscription: Subscription;
  getProjectState: Observable<any>;
  observablePeople: any;
  constructor(
    private store: Store<AppState>
  ) {
    this.getProjectState = this.store.select(selectProjectState);
  }

  toggleItems(e): void {
    e.stopPropagation();
    this.open = !this.open;
  }
  updateBoardName(name): void {
    this.updating = true;
    this.onUpdateBoardName.emit({
      boardId: this.board.uuid,
      name,
      opened: this.open
    });

    // document.getElementById('noteTitle').focus();
  }

  updateBoardNoteTitle(id,name, onenter=false): void {
    this.updating = true;
    this.onUpdateBoardNoteTitle.emit({
      boardId: this.board.uuid,
      noteId: id,
      name,
      opened: this.open
    });

    if(onenter){
      document.getElementById('boardContent').focus();
    }
  }

  deleteBoard(board): void {
    this.store.dispatch(new DeleteBoard({ boardId: board.uuid }));
    this.onBoardDelete.emit({
      board
    });
  }
  ngAfterViewChecked(): void {
    if(this.board.noteAdded){
      const noteDiv = <HTMLElement>document.querySelector('[id="'+ this.board.uuid +'-notesDiv"] .board-item__list-item:last-child')
      noteDiv.click();
      this.board.noteAdded = false;
    }
  }

  ngOnInit(): void {
    this.projectSubscription = this.getProjectState.subscribe(state => {
      if (state.project && this.updating) {
        this.projectId = state.project.uuid;
        this.open = state.updatedBoardOpened;
      }
    });
    this.updating = false;
  }
  getInfo() {
  }

  addNewNote(e): void {
    this.updating = true;
    this.onNoteAdd.emit({board: this.board});
  }
  getNoteText(html): string {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.innerText;
  }
  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
}
