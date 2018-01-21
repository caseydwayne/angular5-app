import { SafeStyle, SafeUrl } from '@angular/platform-browser';

export class Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: object;
  images: object;
  comments: object;
}

export class EventFormatted {
  id: string;
  name: string;
  description: string;
  location: object;
  image: SafeUrl | string;
  thumbnail: SafeStyle | string;
  rsvp: boolean;
  more: object;
}
