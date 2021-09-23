import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  contactForm: FormGroup
  communicationMethods = ['WhatsUp', 'Telegram', 'Viber']
  communicationChosenMethod: string = this.communicationMethods[0]
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.contactForm = this.fb.group({
      firstName: ['' ,[Validators.required]],
      lastName: '',
      phoneNumber: ['',[Validators.required]],
      communicationInfo: '',
    })
  }
  submit = () => {
    if (this.contactForm.invalid) {
      this.contactForm.controls['firstName'].markAsDirty()
      this.contactForm.controls['phoneNumber'].markAsDirty()
      return
    }
    this.ref.close({...this.contactForm.value, communicationChosenMethod: this.communicationChosenMethod})
  }


}
