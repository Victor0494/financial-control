import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddMoneyService } from '../../../services/addMoney/add-money.service';

@Component({
  selector: 'app-add-money',
  imports: [ReactiveFormsModule],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent {

  constructor(private addMoneyService: AddMoneyService) {

  }

  form = new FormGroup({
    money: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required,
    })
  });


  submit() {
    this.addMoneyService.addMoney(this.form.value.money!);

    this.form.reset();
    this.addMoneyService.close();
  }
}
