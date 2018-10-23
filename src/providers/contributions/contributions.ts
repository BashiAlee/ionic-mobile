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

/*
  Generated class for the ContributionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContributionsProvider {
  apiURL: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
  }

  getUserConstributionsbyEmail(data) {
    var user ={useremail: data };
    return this.http.post(this.apiURL + 'searchcontribution', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

}
