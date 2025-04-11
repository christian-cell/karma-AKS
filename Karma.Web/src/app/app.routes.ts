import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    {
        path: '', redirectTo:'documents', pathMatch:'full'
    },
    {
        path: 'documents',
        canActivate:[MsalGuard],
        loadChildren : () => import('./documents/documents.routes').then( m => m.DOCUMENTS_ROUTES )
    },
    {
        path: 'users',
        canActivate:[MsalGuard],
        loadChildren : () => import('./users/users.routes').then( m => m.USERS_ROUTES )
    },
    {
        path: 'images',
        canActivate:[MsalGuard],
        loadChildren : () => import('./images/images.routes').then( m => m.IMAGES_ROUTES )
    }
];
