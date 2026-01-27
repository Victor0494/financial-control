import { Injectable, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private listner = signal(false);

  showBill = this.listner.asReadonly();

   private bills = signal<BillDTO[]>([
    { id: '1', description: 'primeira conta', value: 10, dueDate: '01/02/26', payed: false },
    { id: '2', description: 'segunda conta', value: 20, dueDate: '01/02/26', payed: false },
    { id: '3', description: 'terceira conta', value: 30, dueDate: '01/02/26', payed: false },
  ]);

  billsUpdated = this.bills.asReadonly();

  getBills() {
    return this.billsUpdated;
  }

  addBill(bill: BillDTO) {
    this.bills.update(bills => [...bills, bill]);
  }

  show() {
      this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }

}
