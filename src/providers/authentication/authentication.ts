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
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  apiURL: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
  }
  login(data) {
    var data = data;
    return this.http.post(this.apiURL + 'login', data)
      .pipe(map((response: any) => {
        let user = response;
        if (user.status) {
          localStorage.setItem('user', JSON.stringify(user.data))
          localStorage.setItem('isLoggedIn', 'true');
          return user;
        } else {
          return user;
        }
      }));
  }

  signup(data) {
    var data = data;
    return this.http.post(this.apiURL + 'registration', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
