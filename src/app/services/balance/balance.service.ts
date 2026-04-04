import { computed, Injectable, signal } from '@angular/core';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';
import { BillDTO } from '../../components/bill/bill/bilDTO';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

  getMonthlyBalances() {
    return this.monthlyBalances.asReadonly();
  }

   updateMonthlyBalance(year: number, month: number, amount: number, payed: boolean) {
    this.monthlyBalances.update((list) => {
      const index = list.findIndex(
        (m) => m.year === year && m.month === month
      );

      // Se já existe registro do mês
      if (index !== -1) {
        const updated = [...list];
        const current = updated[index];

        updated[index] = {
          ...current,
          balance: payed
            ? current.balance - amount
            : current.balance + amount,
          moneyInput: (current.moneyInput ?? 0) + (payed ? 0 : amount),
          moneyOutPut: (current.moneyOutPut ?? 0) + (payed ? amount : 0),
        };

        return updated;
      }

      // Se NÃO existe registro do mês
      return [
        ...list,
        {
          year,
          month,
          balance: payed ? -amount : amount,
          moneyInput: payed ? 0 : amount,
          moneyOutPut: payed ? amount : 0,
        },
      ];
    });
  }

  getInitialBalance(year: number, month: number): number {
    const found = this.monthlyBalances().find(
      (m) => m.year === year && m.month === month
    );

    return found?.balance ?? 0;
  }

  getInputValue(year: number, month: number): number {
    const found = this.monthlyBalances().find(
      (m) => m.year === year && m.month === month
    );

    return found?.moneyInput ?? 0;
  }

  getOutputValue(year: number, month: number): number {
    const found = this.monthlyBalances().find(
      (m) => m.year === year && m.month === month
    );

    return found?.moneyOutPut ?? 0;
  }

  // =========================
  // 📌 REGRAS PURAS (SEM STATE)
  // =========================

  calculateExpenses(bills: BillDTO[]): number {
    return bills
      .filter((b) => b.payed)
      .reduce((total, b) => total + b.billValue, 0);
  }

  calculateBalance(initial: number, expenses: number): number {
    return initial - expenses;
  }

  // =========================
  // 📌 HELPER (OPCIONAL)
  // =========================

  getFullMonthSummary(year: number, month: number, bills: BillDTO[]) {
    const initial = this.getInitialBalance(year, month);
    const input = this.getInputValue(year, month);
    const output = this.getOutputValue(year, month);
    const expenses = this.calculateExpenses(bills);
    const balance = this.calculateBalance(initial, expenses);

    return {
      initial,
      input,
      output,
      expenses,
      balance
    };
  }

  // expensesOfMonth = computed(() => {
  //   return this.filteredBills()
  //     .filter((b) => b.payed)
  //     .reduce((total, b) => total + b.billValue, 0);
  // });

  expensesOfMonth(bills: BillDTO[]) {
    return bills
      .filter((b) => b.payed)
      .reduce((total, b) => total + b.billValue, 0);
  }

}
