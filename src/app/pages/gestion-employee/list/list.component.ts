import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public listEmployees: any[] = [];
  public departments: any[] = [];
  public selectedEmployee: any = null;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }

  getEmployees(): void {
    this.empService.getEmployees().subscribe(
      (data) => {
        console.log(data);
        this.listEmployees.push(...data);
      },
      (err) => console.log(err)
    );
  }
  getDepartmentName(id: number): string {
    const department = this.departments.find(d => d.id === id);
    return department ? department.departmentName : '';
  }
  getDepartments(): void {
    this.empService.getDepartments().subscribe(
      data => {
        console.log(data);
        this.departments = data;
      },
      err => console.log(err)
    );
  }
  openEditForm(employee: any): void {
    this.selectedEmployee = employee;
  }
  closeEditForm(): void {
    this.selectedEmployee = null;
  }
  submitEditForm(): void {
    this.empService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee )
      .subscribe(
        (data) => {
          console.log(data);
          
          this.closeEditForm();
          const index = this.listEmployees.findIndex(e => e.id === this.selectedEmployee.id);
          if (index !== -1) {
            this.listEmployees[index] = data;
          }
          this.empService.getEmployees().subscribe((data) => {
            this.departments = data;  });
        },
        (err) => console.log(err)
      );
  }
  

  deleteEmployee(employee: any): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(employee.id).subscribe(
        () => {
          console.log('Employee deleted successfully');
          const index = this.listEmployees.indexOf(employee);
          if (index !== -1) {
            this.listEmployees.splice(index, 1);
          }
        },
        (err) => console.log(err)
      );
    }
  }
}
