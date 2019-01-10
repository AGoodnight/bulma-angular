import {Component,OnInit,OnDestroy,AfterViewInit,ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable,Subject} from 'rxjs/Rx';
import {Router} from '@angular/router';

@Component({
  selector: 'body',
  styleUrls: ['../assets/sass/main.scss'],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.component.html'),
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  public $uiState:Observable<any>;

  // State Cleanup
  public ngUnsubscribe:Subject<any> = new Subject();

  constructor(
    private ngrxstore:Store<any>,
    private router:Router
  ) {}

  ngOnInit(){
    this.$uiState = this.ngrxstore.select('ui');
    this.$uiState
      .takeUntil(this.ngUnsubscribe)
      .subscribe((val) => {
      });

    this.router.events
      .takeUntil(this.ngUnsubscribe)
      .subscribe((path) => {
        if(path['url']!=='/' && path['url']){
          this.ngrxstore.dispatch({type:'CURRENT_ROUTE_URL',payload:path['url']})
        }
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(){}

}
