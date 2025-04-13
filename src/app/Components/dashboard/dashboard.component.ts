import { Component, EventEmitter, inject } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { UserlistComponent } from '../userlist/userlist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../CommonDialog/dialog/dialog.component';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, UserlistComponent, MatIconModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService = inject(UserService);
  travellingFrom: string = '';
  travellingTo: string = '';
  userAdded:boolean=false
  private dialog = inject(MatDialog);
  constructor() {}
  applyFilters(from: string, to: string) {
    this.travellingFrom = from.trim().toLowerCase();
    this.travellingTo = to.trim().toLowerCase();
  }
  clearFilters(fromInput: HTMLInputElement, toInput: HTMLInputElement) {
    fromInput.value = '';
    toInput.value = '';
    this.travellingFrom = '';
    this.travellingTo = '';
  }
  CreateTrp() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Create Trip inside Pune' },
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        debugger;
        if (data) {
          const userData = {
            "id":0,
            "name": data.Name,
            "travellingFrom": data.TravellingFrom,
            "travellingTo": data.TravellingTo,
            "date": data.Date,
            "departure": data.Departure,
            "arrival": data.Arrival,
            "travellingRate": data.TravellingRate,
            "rating": data.Rating,
            "totalDistance": data.TotalDistance,
          };

          this.userService.createUser(userData).subscribe({
            next:(data)=>{
              debugger
              console.log(data);
              this.userAdded=true
            }
          })
        }
      },
    });
  }
}
