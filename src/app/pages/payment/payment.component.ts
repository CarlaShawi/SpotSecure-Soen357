import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  async submitPayment() {
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
        ).then((result) => {
          if (result.isConfirmed) {
            this.notificationService.fetchNotification(2);
            // Navigate to the history list after the payment confirmation
            this.router.navigate(['history-list']);
          }
          // Show another notification (ID 3) after a delay of 3 seconds
          setTimeout(() => {
            this.notificationService.fetchNotification(3);
          }, 3000);
        });
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
