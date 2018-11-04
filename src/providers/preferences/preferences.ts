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


@Injectable()
export class PreferencesProvider {
  apiUrl: any;
  constructor(public http: HttpClient) {
    this.apiUrl = environment.url;
  }

  getAllPreferences() {
    return this.http.get(this.apiUrl + 'getallpreferences')
      .pipe(map((response: any) => {
       return response;

    }));
  }


  addUserPreferences(data) {
    return this.http.post(this.apiUrl + 'adduserpreferences', data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getUserPreferences(data) {
    return this.http.post(this.apiUrl + 'getuserpreferences',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getSuggestedPreferences(data) {
    return this.http.post(this.apiUrl + 'usersuggestionpreferences',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

}
