import { Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  contactForm: FormGroup
  communicationMethods: string[] = ['WhatsUp', 'Telegram', 'Viber', 'Instagram', 'VK']
  communicationChosenMethod: string = this.communicationMethods[0]

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: '',
      phoneNumber: ['', [Validators.required]],
      nickName: this.fb.array([]),
      communicationInfo: '',
    })
  }

  submit = () => {
    if (this.contactForm.invalid) {
      this.contactForm.controls['firstName'].markAsDirty()
      this.contactForm.controls['phoneNumber'].markAsDirty()
      this.getNickNameControls().controls[0]?.markAsDirty()
      return
    }
    this.ref.close({...this.contactForm.value, communicationChosenMethod: this.communicationChosenMethod})
  }

  getNickNameControls(): FormArray {
    return this.contactForm.controls['nickName'] as FormArray
  }

  addNickNameField = () => {
    this.getNickNameControls().push(this.fb.control('', [Validators.required]))
  }

  deleteNickNameField = () => {
    this.getNickNameControls().clear()
  }


  defineValidatorsAndFields = () => {
    if (this.communicationChosenMethod === 'Instagram' || this.communicationChosenMethod === 'VK') {
      if (!this.getNickNameControls().length) {
        this.addNickNameField()
        this.contactForm.controls['phoneNumber'].clearValidators()
        this.contactForm.controls['phoneNumber'].updateValueAndValidity()
      }
    } else {
      this.deleteNickNameField()
      this.contactForm.controls['phoneNumber'].setValidators([Validators.required])
      this.contactForm.controls['phoneNumber'].updateValueAndValidity()
    }
  }
}
