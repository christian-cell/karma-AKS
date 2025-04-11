import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserInfo } from 'src/app/models';
import { AppState } from 'src/app/models/appState.models';
import { WindowResizeService } from 'src/app/shared/services/customs/window-resize.service';
import { environment } from 'src/environments/environment';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule,MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,NgOptimizedImage,RouterModule,MatExpansionModule,AuthComponent],
  templateUrl: './side-nav.component.html',
  standalone: true,
  styleUrl: './side-nav.component.scss',
  providers: [AuthComponent]
})

export class SideNavComponent {

  activedPage=                                                    "";
  mobileQuery:                                                    MediaQueryList;
  userName:                                                       string = '';
  selectedLanguage=                                               "en";
  userDestroyed$:                                                 Subject<void> = new Subject<void>();
  appDestroyed$:                                                  Subject<void> = new Subject<void>();
  selectedLanguageDestroyed$:                                     Subject<void> = new Subject<void>();
  windowWidth=                                                    0;
  mobileViewBreakPoint=                                           environment.mobileViewBreakPoint;
  resizeSubscription:                                             Subscription;

  private _mobileQueryListener: () => void;

  constructor(

    private store:                                                Store<AppState>,
    private authComponent :                                       AuthComponent,
    changeDetectorRef:                                            ChangeDetectorRef, 
    media:                                                        MediaMatcher,
    private router:                                               Router,
    private windowResizeService :                                 WindowResizeService/* ,
    private i18nService:                                          I18nService, */
    
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 1000000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.resizeSubscription = this.windowResizeService.getWindowWidth().subscribe(width => {

      this.windowWidth = width;
    });
  }

  ngOnInit(): void {
   
    this.GetUserInfo();
    this.CheckPath();
  }


  CheckPath():void{

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd),map((event: NavigationEnd) => event.url)).subscribe(( url : string ) => {
      
      this.activedPage = url.split('/')[1];
    })
  }

  GetUserInfo():void{

    this.store.select( AppState => AppState.User ).pipe(takeUntil( this.userDestroyed$ )).subscribe(( user : UserInfo ) => {

      if( user.name )this.userName = user.name.split(' ')[0] 
    })
  }

  Logout():void{
    this.authComponent.Logout();
  }

  ngOnDestroy(): void {

    this.resizeSubscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.userDestroyed$.next();
    this.userDestroyed$.complete();
    this.appDestroyed$.next();
    this.appDestroyed$.complete();
    this.selectedLanguageDestroyed$.next();
    this.selectedLanguageDestroyed$.complete();
  }
}
