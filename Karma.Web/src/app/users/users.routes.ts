import { Routes } from "@angular/router";
import { UsersPageComponent } from "./pages/users-page/users-page.component";

export const USERS_ROUTES : Routes = [
    {
      path :'',
      children:[
        {
          path:'' , component : UsersPageComponent
        },
        {
          path:'**' , redirectTo: '' , pathMatch:'full'
        }
      ]
    }
  ]