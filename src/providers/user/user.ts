import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  environment
} from '../../../src/environments/environment'
import {
  map
} from "rxjs/operators";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  apiURL: any;
  staticURL: any;
  constructor(public http: HttpClient) {
    this.apiURL = environment.url;
    this.staticURL = environment.uploadingUrl;
  }

  uploadCroppedImage(file,fileName) {
   
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type','multipart/form-data');
    formData.append('file',file,fileName);
    return this.http.post(this.staticURL,formData)
    .pipe(map((response: any) => {

     return response;
  }));
  }

  updateProfile(data) {
    var data = data;
    return this.http.put(this.apiURL + 'updateprofile', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  updateAboutMe(data) {
   
    return this.http.put(this.apiURL + 'editaboutme', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  viewProfileById(data) {
    var user =  { _id : data }
    return this.http.post(this.apiURL + 'viewprofilebyid', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

}
