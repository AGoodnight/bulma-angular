import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'home',
  templateUrl:'./home.component.html'
})
export class HomeComponent implements OnInit{
  private $uiState: Observable<any>;

	constructor(private ngrxstore:Store<any>){}

  ngOnInit(){
    this.$uiState = this.ngrxstore.select('ui');
		this.$uiState.subscribe((val)=>{
      //state
		});
  }
}
