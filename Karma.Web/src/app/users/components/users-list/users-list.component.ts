import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserResponse } from 'src/app/models';
import { AppState } from 'src/app/models/appState.models';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})

export class UsersListComponent implements OnInit, OnDestroy {

  userDestroyed$:                                                                         Subject<void> = new Subject<void>();

  constructor(

    private store:                                                                        Store<AppState>,
  ) { }

  ngOnInit(): void {
    
    this.GetUserLoggedInfo();
  }

  GetUserLoggedInfo():void{

    this.store.select( AppState => AppState.Users ).pipe(takeUntil(this.userDestroyed$)).subscribe((users : UserResponse[]) => {
 
      console.log(users);
    })
  }

  ngOnDestroy(): void {

    this.userDestroyed$.next();
    this.userDestroyed$.complete();
  }

}
