import { computed, Injectable, signal } from '@angular/core';
import { MonthlyBalanceDTO } from '../components/addMoney/add-money/monthlyBalanceDTO';
import { BillDTO } from '../components/bill/bill/bilDTO';

@Injectable({
  providedIn: 'root'
})
export class BillStoreService {

   /* STATE */

  selectedMonth = signal(new Date().getMonth());
  selectedYear = signal(new Date().getFullYear());

  private bills = signal<BillDTO[]>([]);
  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

  bills$ = this.bills.asReadonly();


  /* COMPUTED */

  filteredBills = computed(() => {
    return this.bills().filter((bill) => {
      const date = new Date(bill.dueDate);

      return (
        date.getFullYear() === this.selectedYear() &&
        date.getMonth() === this.selectedMonth()
      );
    });
  });


  expensesOfMonth = computed(() =>
    this.filteredBills()
      .filter((b) => b.payed)
      .reduce((total, b) => total + b.value, 0),
  );


  /* STATE MUTATIONS */

  addBill(bill: BillDTO) {
    this.bills.update((b) => [...b, bill]);
  }

  updateMonthlyBalances(fn: (list: MonthlyBalanceDTO[]) => MonthlyBalanceDTO[]) {
    this.monthlyBalances.update(fn);
  }
}
