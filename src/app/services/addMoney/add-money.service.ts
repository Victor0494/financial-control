import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddMoneyService {

  constructor() { }

  private listner = signal(false);

  money = signal<number>(0);
  subStractMoneyValue = signal<number>(0);

  showAddMoneyModal = this.listner.asReadonly();
  moneyUpdated = this.money.asReadonly();
  subStractMoney = this.subStractMoneyValue.asReadonly();

  show() {
    this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }

  addMoney(moneyValue: string) {
    const value = Number(moneyValue);
    this.money.update(v => v + value);
  }

  subtractMoney(moneyValue: number) {
    const value = Number(moneyValue);
    this.money.update(v => v - value);
    this.subStractMoneyValue.update(v => v + value);
  }

  getMoneyValue() {
    return this.moneyUpdated;
  }

  getSubtractMoney() {
    return this.subStractMoney;
  }
}
