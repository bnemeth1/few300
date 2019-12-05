import { Component } from '@angular/core';
import { applicationStarted } from './actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'few300';

  constructor(store: Store<AppState>) {
    store.dispatch(applicationStarted());
  }
}
