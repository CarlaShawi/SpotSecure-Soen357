import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  selectedPaymentMethod: string = '';
  paymentMethods: string[] = ['MasterCard', 'Visa', 'Debit Card', 'Cash'];

  paymentDetails = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  };

  submitPayment() {
    Swal.fire({
      title: 'Confirm Payment',
      text: 'Are you sure you want to proceed with this payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Payment Successful!',
          'Your payment has been processed.',
          'success'
        );
        // Additional payment processing logic would go here
      }
    });
  }

  onPaymentMethodChange() {}

  showCardForm(): boolean {
    // Shows form for Visa as well, assuming similar information is required
    return ['MasterCard', 'Visa', 'Debit Card'].includes(
      this.selectedPaymentMethod
    );
  }
}
