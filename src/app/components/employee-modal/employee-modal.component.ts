import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent {
  employee: Employee = { id: 0, name: '', lastName: '', email: '', pisNumber: '' };

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) private data: Employee
  ) {
    if (data) {
      this.employee = { ...data };
    }
  }

  save() {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => this.dialogRef.close());
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => this.dialogRef.close());
    }
  }
}