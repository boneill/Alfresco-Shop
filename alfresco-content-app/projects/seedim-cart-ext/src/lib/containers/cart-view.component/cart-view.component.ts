
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseCartItem, CartService, CheckoutPaypalSettings } from 'ng-shopping-cart';


@Component({
  selector: 'lib-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartViewComponent implements OnInit {
  
  //stripePaymentHandler:any = null;
  
  paypalSettings: CheckoutPaypalSettings = {
    business: 'myaccount@paypal.com',
    itemName: 'myMarketplaceAppCart',
    itemNumber: '1234',
    serviceName: 'www.seedim.com.au',
    country: 'AU'
  };
  
  constructor(private cartService: CartService<BaseCartItem>) {
    cartService.setTaxRate(10);
  }

  emptyCart(){
    console.log("Empty cart called");
    this.cartService.clear();
  }

  stripeCheckout(cart){
    console.log("Checked out cart ", cart);

    let amount = 0;
    let description = "Documents: ";
    let items = cart.items;
    for (let item of items){
      amount += item.price
      description += item.name + " ";
    }

    console.log(amount, description);

   // this.makePayment("Stata Documents", description, amount);
    
  }

  /** makePayment(name, description, amount) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IxLlpJ1I65QlehFtE5DgcnMLoqNfBlB0PIunSreVbbsWSvnIozk2f5ULONrTeU9R8SspnlYo54quF65GL3zrD3l00kmFX4Guf',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: name,
      description: description,
      amount: amount
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src ="https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.stripePaymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IxLlpJ1I65QlehFtE5DgcnMLoqNfBlB0PIunSreVbbsWSvnIozk2f5ULONrTeU9R8SspnlYo54quF65GL3zrD3l00kmFX4Guf',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  }
**/

  ngOnInit() {
   // this.invokeStripe();
  }
}
