import { Component } from '@angular/core';
import { InAndOutComponent } from "../../inAndOut/in-and-out/in-and-out.component";
import { AddMoneyService } from '../../../services/addMoney/add-money.service';
import { CurrencyPipe } from '@angular/common';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-info',
  imports: [InAndOutComponent, CurrencyPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  readonly moneyValue;
  readonly subStractMoney;
  readonly money;
  readonly currentInsertedValue;
  readonly currentOutputValue;


  constructor(private addMoneyService: AddMoneyService, private billService: BillService) {
      this.moneyValue = this.billService.currentMonthInitialBalance;
      this.currentInsertedValue = this.billService.currentInputMoneyValue;
      this.currentOutputValue = this.billService.currentOutPutMoneyValue;
      this.subStractMoney = this.addMoneyService.getSubtractMoney();
      this.money = this.addMoneyService.getMoneyInput()
  }

  addMoney(){
    this.addMoneyService.show();
  }
}
