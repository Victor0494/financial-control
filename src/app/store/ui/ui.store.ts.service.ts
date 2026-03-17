import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStoreTsService {

  private showBillModal = signal(false);

  showBillModal$ = this.showBillModal.asReadonly();

  openBillModal() {
    this.showBillModal.set(true);
  }

  closeBillModal() {
    this.showBillModal.set(false);
  }
}
