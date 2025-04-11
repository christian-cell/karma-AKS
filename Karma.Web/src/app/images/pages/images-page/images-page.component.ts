import { Component } from '@angular/core';
import { ImagesComponent } from '../../components/images/images.component';

@Component({
  selector: 'app-images-page',
  imports: [ImagesComponent],
  templateUrl: './images-page.component.html',
  styleUrl: './images-page.component.scss',
  standalone: true
})

export class ImagesPageComponent {

}
