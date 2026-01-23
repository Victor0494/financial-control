import { Component, Input } from '@angular/core';
import { BillDTO } from './bilDTO';
import { CurrencyPipe } from '@angular/common';
import { AddMoneyService } from '../../../services/addMoney/add-money.service';

@Component({
  selector: 'app-bill',
  imports: [CurrencyPipe],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  
  @Input() bill: BillDTO | undefined;
  payed: boolean | undefined;

  constructor(private addMoneyService: AddMoneyService) {}

  payedBill(billDTO: BillDTO) {
    if(billDTO.payed) {
      billDTO.payed = false;
    } else {
      billDTO.payed = true;
      this.addMoneyService.subtractMoney(billDTO.value);
    }
    this.payed = billDTO.payed;

  }
}
