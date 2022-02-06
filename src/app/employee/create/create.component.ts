import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  fileToUpload: File | null = null;

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) { }

  onFileSelected(event:any) {    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      photo_url: new FormControl('', Validators.required),
      fileSource: new FormControl('')
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    const formData: FormData = new FormData();
    formData.append('file', this.form.get('fileSource')?.value);
    console.log('ffff',this.form);
    this.employeeService.create(this.form.value).subscribe(res => {
         console.log('Employee created successfully!');
         this.router.navigateByUrl('employee/index');
    })
  }

}
