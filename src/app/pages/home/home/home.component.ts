import { Component, effect, Signal } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header/header.component";
import { InfoComponent } from "../../../components/info/info/info.component";
import { HistoryComponent } from "../../../components/history/history/history.component";
import { FooterComponent } from "../../../components/footer/footer/footer.component";
import { AddBillComponent } from "../../../components/addBill/add-bill/add-bill.component";
import { BillService } from '../../../services/bill/bill.service';
import { AddMoneyService } from '../../../services/addMoney/add-money.service';
import { AddMoneyComponent } from "../../../components/addMoney/add-money/add-money.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, InfoComponent, HistoryComponent, FooterComponent, AddBillComponent, AddMoneyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showBill!: Signal<boolean>;
  showAddMoney!: Signal<boolean>;

  constructor(private billService: BillService, private addMoneyService: AddMoneyService) {
    this.showBill = this.billService.showBill;
    this.showAddMoney = this.addMoneyService.showAddMoneyModal;
  }

  closeModal(): void {
    this.billService.close();
  }

  onChildClick(event: Event): void {
    event.stopPropagation();
  }

  closeModalAddMoney(): void {
    this.addMoneyService.close();
  }

  onChildAddMoney(event: Event): void {
    event.stopPropagation();
  }

}
