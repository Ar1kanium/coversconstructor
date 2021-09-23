import {ICover} from "./ICover";
import {IBadge} from "./IBadge";
import {IContact} from "./IContact";

export interface IOrder {
  cover: ICover
  contact: IContact
  badge?: IBadge
  title: string
  fontSize: number
  price: number
}
