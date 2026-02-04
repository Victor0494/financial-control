import { computed, Injectable, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private listner = signal(false);
  selectedMonth = signal<number>(0);

  showBill = this.listner.asReadonly();

  private bills = signal<BillDTO[]>([
    {
      id: '1',
      description: 'primeira conta',
      value: 10,
      dueDate: '2026-01-01',
      payed: false,
    },
    {
      id: '2',
      description: 'primeira conta',
      value: 10,
      dueDate: '2026-02-01',
      payed: false,
    },
    {
      id: '3',
      description: 'segunda conta',
      value: 20,
      dueDate: '2026-03-01',
      payed: false,
    },
    {
      id: '4',
      description: 'terceira conta',
      value: 30,
      dueDate: '2026-04-01',
      payed: false,
    },
  ]);

  billsUpdated = this.bills.asReadonly();

  filteredBills = computed(() => {
    return this.bills().filter(bill => {
    const date = this.parseLocalDate(bill.dueDate);
      return date.getMonth() === this.selectedMonth();
    });
  })

  getBills() {
    return this.billsUpdated;
  }

  addBill(bill: BillDTO) {
    this.bills.update((bills) => [...bills, bill]);
  }

  show() {
    this.listner.set(true);
  }

  close() {
    this.listner.set(false);
  }

  nextMonth() {
    this.selectedMonth.update(m => (m + 1) % 12);
  }

  prevMonth() {
    this.selectedMonth.update(m => (m - 1 + 12) % 12);
  }

  parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

}
