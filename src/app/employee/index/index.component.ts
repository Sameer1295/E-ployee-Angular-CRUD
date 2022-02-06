import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  employees: Employee[] = [];
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employees = data;
      const nn = typeof this.employees;
      console.log('swegegw',nn);
      console.log('swegegw',this.employees);
    })  
  }

  deleteEmployee(id:number){
    this.employeeService.delete(id).subscribe(res => {
         this.employees = this.employees.filter(item => item.id !== id);
         console.log('Employee deleted successfully!');
    })
  }

}
