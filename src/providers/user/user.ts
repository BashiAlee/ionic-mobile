import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    console.log("DDD----------   =====  ", file, fileName)
    let formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append( 'Access-Control-Allow-Origin' , '*')
    formData.append('file',file,fileName);

    console.log("DDD", file) 
    console.log("DDDname ", fileName) 
    return this.http.post(this.staticURL,formData,  {
      headers: headers
    }) .pipe(map((response: any) => {

     return response;
  }));
  }
  uploadImage(formData) {
    return this.http.post(this.staticURL,formData)
    .pipe(map((response: any) => {
    console.log("DDDD", response)
     return response
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
