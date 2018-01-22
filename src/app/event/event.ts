import { SafeStyle, SafeUrl } from '@angular/platform-browser';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: object;
  images: object;
  comments: object;
}

export interface EventFormatted {
  id: string;
  name: string;
  description: string;
  location: object;
  image: SafeUrl | string;
  thumbnail: SafeStyle | string;
  rsvp: boolean;
  more: object;
  ready: boolean;
}
