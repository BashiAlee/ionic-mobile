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

  uploadAudio(file) {
    let formData = new FormData();
    let headers = new Headers();
    var target = file.target || file.srcElement
    headers.append('Content-Type','multipart/form-data');
    
    formData.append('file',new Blob([target.files[0]]),target.files[0].name);
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

  viewprofileByEmail(data) {
    var user =  { email : data }
    return this.http.post(this.apiURL + 'viewprofile', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  getAllNotifications(data) {
    return this.http.post(this.apiURL + 'getmentorhistory', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  getFollower(data) {
    var user =  { userid : data }
    return this.http.post(this.apiURL + 'getfollower', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  getUserPreferences(data) {
    return this.http.post(this.apiURL + 'getuserpreferences',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getSuggestedPreferences(data) {
    return this.http.post(this.apiURL + 'usersuggestionpreferences',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getFollowerByEmail(data) {
    return this.http.post(this.apiURL + 'getfollowerbyemail', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  getUserFollowerCountById(data) {
    var user = {userid: data};
    return this.http.post(this.apiURL + 'getfollower', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }
  getUserConstributionsbyEmail(data) {
    var user ={useremail: data };
    return this.http.post(this.apiURL + 'searchcontribution', user)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  getDueContributions(data) {
    return this.http.post(this.apiURL + 'remainingcontributioncheck', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  addmentor(data) {
    
    return this.http.post(this.apiURL + 'addmentor', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

  unfollowMentor(data) {

    return this.http.put(this.apiURL + 'unfollow', data)
    .pipe(map((response: any) => {
      return response;
    }
  ));
  }

}
