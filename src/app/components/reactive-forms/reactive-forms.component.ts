import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  myReactiveForm! : FormGroup;
  notAllowedNames = ['Roni','Toni'];
  constructor() { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'username' : new FormControl('', [Validators.required, this.NANames.bind(this)]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'course' : new FormControl(''),
      'gender' : new FormControl(''),
      'skills' : new FormArray([
        new FormControl('',Validators.required)
      ])
    })
  }

  get f()
  {
    return this.myReactiveForm.controls;
  } 

  get skillFormArray(){
    return (<FormArray>this.myReactiveForm.get('skills')).controls;
  }

  onAddSkills(){
    const controlVal = new FormControl('',Validators.required);
    (<FormArray>this.myReactiveForm.get('skills')).push(controlVal)
  }

    NANames(control:FormControl){
      if(this.notAllowedNames.indexOf(control.value)!==-1){
        return {'nameIsNotAllowed':true}
      }
      return null;
    }
    
  onSubmit(){
    console.log(this.myReactiveForm);
    
  }

}
