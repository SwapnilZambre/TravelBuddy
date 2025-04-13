import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { userRoles } from '../userRole';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  showPassword = false;
  userDetails=userRoles
  showConfirmPassword = false;  
  showPasswordFields: boolean = false;
  constructor(private router: Router, private fb: FormBuilder,private snack:NotificationService) {
    this.resetForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit() {}

  Register() {
    this.router.navigate(['/signup']);
  }
  resetPass() {
    debugger;
    const userName= this.resetForm.get('userName')?.value
    const password= this.resetForm.get('password')?.value
    const confirmPassword=this.resetForm.get('confirmPassword')?.value
    const user = this.userDetails.find(u => u.email === userName);
    if (!user) {
      this.snack.showError('User not found');
      return;
    }
  
    if (password !== confirmPassword) {
      this.snack.showError('Passwords do not match');
      return;
    }
  
    // ✅ Replace current password
    user.password = password;
  
    this.snack.showSuccess('Password successfully updated!');
    this.router.navigate(['/signin'], {
      state: { email: userName }, // optionally pass email back
    });
  }
  nextStep() {
    const isValid = this.resetForm.get('userName')?.valid;
    if (isValid) {
      this.showPasswordFields = true;
    }else{
      this.snack.showError("Please enter valid user name");
    }
  }

togglePasswordVisibility(field: 'password' | 'confirm') {
  if (field === 'password') {
    this.showPassword = !this.showPassword;
  } else if (field === 'confirm') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
}
