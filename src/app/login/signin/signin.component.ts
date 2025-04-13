import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { userRoles } from '../userRole';
import { NotificationService } from '../../Services/notification.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  user=userRoles
  private snack=inject(NotificationService)
  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Register() {
    this.router.navigate(['/signup']);
  }
  logIn() {
    debugger;
    if (this.loginForm.valid) {
      const enteredEmail = this.loginForm.value.userName;
      const enteredPassword = this.loginForm.value.password;
      const matchedUser = this.user.find(user =>
        user.email === enteredEmail && user.password === enteredPassword
      );
if(matchedUser){
  localStorage.setItem("role",matchedUser.roleName)
  this.router.navigate(['/dashboard']);
} else{
  this.snack.showError("Email/Password invaild, Please signup.")
}     
    }
  }
  resetPass() {
    this.router.navigate(['/resetpass']);
  }
}
