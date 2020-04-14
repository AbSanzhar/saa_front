import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../services/websocket.service';
import {ApiService} from '../api/api.service';
import * as jwt_decode from "jwt-decode";
import { PushNotificationsService} from 'ng-push';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private _api: ApiService, private _pushNotifications: PushNotificationsService) {
    this._pushNotifications.requestPermission();
  }
  notify(title, body){ //our function to be called on click
    let options = { //set options
      body: body,
    }
    this._pushNotifications.create(title, options).subscribe( //creates a notification
      res => console.log(res),
      err => console.log(err)
    );
  }
  public table = 1;
  getTable() {
    return +this.table;
  }
  showTableSelect() {
    console.log(this.table);
  }
  public menu_condition = false;
  public content_condition = false;
  public couter_notification = 0;
  public notifications = [];

  pushMenu() {
      if(this.menu_condition == false && this.content_condition == false) {
        this.menu_condition = true;
        this.content_condition = true;
      }
      else {
        this.menu_condition = false;
        this.content_condition = false;
      }

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  public DecodedToken = this.getDecodedAccessToken(localStorage.getItem('token'));
  public IdToken = this.DecodedToken.jti;
  public roles = this.DecodedToken.roles;
  public Teacher_Role = false;
  ngOnInit() {
    this._api.getNotifications().subscribe(
      res => {
        console.log(res);
        for(let i = 0; i < res.length; i++) {
          if(res[i].ntfOpened == false) {
            this.couter_notification++;
          }
          this.notifications = res;
        }
      },
      err => {
        console.log(err);
      }
    );
    setInterval(() => {
      this._api.getNotifications().subscribe(
        res => {
          console.log(res);
          this.couter_notification = 0;
          for(let i = 0; i < res.length; i++) {
            if(res[i].ntfOpened == false) {
              this.couter_notification++;
              this.notify(res[i].ntfTitle, res[i].ntfBody);
            }
            this.notifications = res;
          }
        },
        err => {
          console.log(err);
        }
      );
    },60000);
    for (var i = 0; i < this.roles.length; i++) {
       if (this.roles[i] == 'Teacher') {
        this.Teacher_Role = true;
      }
    }
  }

}
