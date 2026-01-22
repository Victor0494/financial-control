import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddMoneyService {

  constructor() { }

  private listner = signal(false);

  money = signal<number>(0);

  showAddMoneyModal = this.listner.asReadonly();
  moneyUpdated = this.money.asReadonly();

  show() {
    this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }

  addMoney(moneyValue: number) {
    const value = Number(moneyValue);
    this.money.update(v => v + value);
  }

  getMoneyValue() {
    return this.moneyUpdated;
  }
}
