import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { storeLogger } from "ngrx-store-logger";
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers } from './reducers/index.reducers';

// Imports for loading & configuring the in-memory web api
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/navbar.component';
import { HomeComponent } from './pages/home/home.component';

import {routing, appRoutingProviders} from './app.routes';

let localStorageServiceConfig = {
    prefix: 'ls-',
    storageType: 'sessionStorage'
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['ui']})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
	imports:[
		HttpModule,
    HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		routing,
    StoreModule.forRoot(reducers,{metaReducers}),
	],
	declarations:[
		AppComponent,
		NavBarComponent,
    HomeComponent
	],
	providers:[
		appRoutingProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
	],
	bootstrap:[ AppComponent ] //<-- RUN ON PAGE LOAD
})

export class AppModule { }
