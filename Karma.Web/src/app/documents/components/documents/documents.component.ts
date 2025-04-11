import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-documents',
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  standalone: true
})
export class DocumentsComponent {

  
}
