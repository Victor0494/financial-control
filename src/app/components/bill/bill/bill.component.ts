import { Component, Input } from '@angular/core';
import { BillDTO } from './bilDTO';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bill',
  imports: [CurrencyPipe],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  @Input() bill: BillDTO | undefined;
  payed: boolean | undefined;


  payedBill(billDTO: BillDTO) {
    if(billDTO.payed) {
      billDTO.payed = false;
    } else {
      billDTO.payed = true;
    }
    this.payed = billDTO.payed;
  }
}
