import { Component, Input } from '@angular/core';
import { BillDTO } from './bilDTO';
import { CurrencyPipe } from '@angular/common';
import { BillService } from '../../../services/bill/bill.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bill',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  
  @Input() bill!: BillDTO;

  constructor(private billService: BillService) {}

  payedBill(bill: BillDTO) {
  const wasPayed = bill.payed;

  bill.payed = !bill.payed;

  if (!wasPayed && bill.payed) {
    this.billService.addExpense(bill.billValue);
  } else if (wasPayed && !bill.payed) {
    this.billService.addIncome(bill.billValue);
  }
}
}
