// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// import 'jquery';
// import 'bootstrap/dist/js/bootstrap';

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
//import * as bootstrap from 'bootstrap-webpack';

// AngularClass
import '@angularclass/hmr';

// Other
// import 'ng2-redux';
// import "d3";
// import "nvd3";

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
