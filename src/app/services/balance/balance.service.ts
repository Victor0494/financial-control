import {Injectable, signal } from '@angular/core';
import { MonthlyBalanceDTO } from '../../components/addMoney/add-money/monthlyBalanceDTO';
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

    return this.http.post<MonthlyBalanceDTO>(this.API_URL, null, { params });
  }

  getBalanceForMonth(year: number, month: number) {
    const params = {
      year: year,
      month: month
    }
    return this.http.get<MonthlyBalanceDTO>(this.API_URL, { params });
  }
}
