import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private listner = signal(false);

  constructor() {}

  showPeriodModal = this.listner.asReadonly();

  show() {
    this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }
}
