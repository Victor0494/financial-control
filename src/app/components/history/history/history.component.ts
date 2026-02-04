import { Component, inject, Signal } from '@angular/core';
import { BillComponent } from "../../bill/bill/bill.component";
import { BillService } from '../../../services/bill/bill.service';
import { HistoryService } from '../../../services/history/history.service';

@Component({
  selector: 'app-history',
  imports: [BillComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  showPeriod!: Signal<boolean>;

  constructor(private historyService: HistoryService) {
    this.showPeriod = this.historyService.showPeriodModal;
  }

  private billService = inject(BillService);

  readonly bills = this.billService.filteredBills;

}
