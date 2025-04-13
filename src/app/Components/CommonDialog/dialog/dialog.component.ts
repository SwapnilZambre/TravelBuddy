import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PUNE_AREAS } from '../../../../puneAreaNames';
import { combineLatest } from 'rxjs';
import { NotificationService } from '../../../Services/notification.service';
import { GoogleMapService } from '../../../Services/google-map.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  title: string = '';
  form!: FormGroup;
  puneAreaNames = PUNE_AREAS;
  minDate: string = '';
  // For Travelling From
  filteredFromAreas: string[] = [];
  showFromDropdown: boolean = false;

  // For Travelling To
  filteredToAreas: string[] = [];
  showToDropdown: boolean = false;

  private snackBar = inject(NotificationService);
  private dialogRef = inject(MatDialogRef);
  private dialog = inject(MatDialog);

  private fb = inject(FormBuilder);
  private googleService = inject(GoogleMapService);
  isViewOnly: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.isViewOnly = data.isViewOnly;
    this.initForm(data.tripDetails);
  }

  ngOnInit(): void {
    this.disableBeforeDate()
    this.filteredFromAreas = [...this.puneAreaNames];
    this.filteredToAreas = [...this.puneAreaNames];

    const from$ = this.form.get('TravellingFrom')!.valueChanges;
    const to$ = this.form.get('TravellingTo')!.valueChanges;

    combineLatest([from$, to$]).subscribe(([from, to]) => {
      if (from && to && from !== to) {
        this.fetchDistance(from, to);
      } else {
        this.snackBar.showError('Distance should be different');
      }
    });
  }

  initForm(tripDetails: any) {
    this.form = this.fb.group({
      Id: [tripDetails?.id || ''],
      Name: [tripDetails?.name || '', Validators.required],
      TravellingFrom: [tripDetails?.travellingFrom || '', Validators.required],
      TravellingTo: [tripDetails?.travellingTo || '', Validators.required],
      Date: [tripDetails?.date || '', Validators.required],
      Departure: [tripDetails?.departure || '', Validators.required],
      Arrival: [tripDetails?.arrival || '', Validators.required],
      TravellingRate: [tripDetails?.travellingRate || '', Validators.required],
      Rating: [Math.round(tripDetails?.rating) || 0, Validators.required],
      TotalDistance: [0],
    });
    if (this.isViewOnly) {
      this.form.disable();
    }
  }

  fetchDistance(from: string, to: string) {
    this.googleService.getDistance(from, to).subscribe({
      next: (data) => {
        const distance = data.distanceKm;
        this.form.get('TotalDistance')?.setValue(distance);
        const ratePerKm = 4; // Configurable rate
        const travellingRate = parseFloat((distance * ratePerKm).toFixed(2));
        this.form.patchValue({ TravellingRate: travellingRate });
      },
    });
  }

  // Travelling From Logic
  filterFromAreasFromEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.filterFromAreas(target.value);
    }
  }

  filterFromAreas(searchTerm: string) {
    if (!searchTerm) {
      this.filteredFromAreas = [...this.puneAreaNames];
    } else {
      this.filteredFromAreas = this.puneAreaNames.filter((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  selectFromArea(area: string) {
    this.form.get('TravellingFrom')?.setValue(area);
    this.showFromDropdown = false;
  }

  // Travelling To Logic
  filterToAreasFromEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.filterToAreas(target.value);
    }
  }

  filterToAreas(searchTerm: string) {
    if (!searchTerm) {
      this.filteredToAreas = [...this.puneAreaNames];
    } else {
      this.filteredToAreas = this.puneAreaNames.filter((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  selectToArea(area: string) {
    this.form.get('TravellingTo')?.setValue(area);
    this.showToDropdown = false;
  }

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  setRating(star: number) {
    this.form.get('Rating')?.setValue(star);
  }
  onAccept() {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {});

    dialog.afterClosed().subscribe({
      next: (isTrue) => {
        if (true) {
          //on accept need to send message to the traveller , also before accept need to verify the user
          debugger;
        }
      },
    });
  }
  disableBeforeDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }
}
