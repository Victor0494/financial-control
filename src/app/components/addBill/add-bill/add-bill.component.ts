import { Component, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BillService } from '../../../services/bill/bill.service';
import { BillDTO } from '../../bill/bill/bilDTO';

@Component({
  selector: 'app-add-bill',
  imports: [ReactiveFormsModule],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css',
})
export class AddBillComponent {

  constructor(private billService: BillService) {

  }

  form = new FormGroup({
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    value: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required,
    }),
    dueDate: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const billDTO: BillDTO = {
      id: crypto.randomUUID(),
      description: this.form.value.description!,
      value: this.form.value.value!,
      dueDate: this.form.value.dueDate!,
      payed: false,
    };

    this.billService.addBill(billDTO);

    this.form.reset();

    this.closeModal();
  }

  closeModal() {
    this.billService.close();
  }
}
