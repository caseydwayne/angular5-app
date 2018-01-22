import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import { RequestService } from '../http/request.service';
import { MatSnackBar } from '@angular/material';
import { EventFormatted } from './event';

/*
 * Creates valid "Event" object for /event/* components
 */

@Injectable()
export class DetailsService implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private request: RequestService,
    private snackBar: MatSnackBar
  ) {}

  private event: Observable<EventFormatted>;

  private events_loaded = 0;
  private events_max = 2;

  /*
   * @method eventFormat
   * all {event} require the following schema to work with event.component and events/list.component
   */

  eventFormat () {
    return Observable.of({
      id: 'uniqueidstring',
      name: 'Event Name',
      description: 'Descriptive text describing event.',
      location: { city: 'Knoxville', state: 'Tennessee' },
      image: 'assets/event.jpg',
      thumbnail: 'assets/event-thumbnail.jpg',
      rsvp: true,
      more: {
        images: [],
        comments: [],
        date: new Date()
      }, // store extra data (comments, images) here, if needed
      ready: false
    });
  }

  /*
   * @method eventData
   * replaces private event values with select raw values
   */

  eventData( event ) {
    this.event.subscribe(
      evt => {
        evt.id = event.id;
        evt.name = event.name;
        evt.description = event.description;
        evt.location = event.location;
        evt.more = {
          date: new Date( event.date ),
          comments: event.comments,
          images: event.images
        };
      }
    );
  }

  /*
   * @method _arrayBufferToBase64
   * modified from https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   */

  _arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  /*
   * @method eventData
   * converts image path to TrustUrl for (src)="<TrustUrl>"
   */

  eventImage () {
    const event = this.event;
    event.subscribe(
      evt => {
        const temp = evt.image as string;
        const img = this.sanitizer.bypassSecurityTrustUrl( temp );
        evt.image = img as string;
      }
    );
  }

  /*
   * @method eventThumbnail
   * sets safe thumb-nail image from API URL
   */

  eventThumbnail () {
    const event = this.event;
    event.subscribe(
      evt => {
        if (
          evt.more
          && evt.more.images
          && evt.more.images[0]
          && evt.more.images[0].id
        ) {
          const img_id = evt.more.images[0].id;
          const src = this.request.getImage( evt.id, img_id ) as string;
          console.log( `found ${src} for ${evt.id}` );
          evt.thumbnail = this.sanitizer.bypassSecurityTrustStyle(`url(${src})`) as string;
        }
      }
    );
  }
  /*
   * @method _fixStatus
   * fixes invalid database data type (forces { coming: <boolean> })
   */

  _fixStatus ( event ) {
    this.request.updateStatus( event, false );
  }

  /*
   * @method eventStatus
   * retrieves RSVP status for the provided event
   */

  eventStatus() {
    const cap = 5;
    this.event.subscribe(
      evt => {
        this.request.getStatus( evt )
          .retry(5)
          .subscribe(
            _user => {
              // only accept { coming: <boolean> }
              if ( typeof _user === 'object' && _user !== null ) {
                if ( 'coming' in _user ) { evt.rsvp = _user['coming']; }
              } else {
                this._fixStatus( evt );
              }
              // console.log( `Event: ${event.id} | User Status: ${this.event.rsvp}` );
            },
            // retry until successful
            err => {
              // this.eventStatus( event );
            }
          );
      }
    );
  }


  /*
   * @method eventImages
   * form a image.src URL for all images in the more.images array
   */

  eventImages () {
    const event = this.event;
    event.subscribe(
      evt => {
        evt.more.images.forEach(
          (img) => {
            const src = this.request.getImage( evt.id, img.id );
            console.log( `Found image for ${evt.id}... ${src}` );
            img.src = src;
          }
        );
      }
    );
  }

  /*
   * @method eventDetails
   * accepts an Event and USER_ID. transforms raw Event from database into a more usable format.
   */

  public eventDetails ( event, user, test?: boolean ) {
    // prevent output if loaded >= max
    if ( this.events_loaded < this.events_max ) {
      this.event = this.eventFormat();
      this.eventData( event );
      if ( !test ) {
        this.eventThumbnail();
        this.eventImage();
        this.eventStatus();
        // this.eventImages();
      }
      this.events_loaded++;
    }
    this.event.subscribe(
      evt => console.log(evt)
    );
    setTimeout( () => { this.event.subscribe( evt => evt.ready = true ); }, 150 );
    return this.event;
  }

  ngOnInit(): void {}

}
