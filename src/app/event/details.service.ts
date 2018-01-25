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
  private events_max = 80; // limits additional calls to the server

  /*
   * @method eventFormat
   * all {event} require the following schema to work with event.component and events/list.component
   */

  eventFormat () {
    return ({
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
   * @method eventData
   * converts image path to TrustUrl for (src)="<TrustUrl>"
   */

  eventImage () {
    const event = this.event;
    let src = '';
    event.subscribe(
      evt => {
        src = evt.image as string;
        if (
          evt.more
          && evt.more['images']
          && evt.more['images'][1]
          && evt.more['images'][1].id
        ) {
          const img_id = evt.more['images'][1].id;
          src = this.request.getImage( evt.id, img_id ) as string;
        }
        const img = this.sanitizer.bypassSecurityTrustUrl( src );
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
          && evt.more['images']
          && evt.more['images'][0]
          && evt.more['images'][0].id
        ) {
          const img_id = evt.more['images'][0].id;
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
    this.request.updateStatus( event, false, true );
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
        evt.more['images'].forEach(
          (img) => {
            const src = this.request.getImage( evt.id, img.id );
            console.log( `Found image for ${evt.id}... ${src}` );
            img.src = this.sanitizer.bypassSecurityTrustUrl( src );
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
    if ( this.events_max > 0 && this.events_loaded < this.events_max ) {
      // console.log( 'Processing Event', event.id );
      // Create observable of generic EventFormatted
      this.event = Observable.of( this.eventFormat() );
      // replace generic data with Event values
      this.eventData( event );
      // set placeholder images
      this.event.subscribe(
          evt => {
            evt.image = this.sanitizer.bypassSecurityTrustUrl( 'assets/event.jpg' );
            evt.thumbnail = this.sanitizer.bypassSecurityTrustStyle(`url('assets/event-thumbnail.jpg')`) as string;
          }
        );
      // activate additional API calls if not in demo mode
      if ( !test ) {
        this.eventThumbnail();
        this.eventImage();
        this.eventStatus();
        this.eventImages();
      }
      this.events_loaded++;
    }
    this.event.subscribe(
      // evt => console.log(evt)
    );
    // trigger ready after .25s delay (UX choice, feels more natural)
    setTimeout( () => { this.event.subscribe( evt => evt.ready = true ); }, 250 );
    return this.event;
  }

  ngOnInit(): void {}

}
