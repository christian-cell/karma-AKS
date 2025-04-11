import { Routes } from "@angular/router";
import { DocumentsPageComponent } from "./pages/documents-page/documents-page.component";

export const DOCUMENTS_ROUTES : Routes = [
    {
        path :'',
        children:[
            {
                path:'' , component : DocumentsPageComponent
            },
            {
                path:'**' , redirectTo: '' , pathMatch:'full'
            }
        ]
    }
]