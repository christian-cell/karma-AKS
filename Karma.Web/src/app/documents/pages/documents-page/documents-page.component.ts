import { Component } from '@angular/core';
import { DocumentsComponent } from '../../components/documents/documents.component';

@Component({
  selector: 'app-documents-page',
  imports: [DocumentsComponent],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
  standalone: true
})
export class DocumentsPageComponent {

}
