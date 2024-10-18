import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeModalComponent, MatTableModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EmployeeModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }

  openUpdateDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeModalComponent, { data: employee });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}