import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUpdatedSource = new Subject<void>();

  // Observable to subscribe to updates
  productUpdated$ = this.productUpdatedSource.asObservable();

  // Trigger the update event
  notifyProductUpdated() {
    console.log('Product updated notification triggered');
    this.productUpdatedSource.next();
  }
}