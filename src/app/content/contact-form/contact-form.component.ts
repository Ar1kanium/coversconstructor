import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {LocalService} from "../../services/local.service";
import {debounceTime} from "rxjs/operators";


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  contactForm: FormGroup
  communicationMethods: string[] = ['WhatsUp', 'Telegram', 'Viber', 'Instagram', 'VK']

  constructor(private fb: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private local: LocalService) {
    this.contactForm = this.fb.group({
      firstName: [this.local.getFromLocal('firstName'), [Validators.required]],
      lastName: this.local.getFromLocal('lastName'),
      communicationChosenMethod: this.getCommunicationMethodOnInit(),
      phoneNumber: [this.local.getFromLocal('phoneNumber'), [Validators.required]],
      nickName: this.fb.array([]),
      communicationInfo: this.local.getFromLocal('communicationInfo'),
    })
  }



  ngOnInit(): void {
    this.contactForm.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((v) => {
        const resultedObj = {...v}
        if (resultedObj['nickName'].length) {
          resultedObj['nickName'] = resultedObj['nickName'][0]
        }
        else delete resultedObj['nickName']
        this.local.storeToLocal(resultedObj)
      })
    this.defineValidatorsAndFields()
  }

  submit = ():void => {
    if (this.contactForm.invalid) {
      this.contactForm.controls['firstName'].markAsDirty()
      this.contactForm.controls['phoneNumber'].markAsDirty()
      this.getNickNameControls().controls[0]?.markAsDirty()
      return
    }
    this.ref.close(this.contactForm.value)
  }

  getCommunicationMethodOnInit():string {
    if (this.local.getFromLocal('communicationChosenMethod')) {
      const ind = this.communicationMethods.indexOf(<string>this.local.getFromLocal('communicationChosenMethod'))
      if (ind !== -1) return this.communicationMethods[ind]
    }
    return this.communicationMethods[0]
  }

  getNickNameControls(): FormArray {
    return this.contactForm.controls['nickName'] as FormArray
  }

  addNickNameField = ():void => {
    this.getNickNameControls().push(this.fb.control(this.local.getFromLocal('nickName'), [Validators.required]))
  }

  deleteNickNameField = ():void => {
    this.getNickNameControls().clear()
  }


  defineValidatorsAndFields = ():void => {
    if (['VK', 'Instagram'].indexOf(this.contactForm.controls['communicationChosenMethod'].value) !== -1) {
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



