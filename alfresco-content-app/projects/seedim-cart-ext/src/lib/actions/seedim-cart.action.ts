
import { Action } from '@ngrx/store';

export const ADD_TO_CART = 'ADD_TO_CART';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;

  constructor(public payload: any) {
    console.log('Action AddToCart payload ', payload);
  }
}

export type CartActions = 
| AddToCart;
