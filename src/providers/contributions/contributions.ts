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
    var user = {
      useremail: data
    };
    return this.http.post(this.apiURL + 'searchcontribution', user)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  searchContributionByContributionId(data) {
    var id = {
      _id: data
    };
    return this.http.post(this.apiURL + 'searchcontributionbyid', id)
      .pipe(map((response: any) => {
        return response;
      }));

  }

  getAllCategoriesName() {
    return this.http.get(this.apiURL + 'getallcategory')
      .pipe(map((response: any) => {
        return response;
      }));
  }

  becomeAMentor(data) {
    return this.http.post(this.apiURL + 'becomementor', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  getLikesAndComments(data) {
    var commentslikes = {
      contributionid: data
    };
    return this.http.post(this.apiURL + 'getlikesandcomments', commentslikes)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllCommentsAndLikes() {
    return this.http.get(this.apiURL + 'getallfvrts')
      .pipe(map((response: any) => {
        return response;
      }));
  }

  addLike(data) {

    return this.http.post(this.apiURL + 'addlikes', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  unLike(data) {

    return this.http.post(this.apiURL + 'unlike', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createContribution(data) {
    var data = data;
    return this.http.post(this.apiURL + 'addcontribution', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllContribution() {
    return this.http.get(this.apiURL + 'showallcontribution')
      .pipe(map((response: any) => {
        return response;
      }));
  }

  searchContribution(data) {
    return this.http.post(this.apiURL + 'searchingcontribution', data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createComment(data) {
    return this.http.post(this.apiURL + 'addcomments',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  deleteComment(data) {
    return this.http.post(this.apiURL + 'deletecomments',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

  getAllEvents() {
    return this.http.get(this.apiURL + 'showallevent')
      .pipe(map((response: any) => {
       return response;
    }));
  }
  searchEvent(data) {
    return this.http.post(this.apiURL + 'searchevent',data)
    .pipe(map((response: any) => {
     return response;
  }));
  }

}
