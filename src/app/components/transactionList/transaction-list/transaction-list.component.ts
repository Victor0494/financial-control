import { Component } from '@angular/core';
import { HistoryComponent } from "../../history/history/history.component";

@Component({
  selector: 'app-transaction-list',
  imports: [HistoryComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  currentMonthIndex = 0;

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
  'Dezembro'];

  
    backMonth() {
      if(this.currentMonthIndex > 0) {
          this.currentMonthIndex--;
      }
    }

    forwardMonth() {
      if(this.currentMonthIndex < this.months.length - 1) {
          this.currentMonthIndex++;
      }
    }
  
}
