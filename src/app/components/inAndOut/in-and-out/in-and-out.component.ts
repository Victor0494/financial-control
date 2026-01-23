import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-and-out',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './in-and-out.component.html',
  styleUrl: './in-and-out.component.css'
})
export class InAndOutComponent {
  @Input() icon: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() typeClass: string = '';
}