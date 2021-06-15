import { NgModule } from '@angular/core';
import { SeedimCartExtComponent } from './seedim-cart-ext.component';
import { ExtensionService } from '@alfresco/adf-extensions';
import {ShoppingCartModule} from 'ng-shopping-cart';
import { SharedModule, PageLayoutModule } from '@alfresco/aca-shared';
import { CoreModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './effects/seedim-cart.effect';
import { CartViewComponent } from './containers/cart-view.component/cart-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ContentModule } from '@alfresco/adf-content-services';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';
import { SharedStoreModule } from '@alfresco/aca-shared/store';
import { CartCheckoutSuccessComponent } from './containers/cart-checkout-success/cart-checkout-success.component';
import { CartCheckoutCancelComponent } from './containers/cart-checkout-cancel/cart-checkout-cancel.component';
import { PurchasedItemsComponent } from './containers/purchased-items.component/purchased-items.component';
import * as CartRules from './rules/cart.rules';
import { CartDocumentViewComponent } from './containers/cart-document-view/cart-document-view.component';


@NgModule({
  declarations: [
    SeedimCartExtComponent, 
    CartViewComponent, 
    StripeCheckoutComponent, 
    CartCheckoutSuccessComponent, CartCheckoutCancelComponent, PurchasedItemsComponent, CartDocumentViewComponent
  ],
  imports: [ 
    CommonModule, 
    CoreModule.forChild(),
    ContentModule.forChild(),
    SharedModule, 
    SharedStoreModule,
    PageLayoutModule, 
    EffectsModule.forFeature([CartEffects]),
    TranslateModule,
    ShoppingCartModule,
    //StripeModule.forRoot("pk_test_51IxLlpJ1I65QlehFtE5DgcnMLoqNfBlB0PIunSreVbbsWSvnIozk2f5ULONrTeU9R8SspnlYo54quF65GL3zrD3l00kmFX4Guf") 
    NgxStripeModule
  ],
  exports: [
    SeedimCartExtComponent, 
    CartViewComponent,
    CartCheckoutSuccessComponent,
    PurchasedItemsComponent
    
  ],
  providers: [
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'cart-ext-translations',
        source: 'assets/cart-ext-translations'
      }
    }
  ]
})
export class SeedimCartExtModule { 

  constructor(extensions: ExtensionService) {
    extensions.setComponents({
        'seedim-cart.main.component': SeedimCartExtComponent,
        'seedim-cart.viewcart.component': CartViewComponent,
        'seedim-cart.checkout-success.component': CartCheckoutSuccessComponent,
        'seedim-cart.purchased-items.component': PurchasedItemsComponent,
        'seedim-shop.view-document.component' : CartDocumentViewComponent
    });

    extensions.setEvaluators({
      'seedim-cart.isSkuItem': CartRules.isSkuItem,
      'seedim-cart.isPurchasedItem' : CartRules.isPurchasedItem
    });
  }
}
