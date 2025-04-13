import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../Services/notification.service';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  private dialogRef = inject(MatDialogRef);
  private snack = inject(NotificationService);
  private userSer = inject(UserService);
  private fb = inject(FormBuilder);
isOtpVerified:boolean=false
  verifyForm!: FormGroup;
  isOtpSent: boolean = false;
  otp: any;

  constructor() {
    this.verifyForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.dialogRef.close(true);
  }

  sendOtp() {
    const email = this.verifyForm.get('email')?.value;
    this.isOtpVerified=false
    if (email) {
      const body = {
        phone: email,
      };
      this.userSer.verifyMail(body).subscribe({
        next: (res) => {
          this.otp = res;
          this.isOtpSent = true;
          this.snack.showSuccess('OTP has been sent to your phone number');
        },
        error: () => {
          this.snack.showError('Failed to send OTP');
        },
      });
    }
  }

  resendOtp() {
    this.sendOtp(); // just call the same method again
  }

  onVerify() {
    const email = this.verifyForm.get('email')?.value;
    const otp = this.verifyForm.get('otp')?.value;
    if (email && otp) {
      const body = {
        phone: email,
        otp: otp,
      };
      this.userSer.verifyOtp(body).subscribe({
        next: (res: any) => {
          if (res.verified) {
            this.isOtpVerified=true
            this.snack.showSuccess('OTP has been verified');
          } else {
            this.isOtpVerified=false
            this.snack.showError('Invalid OTP entered');
          }
        },
        error: () => {
          this.snack.showError('OTP verification failed');
        },
      });
    }
  }
}