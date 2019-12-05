import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {

  @Input() hasError: boolean;
  @Input() errorMessage: string;
  constructor() { }

  ngOnInit() {
  }

  clearError() {
  }

}
