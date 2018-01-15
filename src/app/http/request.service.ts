import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

// const API_URL = 'https://developer.ticketmaster.com/api-explorer/#9d789114-805f-9d5d-95ff-655e5af75ddf';

const API_URL = environment.api_url;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RequestService implements OnInit {

  constructor(private http: HttpClient) {}

  results: Object;

  private request( path: String, cb: Function ): void {
    const destination = API_URL + path;
    this.http.get( destination, HTTP_OPTIONS )
      .subscribe(
        data => {
          console.log( 'Found Data:', data );
          this.results = data;
          cb( data );
        },
        error => {
          console.log( 'Could not get data from', destination, error );
        }
      );
  }

  public getEvents( cb ) {
    this.request( 'events', cb );
  }

  ngOnInit(): void {
    alert('Found Data');
    this.getEvents( (data) => { alert('Found Data'); } );
  }

}
