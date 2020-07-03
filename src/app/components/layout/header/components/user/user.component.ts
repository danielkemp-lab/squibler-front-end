import { Component, OnInit } from '@angular/core';
import { AppState, selectProfileState } from '../../../../../store/app.states';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  name: string;
  userPhotoUrl: string;
  getState: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.getState = this.store.select(selectProfileState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      if (state.user) {
        const { name, photo_url } = state.user.data;

        if (state.user.data) {

          this.name = name;
          this.userPhotoUrl = photo_url;
        }
      }
    });
    
  }
}
