import { Component, OnInit, Input } from '@angular/core';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';
import * as actions from '../../../actions/holidays-list-control.action';
import { ListControlsModel } from '../../../models';

@Component({
  selector: 'app-holiday-list-controls',
  templateUrl: './holiday-list-controls.component.html',
  styleUrls: ['./holiday-list-controls.component.scss']
})
export class HolidayListControlsComponent implements OnInit {


  constructor(private store: Store<GiftGivingState>) { }

  @Input() model: ListControlsModel;
  ngOnInit() {
  }

  showUpcoming() {
    this.store.dispatch(actions.showUpcoming());
  }

  showAll() {
    this.store.dispatch(actions.showAll());
  }

  sortByName() {
    this.store.dispatch(actions.sortByName());
  }

  sortByDate() {
    this.store.dispatch(actions.sortByDate());
  }

}
