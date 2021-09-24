import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {LocalService} from "../../services/local.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  contactForm: FormGroup
  communicationMethods: string[] = ['WhatsUp', 'Telegram', 'Viber', 'Instagram', 'VK']
  communicationChosenMethod: string | null = this.communicationMethods[0]

  constructor(private fb: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private local: LocalService) {
    this.contactForm = this.fb.group({
      firstName: [this.local.getFromLocal('firstName'), [Validators.required]],
      lastName: this.local.getFromLocal('lastName'),
      phoneNumber: [this.local.getFromLocal('phoneNumber'), [Validators.required]],
      nickName: this.fb.array([]),
      communicationInfo: this.local.getFromLocal('communicationInfo'),
    })
    this.contactForm.valueChanges.subscribe((v) => {
      this.local.storeToLocal(v)
    })
  }



  ngOnInit(): void {
    if (this.local.getFromLocal('communicationChosenMethod')) {
      const ind = this.communicationMethods.indexOf(<string>this.local.getFromLocal('communicationChosenMethod'))
      if (ind !== -1) this.communicationChosenMethod = this.communicationMethods[ind]
    }

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
    this.getNickNameControls().push(this.fb.control(this.local.getFromLocal('nickName'), [Validators.required]))
  }

  deleteNickNameField = () => {
    this.getNickNameControls().clear()
  }


  defineValidatorsAndFields = () => {
    this.local.storeToLocal({communicationChosenMethod: this.communicationChosenMethod})
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
