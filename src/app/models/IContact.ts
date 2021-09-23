export interface IContact {
  firstName:string
  lastName:string
  communicationMethod: 'WhatsApp' | 'Viber' | 'Telegram'
  phoneNumber: string
  communicationInfo: string
}
