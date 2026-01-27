import { Component } from '@angular/core';
import { InAndOutComponent } from "../../inAndOut/in-and-out/in-and-out.component";
import { AddMoneyService } from '../../../services/addMoney/add-money.service';
import { CurrencyPipe } from '@angular/common';

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


  constructor(private addMoneyService: AddMoneyService) {
      this.moneyValue = this.addMoneyService.getMoneyValue();
      this.subStractMoney = this.addMoneyService.getSubtractMoney();
      this.money = this.addMoneyService.getMoneyInput()
  }

  addMoney(){
    this.addMoneyService.show();
  }
}
