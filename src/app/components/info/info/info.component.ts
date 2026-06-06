import { Component, OnInit } from '@angular/core';
import { InAndOutComponent } from "../../inAndOut/in-and-out/in-and-out.component";
import { AddMoneyService } from '../../../services/addMoney/add-money.service';
import { CurrencyPipe } from '@angular/common';
import { BillService } from '../../../services/bill/bill.service';
import { BalanceService } from '../../../services/balance/balance.service';

@Component({
  selector: 'app-info',
  imports: [InAndOutComponent, CurrencyPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {

  readonly moneyValue;
  readonly subStractMoney;
  readonly money;
  readonly currentInsertedValue;
  readonly currentOutputValue;


  constructor(private addMoneyService: AddMoneyService, private billService: BillService, private balanceService: BalanceService) {
      this.moneyValue = this.billService.currentMonthInitialBalance;
      this.currentInsertedValue = this.billService.currentInputMoneyValue;
      this.currentOutputValue = this.billService.currentOutPutMoneyValue;
      this.subStractMoney = this.addMoneyService.getSubtractMoney();
      this.money = this.addMoneyService.getMoneyInput();
  }
  ngOnInit(): void {
    this.billService.loadCurrentMonthBalance();
  }

  addMoney(){
    this.addMoneyService.show();
  }
}
