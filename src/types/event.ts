import { EventName } from "../enums/event"

export type Event = {
  type: keyof typeof EventName,
  title: string, 
  text: string,
  img: string,
  href: string
}