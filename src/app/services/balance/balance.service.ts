import { computed, Injectable, signal } from '@angular/core';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';
import { BillDTO } from '../../components/bill/bill/bilDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private readonly API_URL = "http://localhost:8080/v1/balance";

  constructor(private http: HttpClient) { }

  private monthlyBalances = signal<MonthlyBalanceDTO[]>([]);

  getMonthlyBalances() {
    return this.monthlyBalances.asReadonly();
  }

   updateMonthlyBalance(value: number, type: 'INCOME' | 'EXPENSE') {
    const params = {
      value: value,
      type
    }

    return this.http.post<void>(this.API_URL, null, { params });
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
