import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { ROUTES } from '../constants/routes.constants';

@Component({
  selector: 'navbar',
  templateUrl:'./navbar.component.html'
})

export class NavBarComponent implements OnInit {

  private $uiState: Observable<any>;

  public currentRoute = '/';
  public burgerOpen = false;
  public ROUTES:any = ROUTES;

	constructor(private ngrxstore:Store<any>){}

  toggleBurger(){
    this.burgerOpen = !this.burgerOpen;
  }

  ngOnInit(){
    this.$uiState = this.ngrxstore.select('ui');
		this.$uiState.subscribe((val)=>{
      //state
		});
  }
}
