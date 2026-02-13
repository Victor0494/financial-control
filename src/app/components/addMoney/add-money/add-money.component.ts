import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddMoneyService } from '../../../services/addMoney/add-money.service';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-add-money',
  imports: [ReactiveFormsModule],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent {

    money = signal<number>(0);
    moneyUpdated = this.money.asReadonly();

  constructor(private addMoneyService: AddMoneyService, private billService: BillService) {

  }

  form = new FormGroup({
  money: new FormControl('', {
    validators: Validators.required
  })
    });


  submit() {
    this.addMoneyService.updateMoneyInput(this.form.value.money!);
    this.billService.updateMonthlyBalance(Number.parseFloat(this.form.value.money!))

    this.form.reset();
    this.addMoneyService.close();
  }
}
