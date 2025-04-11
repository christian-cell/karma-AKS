import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { AuthComponent } from './auth/auth.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './models/appState.models';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { EventMessage, InteractionStatus, EventType, RedirectRequest } from '@azure/msal-browser';
import { SideNavComponent } from './sideMenu/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthComponent, SideNavComponent, CommonModule],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  
  title                                         = 'chat';
  isLogged                                      = false;
  userDestroyed$:                               Subject<void> = new Subject<void>();

  constructor(
    private store:                              Store<AppState>
  ){}

  ngOnInit(): void {
    
    this.FillProfessionalInfo();
  }

  FillProfessionalInfo():void{
    
    this.store.select(appState => appState.User).pipe(takeUntil( this.userDestroyed$ )).subscribe((user) => {

      const { username } = user || {};
      
      if( username ){
        
        this.isLogged = true;
      
      } else {

        this.isLogged = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.userDestroyed$.next();
    this.userDestroyed$.complete();
  }
}
