import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WindowResizeService {

  private windowWidthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    
    this.listenToWindowResize();
  }

  private listenToWindowResize() {
    
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(event: any) {

    this.windowWidthSubject.next(window.innerWidth);
  }

  getWindowWidth(): Observable<number> {

    return this.windowWidthSubject.asObservable();
  }
}
