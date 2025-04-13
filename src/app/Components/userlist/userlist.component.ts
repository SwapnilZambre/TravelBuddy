import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from '../../Data/TemporaryData';
import { MatIconModule } from '@angular/material/icon';
import { HasRoleAccessDirective } from '../../Directives/has-role-access.directive';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../Services/notification.service';
import { DialogComponent } from '../CommonDialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    HasRoleAccessDirective,
    HttpClientModule,
  ],

  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() fromFilter: string = '';
  @Input() toFilter: string = '';
  @Input() userAdded: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);
  private snackBar = inject(NotificationService);
  userList: any = [];
  displayedColumns: string[] = [
    'No',
    'Name',
    'TravellingFrom',
    'TravellingTo',
    'TotalKm',
    'Date',
    'Departure',
    'Arrival',
    'TravellingRate',
    'Rating',
    'Actions',
  ];
  dataSource = new MatTableDataSource();
  private userService = inject(UserService);
  @ViewChild(MatSort) sort!: MatSort;
  private dialog=inject(MatDialog)
  constructor() {}

  ngOnInit() {
    debugger;
    this.getUserList();
  }
  getUserList() {
    this.userService.getUserList().subscribe({
      next: (userList) => {
        this.userList = userList;
        this.dataSource = new MatTableDataSource(this.userList);
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
    if (this.userAdded) {
      this.getUserList();
    }
  }

  applyFilters() {
    const from = this.fromFilter?.toLowerCase() || '';
    const to = this.toFilter?.toLowerCase() || '';
    this.dataSource.data = this.userList.filter((user: any) => {
      const fromMatch = user.travellingFrom.toLowerCase().includes(from);
      const toMatch = user.travellingTo.toLowerCase().includes(to);
      return fromMatch && toMatch;
    });
  }
  deleteUser(id: number,name:string) {
    this.userService.deleteUser(id).subscribe({
      next: (user: any) => {
        this.snackBar.showSuccess(`User Deleted Sucessfully ${name}`);
        this.getUserList()
      },
    });
  }
  editUser(data:any){
  const dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: 'Edit Trip Details' ,
        tripDetails:data
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (data:any) => {
        debugger;
        if (data) {
          const userData = {
            "id":data.Id,
            "name": data.Name,
            "travellingFrom": data.TravellingFrom,
            "travellingTo": data.TravellingTo,
            "date": data.Date,
            "departure": data.Departure,
            "arrival": data.Arrival,
            "travellingRate": data.TravellingRate,
            "rating": data.Rating,
          };

          this.userService.updateUser(data.Id,userData).subscribe({
            next:(data)=>{
              debugger
              console.log(data);
              this.getUserList()
            }
          })
        }
      },
    });
  }
  selectRow(data:any){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { 
        title: 'View Trip Details' ,
        tripDetails:data,
        isViewOnly:true
      },
    });
  }
}
