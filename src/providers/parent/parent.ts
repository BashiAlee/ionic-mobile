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
  Generated class for the ParentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParentProvider {
  apiURL: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
  }
  getMentorFormStatus(id) {
    let data = {
      userid: id
    }
    return this.http.post(this.apiURL + 'getmentorrequeststatus', data)
    .pipe(map((response: any) => {
      return response;
    }));
  }

  GetParentsKids(data) {
    let user = {
      parentemail: data
    }
    return this.http.post(this.apiURL + 'getparentkids', user)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
