import { Routes } from "@angular/router";
import { ImagesPageComponent } from "./pages/images-page/images-page.component";

export const IMAGES_ROUTES : Routes = [
  {
    path :'',
    children:[
      {
        path:'' , component : ImagesPageComponent
      },
      {
        path:'**' , redirectTo: '' , pathMatch:'full'
      }
    ]
  }
]