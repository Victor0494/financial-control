import { Component, inject, OnInit, Signal } from '@angular/core';
import { BillComponent } from "../../bill/bill/bill.component";
import { BillService } from '../../../services/bill/bill.service';
import { HistoryService } from '../../../services/history/history.service';

@Component({
  selector: 'app-history',
  imports: [BillComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  showPeriod!: Signal<boolean>;

  private billService = inject(BillService);

  constructor(private historyService: HistoryService) {
    this.showPeriod = this.historyService.showPeriodModal;
  }
  ngOnInit(): void {
    this.billService.loadBill();
  }

  readonly bills = this.billService.filteredBills;

}
