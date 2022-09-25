import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/shared/models/person';
import { ApiResponse } from 'src/app/shared/responses/api.response';
import { AddPersonResponse } from 'src/app/shared/responses/person/add.response';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.dialog.html',
  styleUrls: ['./form-person.dialog.css']
})
export class FormPersonDialog {

  operation: string = 'Add';

  formPerson = this._formBuilder.group({
    document: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<FormPersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: string, person: Person },
    private _formBuilder: FormBuilder,
    private _personService: PersonService
  ) {
    if(this.data.isUpdate) {
      this.operation = 'Edit';
      this.formPerson.controls.document.setValue(data.person.document);
      this.formPerson.controls.firstName.setValue(data.person.firstName);
      this.formPerson.controls.lastName.setValue(data.person.lastName);
    }

  }

  ngOnInit(): void {
  }

  OnSubmit(){

    const person: Person = {
      document: this.formPerson.controls.document.value,
      firstName: this.formPerson.controls.firstName.value,
      lastName: this.formPerson.controls.lastName.value
    }

    if(!this.data.isUpdate){
      this._personService.Add(person).subscribe((resp: AddPersonResponse) => {
        this.dialogRef.close(resp);
      });
    }

    if(this.data.isUpdate){
      person.id = this.data.person.id;
      this._personService.Update(person).subscribe((resp: ApiResponse) => {
        this.dialogRef.close(resp);
      });
    }
  }

}
