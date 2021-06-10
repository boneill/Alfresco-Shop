import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as cartActions from '../actions/seedim-cart.action';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  AppStore,
  getAppSelection,
//  ViewNodeAction
} from '@alfresco/aca-shared/store';

//import { Router } from '@angular/router';
import { BaseCartItem, CartItem, CartService } from 'ng-shopping-cart';


@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private acaStore: Store<AppStore>,
    //private router: Router,
    private cartService: CartService<CartItem>
  ) {}

  @Effect({ dispatch: false })
  addToCart$ = this.actions$.pipe(
    ofType(cartActions.ADD_TO_CART),
    map((action: cartActions.AddToCart) => {
      if (action.payload && action.payload.item) {
        console.log('AddToCart payload ', action.payload);
        this.cartService.addItem(
          action.payload.item
        );
      } else {
        this.acaStore
          .select(getAppSelection)
          .pipe(take(1))
          .subscribe(selection => {
            console.log('AddToCart action selection state ', selection);
            if (selection.file && selection.file.entry) {

              const id = selection.file.entry.id;
              const name = selection.file.entry.name;
              
              const price = selection.file.entry.properties && selection.file.entry.properties['cart:price']? selection.file.entry.properties['cart:price'] : 0; 
                
              //const imageUrl = TODO
              const item = new BaseCartItem({id: id, name: name, price:price});
              
              this.cartService.addItem(item);
            }
          });
      }
    })
  );
  
}
