import { computed, effect, Injectable, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';
import { BillApiService } from './bill-api.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private listener = signal(false);
  selectedMonth = signal<number>(new Date().getMonth());
  selectedYear = signal<number>(new Date().getFullYear());
  private bills = signal<BillDTO[]>([]);

  showBill = this.listener.asReadonly();
  billsUpdated = this.bills.asReadonly();

  constructor(private billApi: BillApiService) {
    effect(() => {
      const year = this.selectedYear();
      const month = this.selectedMonth();

      const date = new Date(year, month).toISOString().split('T')[0];

      this.billApi.getBillsByDate(date).subscribe((bills) => {
        console.log('Fetched bills for', bills);
        this.bills.set(bills);
      });
    });
  }

  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

  //TODO descobrir por que retornando null
  filteredBills = computed(() => {
    return this.bills().filter((bill) => {
      console.log('Filtering bill:', bill);
      const [y, m] = bill.dueDate.split('-').map(Number);
      return y === this.selectedYear() && m - 1 === this.selectedMonth();
    });
  });

  expensesOfMonth = computed(() => {
    return this.filteredBills()
      .filter((b) => b.payed)
      .reduce((total, b) => total + b.billValue, 0);
  });

  balanceOfMonth = computed(() => {
    const data = this.currentMonthData();
    if (!data) return 0;

    return data.balance;
  });

  currentMonthInitialBalance = computed(() => {
    return this.currentMonthData()?.balance ?? 0;
  });

  currentInputMoneyValue = computed(() => {
    return this.currentMonthData()?.moneyInput ?? 0;
  });

  currentOutPutMoneyValue = computed(() => {
    return this.currentMonthData()?.moneyOutPut ?? 0;
  });

  private currentMonthData = computed(() => {
    return this.monthlyBalances().find(
      (m) => m.year === this.selectedYear() && m.month === this.selectedMonth(),
    );
  });

  addBill(bill: BillDTO) {
    return this.billApi.addBill(bill).pipe(
      tap((newBill) => {
        this.bills.update((list) => [...list, newBill]);
      }),
    );
  }

  setShowBill(value: boolean) {
    this.listener.set(value);
  }

  updateMonthlyBalance(moneyValue: number, payed?: boolean) {
    const monthBalance: MonthlyBalanceDTO = {
      year: 2026,
      month: new Date().getMonth(),
      balance: moneyValue,
      moneyInput: payed ? undefined : moneyValue,
      moneyOutPut: payed ? moneyValue : undefined,
    };

    this.monthlyBalances.update((list) => {
      const index = list.findIndex(
        (m) => m.year === monthBalance.year && m.month === monthBalance.month,
      );

      if (index !== -1) {
        const updated = [...list];

        updated[index] = {
          ...updated[index],
          balance: payed
            ? updated[index].balance - monthBalance.balance
            : updated[index].balance + monthBalance.balance,
          moneyInput:
            (updated[index].moneyInput ?? 0) + (monthBalance.moneyInput ?? 0),
          moneyOutPut: (updated[index].moneyOutPut ?? 0) - moneyValue,
        };
        return updated;
      }
      return [...list, monthBalance];
    });
  }

  private applyTransaction(value: number, type: 'INCOME' | 'EXPENSE') {
    const now = new Date();

    this.monthlyBalances.update((list) => {
      const index = list.findIndex(
        (m) => m.year === now.getFullYear() && m.month === now.getMonth(),
      );

      const delta = type === 'INCOME' ? value : -value;

      if (index !== -1) {
        const updated = [...list];

        updated[index] = {
          ...updated[index],
          balance: updated[index].balance + delta,
          moneyInput:
            (updated[index].moneyInput ?? 0) + (type === 'INCOME' ? value : 0),
          moneyOutPut:
            (updated[index].moneyOutPut ?? 0) +
            (type === 'EXPENSE' ? value : 0),
        };

        return updated;
      }

      return [
        ...list,
        {
          year: now.getFullYear(),
          month: now.getMonth(),
          balance: delta,
          moneyInput: type === 'INCOME' ? value : 0,
          moneyOutPut: type === 'EXPENSE' ? value : 0,
        },
      ];
    });
  }

  addIncome(value: number) {
    console.log('Adding income:', value);
    this.applyTransaction(value, 'INCOME');
  }

  addExpense(value: number) {
    console.log('Adding expense:', value);
    this.applyTransaction(value, 'EXPENSE');
  }

  nextMonth() {
    this.selectedMonth.update((m) => (m + 1) % 12);
  }

  prevMonth() {
    this.selectedMonth.update((m) => (m - 1 + 12) % 12);
  }

  loadBill(date?: string) {
    const finalDate = date ?? new Date().toISOString().split('T')[0];

    this.billApi.getBillsByDate(finalDate).subscribe((bills) => {
      this.bills.set(bills);
    });
  }
}
