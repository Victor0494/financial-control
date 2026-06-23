import { computed, effect, Injectable, signal } from '@angular/core';
import { BillDTO } from '../../components/bill/bill/bilDTO';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';
import { BillApiService } from './bill-api.service';
import { tap } from 'rxjs';
import { BalanceService } from '../balance/balance.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private listener = signal(false);
  selectedMonth = signal<number>(new Date().getMonth() + 1);
  selectedYear = signal<number>(new Date().getFullYear());
  private bills = signal<BillDTO[]>([]);

  showBill = this.listener.asReadonly();
  billsUpdated = this.bills.asReadonly();

  constructor(
    private billApi: BillApiService,
    private balanceService: BalanceService,
  ) {
    effect(() => {
      const year = this.selectedYear();
      const month = this.selectedMonth();

      const date = new Date(year, month - 1).toISOString().split('T')[0];

      this.billApi.getBillsByDate(date).subscribe((bills) => {
        this.bills.set(bills);
      });
    });
  }

  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

  filteredBills = computed(() => {
    return this.bills().filter((bill) => {
      const [y, m] = bill.dueDate.split('-').map(Number);
      return y === this.selectedYear() && m === this.selectedMonth();
    });
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

  private applyTransaction(value: number, type: 'INCOME' | 'EXPENSE') {
    this.balanceService
      .updateMonthlyBalance(value, type)
      .subscribe((updatedBalance) => {
        this.monthlyBalances.update((list) => {
          const exist = list.find(
            (m) =>
              m.year === updatedBalance.year &&
              m.month === updatedBalance.month,
          );

          if (!exist) {
            return [...list, updatedBalance];
          }

          return list.map((item) =>
            item.year === updatedBalance.year &&
            item.month === updatedBalance.month
              ? updatedBalance
              : item,
          );
        });
      });
  }

  addIncome(value: number) {
    this.applyTransaction(value, 'INCOME');
  }

  addExpense(value: number) {
    this.applyTransaction(value, 'EXPENSE');
  }

  updateBillStatus(bill: BillDTO) {
    this.billApi.updateBillStatus(bill).subscribe(() => {
    });
  }
  
  nextMonth() {
    this.selectedMonth.update((m) => (m === 12 ? 1 : m + 1));
  }

  prevMonth() {
    this.selectedMonth.update((m) => (m === 1 ? 12 : m - 1));
  }

  loadBill(date?: string) {
    const finalDate = date ?? new Date().toISOString().split('T')[0];

    this.billApi.getBillsByDate(finalDate).subscribe((bills) => {
      this.bills.set(bills);
    });
  }

  loadCurrentMonthBalance() {
    this.balanceService
      .getBalanceForMonth(this.selectedYear(), this.selectedMonth())
      .subscribe((balance) => {
        this.monthlyBalances.update((list) => {
          const index = list.findIndex(
            (item) =>
              item.year === balance.year && item.month === balance.month,
          );

          if (index === -1) {
            return [...list, balance];
          }

          const updated = [...list];
          updated[index] = balance;

          return updated;
        });
      });
  }
}
