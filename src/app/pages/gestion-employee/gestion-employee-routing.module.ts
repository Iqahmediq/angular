import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDepartmentComponent } from '../gestion-department/gestion-department.component';
import { GestionEmployeeComponent } from './gestion-employee.component';

const routes: Routes = [
  {
    path: '',
    component: GestionEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEmployeeRoutingModule { }
