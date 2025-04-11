import {MsalInterceptorConfiguration, MsalGuardConfiguration 
} from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType , LogLevel, PublicClientApplication  } from '@azure/msal-browser';
import { environment } from 'src/environments/environment.development';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
/************************************************* MSAL DEBUG *******************************************************************/ 
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
  console.log(logLevel);
} 

/************************************************* MSAL INSTANCES FACTORIES ******************************************************/


export function karmaMSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.karmaService.clientId,
      authority: environment.karmaService.authority,
      redirectUri: environment.karmaService.redirectUri,
      postLogoutRedirectUri: environment.karmaService.logoutRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      /* allowNativeBroker: false, */
      allowRedirectInIframe: true,
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

/****************************************************************** MSAL GUARDS **************************************************/  
export function karmaMSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: environment.karmaService.scopes
    },
    loginFailedRoute: '/login-failed'
  };
}

/*********************************************** INTERCEPTORS CONFIG *******************************************************/
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me',         ['user.read']);

  protectedResourceMap.set(`${environment.api.baseUrl}/ping`,             []);

  protectedResourceMap.set(`${environment.api.baseUrl}/chat` ,            environment.karmaService.scopes);

  protectedResourceMap.set(`${environment.api.baseUrl}/counter` ,         environment.karmaService.scopes);

  protectedResourceMap.set(`${environment.api.baseUrl}/document` ,        environment.karmaService.scopes);

  protectedResourceMap.set(`${environment.api.baseUrl}/image` ,           environment.karmaService.scopes);

  protectedResourceMap.set(`${environment.api.baseUrl}/stats` ,           environment.karmaService.scopes);

  protectedResourceMap.set(`${environment.api.baseUrl}/user` ,            environment.karmaService.scopes);
 
  return {
    
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}