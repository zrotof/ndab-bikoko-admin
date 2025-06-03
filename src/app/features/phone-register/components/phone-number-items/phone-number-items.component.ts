import { Component, input } from '@angular/core';

@Component({
  selector: 'app-phone-number-items',
  imports: [],
  templateUrl: './phone-number-items.component.html',
  styleUrl: './phone-number-items.component.scss'
})
export class PhoneNumberItemsComponent {

  phoneNumbers = input.required<any>();
}
