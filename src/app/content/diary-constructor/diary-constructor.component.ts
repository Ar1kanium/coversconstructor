import { Component, OnInit } from '@angular/core';
import {ICover} from "../../models/ICover";
import {IBadge} from "../../models/IBadge";
import {FirebaseService} from "../../services/firebase.service";
import {take} from "rxjs/operators";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {ContactFormComponent} from "../contact-form/contact-form.component";


@Component({
  selector: 'app-diary-constructor',
  templateUrl: './diary-constructor.component.html',
  styleUrls: ['./diary-constructor.component.css']
})
export class DiaryConstructorComponent implements OnInit{

  covers: ICover[] | [] = []
  badges: IBadge[] | [] = []
  lettering: string = ''
  fontSize: number = 15
  chosenCover?: ICover
  chosenBadge?: IBadge
  totalPrice:number = 0

  constructor(private fb: FirebaseService,
              public dialogService: DialogService,
              public messageService: MessageService) {
  }


  ngOnInit(): void {
    this.fb.covers$.pipe(take(1)).subscribe((el:ICover[]) => this.covers = el)
    this.fb.badges$.pipe(take(1)).subscribe((el:IBadge[]) => this.badges = el)
  }


  countPrice = (): void => {
    let countSum = 0
    if (this.chosenCover) countSum+=this.chosenCover.price
    if (this.chosenBadge) countSum+=this.chosenBadge.price
    this.totalPrice = countSum
  }


  openContactForm = ():void => {
    const ref = this.dialogService.open(ContactFormComponent, {
      header: 'Контактные данные',
      width: 'min(90vw, 500px)',
      baseZIndex: 10000,
    })

    ref.onClose.subscribe((answer) =>{
      if (answer) {
        this.messageService.add({severity:'success', summary:'Заказ принят', detail:`Оператор свяжется с Вами в ближайшее время.`})
      }
    })
  }

}
