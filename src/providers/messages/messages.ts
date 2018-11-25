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
export class MessagesProvider {
  apiURL: any;
  localData: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
  }

  getAllMessagesDetails(data) {
    return this.http.post(this.apiURL + 'getusermessagesdetail',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getUserMessages(data) {
    return this.http.post(this.apiURL + 'getusermessages',data)
    .pipe(map((response: any) => {
     return response;

  }));
  }
  sendUserMessages(data) {
    return this.http.post(this.apiURL + 'addusermessages',data)
    .pipe(map((response: any) => {
     return response;

  }));
  }


  getStatusOfChat(data) {
    return this.http.post(this.apiURL + 'getuserchatstatus',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }
}
