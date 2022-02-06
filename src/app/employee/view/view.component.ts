import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  employee: Employee;
  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    console.log('id',this.id);
    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      console.log('get by id',data);
      //return;
      this.employee = data;
    });
  }

}
