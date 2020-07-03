import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState, selectDashboardState } from '../../../store/app.states';
import { FormGroup } from '@angular/forms';
import {
  AddBoard
} from '../../../store/actions/dashboard.actions';
import {
  DeleteBoard
} from '../../../store/actions/board.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() open: boolean;
  boardForm: FormGroup;
  getState: Observable<any>;
  currentBoard: any;
  boardInputVision = false;
  getDashboardState: Observable<any>;
  boardList;
  boardPopupVision;
  boards = [];
  userPhoto = null;
  addFlag = false;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getDashboardState = this.store.select(selectDashboardState);
  }

  openBoard(id): void {
    this.router.navigateByUrl(
      `/dashboard/boards/${id}`
    );
  }
  deleteBoard(uuid): void {
    this.store.dispatch(new DeleteBoard({ boardId: uuid }));
  }
  ngOnInit(): void {
    this.getDashboardState.subscribe(state => {
      if (state.boards && state.boards.length === 1 && state.newBoard && this.boards.length === 0) {
        this.router.navigateByUrl(
          `/dashboard/boards/${state.boards[state.boards.length - 1].uuid}`
        );
      }
      if (state.boards && state.initSuccess) this.boards = state.boards;
      if (this.addFlag === true) {
        localStorage.setItem('newBoard', '');
        this.addFlag = false;
        if (this.boards.length) {
          this.router.navigateByUrl(
            `/dashboard/boards/${this.boards[this.boards.length - 1].uuid}`
          );
        }
      }
      this.userPhoto = state.user ? state.user.profile.photoUrl : '';
    });
  }

  addNewBoard(): void {
    this.addFlag = true;
    this.store.dispatch(new AddBoard({}));
  }
}
