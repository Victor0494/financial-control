import { Injectable, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';

@Injectable({
  providedIn: 'root'
})
export class AddMoneyService {

  constructor() { }

  private listner = signal(false);

  money = signal<number>(0);
  subStractMoneyValue = signal<number>(0);
  moneyInput = signal<number>(0);


  showAddMoneyModal = this.listner.asReadonly();
  moneyUpdated = this.money.asReadonly();
  subStractMoney = this.subStractMoneyValue.asReadonly();
  inputMoney = this.moneyInput.asReadonly();

  show() {
    this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }

  updateMoneyValue(bilDTO: BillDTO) {
    if(bilDTO.payed) {
      this.subtractMoney(bilDTO.value);
    } else {
      this.addMoney(bilDTO.value.toString());
       this.subStractMoneyValue.update(v => v - bilDTO.value);
    }
  }

  addMoney(moneyValue: string) {
    const value = Number(moneyValue);
    this.money.update(v => v + value); 
  }

  updateMoneyInput(moneyValue: string) {
    const value = Number(moneyValue);
    this.moneyInput.set(value);
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

  getMoneyInput() {
    return this.moneyInput;
  }
}
