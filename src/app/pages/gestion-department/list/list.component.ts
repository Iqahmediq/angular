import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})




export class ListComponent implements OnInit {
  departments: any[] = [];
    selectedDepartment: any;
  showUpdateForm: boolean = false;
  form!: FormGroup;
  submitted: boolean=false;

  constructor(private fb: FormBuilder,private depService: DepartmentService) {

   }

  ngOnInit(): void {
    this.loadListDepartments();
    this.form = this.fb.group({
      departmentName: ['', Validators.required]
    });
  }
  onUpdate(department: any) {
    this.selectedDepartment = department;
    this.form.controls['departmentName'].setValue(this.selectedDepartment.departmentName);
    this.showUpdateForm = true;
  }
  
loadListDepartments(): void {
  this.depService.getListDepartments().subscribe(data=>{
    console.log(data);
  this.departments.push(...data);},
  err=>console.log(err));
}
onSubmit(): void {
  
    const departmentName = this.form.value.departmentName;
    this.depService.postDepartments({ departmentName })
      .subscribe((newDepartment) => {
        this.depService.getListDepartments().subscribe((data) => {
          this.departments = data;  });
      }, (error) => {
      });
  
}
onUpdateSubmit() {
  const department = { id: this.selectedDepartment.id, departmentName: this.form.value.departmentName };
  this.depService.updateDepartment(department).subscribe(() => {
    this.showUpdateForm = false;
        this.depService.getListDepartments().subscribe((data) => {
      this.departments = data;  });
  });
}
editDepartment(department: any): void {
  this.selectedDepartment = department;
  this.form.setValue({
    id: department.id,
    departmentName: department.departmentName
  });
}

}
