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
  image: string;
  rsvp: boolean;
  more: object;
}
