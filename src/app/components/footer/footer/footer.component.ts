import { Component } from '@angular/core';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private billService: BillService) {

  }
  
  openAddBill() {
    this.billService.setShowBill(true);
  }

}
