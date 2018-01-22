import { Event } from '../event/event';

export const EVENTS: Event[] = [
  {
    id: '59d2bd5a2b92b0ceeed8eec7',
    name: 'Test Event 1',
    description: 'Lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.',
    date: '2017-10-02T05:27:38+05:00',
    location: {
      city: 'Host City A',
      state: 'Nameofstate'
    },
    images: [
      {
        id: 'uHAis0T+SuSywBdWX0j+UQ==',
        caption: 'Lorum ipsum caption text'
      }
    ],
    comments: [
      {
        from: 'Joe Blow',
        text: 'A lot of work for an interview assignment.'
      }
    ]
  },
  {
    id: '59d2bd5a2b92b0ceeed8eec3',
    name: 'Test Event 2',
    description: 'Lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.',
    date: '2017-10-02T05:27:38+05:00',
    location: {
      city: 'Host City B',
      state: 'Nameofstate'
    },
    images: [
      {
        id: 'uHAis0T+SuSywBdWX0j+GQ==',
        caption: 'Lorum ipsum caption text'
      }
    ],
    comments: [
      {
        from: 'Joe Blow',
        text: 'A lot of work for an interview assignment.'
      }
    ]
  }
];
