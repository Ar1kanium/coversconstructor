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

  constructor(private fb: FirebaseService, public dialogService: DialogService, public messageService: MessageService) {
  }


  ngOnInit(): void {
    this.fb.covers$.pipe(take(1)).subscribe((el:ICover[]) => this.covers = el)
    this.fb.badges$.pipe(take(1)).subscribe((el:IBadge[]) => this.badges = el)
  }

  ifCoverChosen = ():boolean => !!this.chosenCover

  ifBadgeChosen = ():boolean => !!this.chosenBadge

  ifLetteringExist = ():boolean => (this.lettering.length > 0)

  countPrice = (): number => {
    let countSum = 0
    if (this.chosenCover) countSum+=this.chosenCover.price
    if (this.chosenBadge) countSum+=this.chosenBadge.price
    return countSum
  }
  getFontSize = ():string => `${this.fontSize}px`

  openContactForm = ():void => {
    const ref = this.dialogService.open(ContactFormComponent, {
      header: 'Контактные данные',
      width: 'min(90vw, 600px)',
      baseZIndex: 10000,
    })

    ref.onClose.subscribe((answer) =>{
      if (answer) {
        this.messageService.add({severity:'success', summary:'Заказ принят', detail:`Оператор свяжется с Вами в ближайшее время.`})
        console.log(answer)
      }
    })
  }

}
