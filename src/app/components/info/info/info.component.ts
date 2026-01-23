import { Component } from '@angular/core';
import { InAndOutComponent } from "../../inAndOut/in-and-out/in-and-out.component";
import { AddMoneyService } from '../../../services/addMoney/add-money.service';

@Component({
  selector: 'app-info',
  imports: [InAndOutComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  readonly moneyValue;
  readonly subStractMoney;


  constructor(private addMoneyService: AddMoneyService) {
      this.moneyValue = this.addMoneyService.getMoneyValue();
      this.subStractMoney = this.addMoneyService.getSubtractMoney();
  }

  addMoney(){
    this.addMoneyService.show();
  }
}
