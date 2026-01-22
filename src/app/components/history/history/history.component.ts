import { Component, inject, OnInit } from '@angular/core';
import { BillComponent } from "../../bill/bill/bill.component";
import { BillDTO } from '../../bill/bill/bilDTO';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-history',
  imports: [BillComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  private billService = inject(BillService);

  readonly bills = this.billService.getBills();

}
