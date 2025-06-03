import { Component, inject } from '@angular/core';
import { PhoneNumberService } from 'src/app/core/services/phone-number/subscriber.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { PhoneNumberItemsComponent } from './components/phone-number-items/phone-number-items.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-phone-register',
  templateUrl: './phone-register.component.html',
  styleUrl: './phone-register.component.scss',
  imports: [
    AsyncPipe,
    PageTopHeaderComponent,
    PhoneNumberItemsComponent
  ],
})

export class PhoneRegisterComponent {

  protected readonly topHeaderPageData = { title: "Numéros", description: "Gestion des numéros" }

  private readonly phoneNumberService = inject(PhoneNumberService);

  protected phoneNumbers = this.phoneNumberService.getPhoneNumbers();
}
