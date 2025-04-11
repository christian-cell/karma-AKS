import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { AppState } from '../models/appState.models';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { EventType, AccountInfo, AuthenticationResult, EventMessage, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { addUser, removeUser } from '../store/actions/users/user.action';
import { UserInfo } from '../models';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-auth',
  imports: [NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true
})

export class AuthComponent {

  isIframe:                           boolean = false;
  loginDisplay:                       boolean = false;
  username ! :                        string;
  user_name :                         string = "";
  userDestroyed$:                     Subject<void> = new Subject<void>();
  private readonly _destroying$ =     new Subject<string>();

  @Output() iframe :                  EventEmitter<boolean> = new EventEmitter;
  @Output() isLogged :                EventEmitter<boolean> = new EventEmitter;

  constructor(
    private store:                    Store<AppState>,
    private authService:              MsalService , 
    private msalBroadcastService:     MsalBroadcastService,
    private router:                   Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ){

    this.authService.initialize();
  }

  ngOnInit(): void {
   
    if(window.localStorage.getItem('idToken')){
      this.loginDisplay=true;
    }

    const userInfo: AccountInfo = this.authService.instance.getAllAccounts()[0];
    
    this.store.dispatch(addUser(userInfo));
    
    this.store.select(appState => appState.User)
    .pipe(takeUntil(this.userDestroyed$))
    .subscribe((user) => {
      const { name } = user;
      if(name)this.user_name = name.split(' ')[0];
    })
    this.CheckLogin();
  }

  CheckLogin(){

    this.isIframe = window !== window.parent && !window.opener;
    this.msalBroadcastService.msalSubject$.pipe(

      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    
    ).subscribe((result: EventMessage) => {

      const payload = result.payload as AuthenticationResult;

      if( payload.account ){
        let userInfo : UserInfo =  this.AccountInfoToUserInfoMapper( payload.account );

        userInfo = { ...userInfo , professionalLoggedId : 'first_assignement' };

        this.store.dispatch(addUser(userInfo));
        
        const idToken = payload.idToken;
        const accessToken = payload.accessToken;
        const user_id = payload.account.localAccountId;
        
        if(idToken){
          window.localStorage.setItem('idToken',idToken);
        }
        window.localStorage.setItem('accessToken',accessToken);
        window.localStorage.setItem('user_id',user_id);
        
        this.isLogged.emit(true);
        this.setLoginDisplay();
      }
    });
    this.iframe.emit(this.isIframe);
  }

  Login() {
    this.msalBroadcastService.inProgress$.pipe(
      filter((status : InteractionStatus) => status === InteractionStatus.None)
    )
    .subscribe(()=>{
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    })
  }
 
  Logout() {
    this.store.dispatch(removeUser({}));
    window.localStorage.removeItem('idToken');
    window.localStorage.removeItem('state');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('user_id');
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.karmaService.logoutRedirectUri
    });
  }

  GoToPrescriptions():void{
    this.router.navigate(['prescriptions']);
  }
  
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  AccountInfoToUserInfoMapper( accountInfo : AccountInfo ):UserInfo{
    const { idToken , homeAccountId , idTokenClaims , localAccountId , name , tenantId , username } = accountInfo || {};
    const userInfo : UserInfo = {
      homeAccountId : homeAccountId,
      idTokenClaims : idTokenClaims,
      localAccountId : localAccountId,
      professionalLoggedId : 'first_assignement',
      name : name,
      tenantId : tenantId,
      username : username,
      idToken : idToken
    }
    return userInfo;
  }

  ngOnDestroy(): void {
    this._destroying$.next('');
    this._destroying$.complete();
    this.userDestroyed$.next();
    this.userDestroyed$.complete();
  }
}
