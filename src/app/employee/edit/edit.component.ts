import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  employee: Employee;
  form: FormGroup;
  fileUploaded: boolean;
  EditFile:boolean = false;
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
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      photo_url: new FormControl('', Validators.required),
      fileSource: new FormControl('')
    });
  }

  editImage(){
    this.EditFile = !this.EditFile;
  }
  onFileSelected(event:any) {    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
      this.fileUploaded = true;
    }
  }

  get f(){
    return this.form.controls;
  }

  submit(){

    const imageName = this.form.value.photo_url;
   
    // const imageFile = URL.createObjectURL(new Blob([this.form.value.fileSource] , {type:'image/jpeg'}));
    // // console.log('file is it?',imageFile);
    // if(this.form.value.fileSource === ''){
    //   const imageBlob = this.dataURItoBlob(this.form.value.fileSource); // converts base64 sent by getbyid api to File
    //   const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    //   this.form.patchValue({
    //     fileSource: imageFile,
    //     name:this.employee.name,
    //     email:this.employee.email,
    //     number:this.employee.number,
    //   });
    // }    
    console.log('submmitted',this.form.value);
        const formData2: FormData = new FormData();
    const file: any = this.form.value.fileSource;
    console.log('file data',file);
    // formData2.set('fileSource', file,file.name);
    // formData2.append('name',this.form.value.name);
    // formData2.append('email',this.form.value.email);
    // formData2.append('number',this.form.value.number);
    // formData2.append('photo_url',this.form.value.photo_url);
    // console.log('formdata',formData2);
    this.employeeService.update(this.id, this.form.value).subscribe(res => {
         console.log('Employee updated successfully!');
         this.router.navigateByUrl('employee/index');
    })
  }

  imageUpdate(){
    console.log('file update',this.form.value);
    this.employeeService.updateImage(this.id, this.form.value).subscribe(res => {
         console.log('Employee updated successfully!');
         this.router.navigateByUrl('employee/index');
    })
  }

  dataURItoBlob(dataURI:any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }
}
