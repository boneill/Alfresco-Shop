import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { from, of } from 'rxjs';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { Store } from '@ngrx/store';
import { AppStore, SnackbarErrorAction } from '@alfresco/aca-shared/store';

@Component({
  selector: 'lib-stripe-checkout',
  templateUrl: './stripe-checkout.component.html'
})
export class StripeCheckoutComponent {
  
  /** Emitted when a tag is selected. */
  /** @Output()
  add = new EventEmitter();
**/  
  
  
  constructor(
    //private http: HttpClient,
    private stripeService: StripeService,
    private cartService: CartService<BaseCartItem>,
    private apiService: AlfrescoApiService,
    private store: Store<AppStore>,
  ) {}

  checkout() {
    // Check the server.js tab to see an example implementation
    let cartItems = this.cartService.getItems();
    for (var i in cartItems) {
         cartItems[i].price = cartItems[i].price * 100
    }
    const cartObj = {cartItems: cartItems};


    console.log("Cart values: ", cartObj);

    const url = 'stripe/create-checkout-session';

    //this.http.post('/stripe/create-checkout-session', JSON.stringify(cartObj))


    from(
      this.apiService
        .getInstance()
        .webScript.executeWebScript(
          'POST',
          url,
          null,
          null,
          null,
          JSON.stringify(cartObj))
        )
      .pipe(
        catchError(_ => {
          this.store.dispatch(
            new SnackbarErrorAction(
              'DIGITAL_SIGNATURE.ACTIONS.ERRORS.SIGNATURE_REQUEST_ERROR'
            )
          );
          return of(null);
        }),
        switchMap((session: any) => {
          console.log("session", session);
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
          //return of(session)
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        alert(result);
        console.log("Result ", result);

        if (result.error) {
          alert(result.error.message);
        }
      });
  }
}