import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  map
} from "rxjs/operators";
import {
  environment
} from '../../../src/environments/environment'

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {
  apiURL: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
  }
  searchEvents(data) {
    return this.http.post(this.apiURL + 'searcheventbyemail',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }
}
