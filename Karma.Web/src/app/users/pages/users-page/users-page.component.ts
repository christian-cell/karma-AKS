import { Component, OnInit } from '@angular/core';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { AppState } from 'src/app/models/appState.models';
import { Store } from '@ngrx/store';
import { storeUsers } from 'src/app/store/actions/users/user.action';

@Component({
  selector: 'app-users-page',
  imports: [UsersListComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})

export class UsersPageComponent implements OnInit {

  constructor(

    private store:                                                                        Store<AppState>,
  ) { }

  ngOnInit(): void {
    
    this.store.dispatch( storeUsers( { order: 'store' } ) );
  }
}
