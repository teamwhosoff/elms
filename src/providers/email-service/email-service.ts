import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

const BASE_URL = "https://whosoff-admin.herokuapp.com/";

@Injectable()
export class EmailServiceProvider {

  constructor(public http: HttpClient) { }

  trigger(leaveId, status) {
    var url = BASE_URL + "email/trigger/";
    firebase.auth().currentUser.getIdToken(true).then(token => {
      switch (status) {
        case 0: {
          url += "requested";
          break;
        }
        case 1: {
          url += "approved";
          break;
        }
        case 2: {
          url += "declined";
          break;
        }
        case 3: {
          url += "cancelled";
          break;
        }
        default: break;
      }
      url += "?leaveId=" + leaveId;
      const headers = new HttpHeaders().set("fb-user-token", token);
      console.log(token);
      this.http.post(url, null, { headers }).subscribe(res => {
        console.log(res);
      }, err => {console.log(err)})

    })
  }

}
