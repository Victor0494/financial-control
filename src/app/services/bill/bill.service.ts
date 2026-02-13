import { computed, Injectable, Signal, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private listner = signal(false);
  selectedMonth = signal<number>(new Date().getMonth());
  selectedYear = signal<number>(new Date().getFullYear());

  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

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
    return this.bills().filter((bill) => {
      const [y, m] = bill.dueDate.split('-').map(Number);
      return y === this.selectedYear() && m - 1 === this.selectedMonth();
    });
  });

  expensesOfMonth = computed(() => {
    return this.filteredBills()
      .filter((b) => b.payed)
      .reduce((total, b) => total + b.value, 0);
  });

  balanceOfMonth = computed(() => {
    const initial = this.currentMonthInitialBalance();
    return initial - this.expensesOfMonth();
  });

  currentMonthInitialBalance = computed(() => {
    const found = this.monthlyBalances().find(
      (m) => m.year === this.selectedYear() && m.month === this.selectedMonth(),
    );

    return found?.initialBalance ?? 0;
  });

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

  updateMonthlyBalance(moneyValue: number) {
    const monthBalance: MonthlyBalanceDTO = {
      year: 2026,
      month: new Date().getMonth(),
      initialBalance: moneyValue,
    };

    this.monthlyBalances.update((list) => {
      const index = list.findIndex(
        (m) => m.year === monthBalance.year && m.month === monthBalance.month,
      );

      if (index !== -1) {
        const updated = [...list];

        updated[index] = {
          ...updated[index],
          initialBalance:
            updated[index].initialBalance + monthBalance.initialBalance,
        };
        return updated;
      }

    return [...list, monthBalance];
    });
  }

  nextMonth() {
    this.selectedMonth.update((m) => (m + 1) % 12);
  }

  prevMonth() {
    this.selectedMonth.update((m) => (m - 1 + 12) % 12);
  }

  parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
