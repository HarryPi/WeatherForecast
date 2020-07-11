import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input() isSidebarOpen: boolean;
  @Output() isSidebarOpenChange: EventEmitter<boolean>;


  subscription: Subscription;

  constructor(
  ) {
    this.isSidebarOpenChange = new EventEmitter<boolean>();
    this.isSidebarOpen = false;
    this.subscription = new Subscription();
  }

  sidebarClosedOrOpened(newStatus: boolean): void {
    this.isSidebarOpen = newStatus;
    this.isSidebarOpenChange.emit(this.isSidebarOpen);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
