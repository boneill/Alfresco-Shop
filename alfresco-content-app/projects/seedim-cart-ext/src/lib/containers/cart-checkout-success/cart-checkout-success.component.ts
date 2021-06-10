import { AlfrescoApiService, AuthenticationService } from '@alfresco/adf-core';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { BaseCartItem, CartService } from 'ng-shopping-cart';
 import { from } from 'rxjs';
 import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lib-cart-checkout-success',
  templateUrl: './cart-checkout-success.component.html',
  styleUrls: ['./cart-checkout-success.component.scss']
})
export class CartCheckoutSuccessComponent implements OnInit {

  session: any;
  paymentStatus: string = 'unpaid';
  customerName: string;
  email: string;
  userCartFolderId: String;

  // constructor() {
  // }
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private apiService: AlfrescoApiService, 
    private cartService: CartService<BaseCartItem>,
    private authService: AuthenticationService) {
    
    this.route.queryParams.pipe(
       filter(params => params.session_id),
       switchMap(params => { 
        
        let sessionId = params.session_id;
        const url = 'stripe/checkout-success';
        const cartItems = cartService.getItems();
        const userId = this.authService.getEcmUsername();

        const sessionObj = {
          session_id: sessionId,
          user_id: userId,
          cartItems: cartItems 
        };
        
        console.log("sessionObj", sessionObj);

        return from(
          this.apiService
            .getInstance()
            .webScript.executeWebScript(
              'POST',
              url,
              null,
              null,
              null,
              JSON.stringify(sessionObj))
            )
       })
    )
      .subscribe(response => {

        // expected response
        //{paymentstatus: "paid", customername: "Glad", customeremail: "bgkoneill@gmail.com", userCardFolderId: "<nodeRefID>""}

        console.log(response); // { order: "popular" }
        this.paymentStatus = response.paymentstatus;
        this.customerName = response.customername;
        this.email = response.customeremail;
        this.userCartFolderId = response.userCartFolderId;

        if(this.paymentStatus === 'paid'){
          this.cartService.clear();
        }


      }
    );
 }

  ngOnInit(): void {
  }

  download(){

    this.router.navigateByUrl("/cart/purchased-items");

  }

  viewCart(){

    this.router.navigateByUrl("/cart/viewcart");

  }  

}
