import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { userRoles } from '../userRole';
import { NgFor } from '@angular/common';
import { NotificationService } from '../../Services/notification.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

 signupForm!: FormGroup;
 userRoles=userRoles
 selectedPermissions: string[] = [];
 private snak=inject(NotificationService)
  constructor(private router: Router, private fb: FormBuilder) {

    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      permissions: [[]]
    });
    
  }
  onRoleChange(event: Event) {
    debugger
    const selectedRoleName = (event.target as HTMLSelectElement).value;
    const selectedRole = this.userRoles.find(role => role.roleName === selectedRoleName);
    if (selectedRole) {
      this.selectedPermissions = selectedRole.permissions;
      this.signupForm.patchValue({ permissions: selectedRole.permissions });
    }
  }
  ngOnInit(): void {

  }

  signup(){
    if(this.signupForm.valid){
      const userEmail=this.signupForm.value.userName
      const duplicateMail= this.userRoles.find((role)=>role.email ==userEmail)
      if(!duplicateMail){
        this.userRoles.push(this.signupForm.value)
        this.router.navigate(['/signin'])
      }else{
        this.snak.showError("User email already exist.")
      }
    }
  }
}
