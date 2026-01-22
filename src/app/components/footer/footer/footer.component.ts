import { Component } from '@angular/core';
import { AddBillComponent } from "../../addBill/add-bill/add-bill.component";
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-footer',
  imports: [AddBillComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private billService: BillService) {

  }
  
  openAddBill() {
    this.billService.show();
  }

}
