import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Interceptor } from './api/interceptor';
import {WebSocketService} from './services/websocket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PushNotificationsModule } from 'ng-push';
import {CustomHttpInterceptorService} from './api/CustomHttpInterceptorService';
const config: SocketIoConfig = { url: 'http://localhost:8077', options: {} };
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PushNotificationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
