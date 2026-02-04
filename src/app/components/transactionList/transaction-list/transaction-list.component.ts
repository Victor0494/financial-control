import { Component, Signal } from '@angular/core';
import { HistoryComponent } from '../../history/history/history.component';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-transaction-list',
  imports: [HistoryComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent {

  currentMonthIndex!: Signal<number>;

  readonly months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(private billService: BillService) {
    this.currentMonthIndex = this.billService.selectedMonth;
  }

  backMonth() {
    if (this.currentMonthIndex() > 0) {
      this.billService.prevMonth();
    }
  }

  forwardMonth() {
    if (this.currentMonthIndex() < this.months.length - 1) {
      this.billService.nextMonth();
    }
  }
}
