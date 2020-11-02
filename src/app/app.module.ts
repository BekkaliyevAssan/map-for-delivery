import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularYandexMapsModule, IConfig } from 'angular8-yandex-maps';

const mapConfig: IConfig = {
  apikey: '4ede3a02-3e7d-402a-b405-e2c4a708d047',
  lang: 'ru_RU'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
