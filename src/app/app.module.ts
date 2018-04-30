import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomFormsModule} from 'ng2-validation';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgProgressInterceptor, NgProgressModule} from 'ngx-progressbar';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './/app-routing.module';
import {LoginComponent} from './login/login.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {AuthService} from './auth.service';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {CategoryService} from './category.service';
import {ProductService} from './product.service';
import {ProductsComponent} from './products/products.component';
import {ProductFilterComponent} from './products/product-filter/product-filter.component';
import {ProductCardComponent} from './products/product-card/product-card.component';
import {ShoppingCartService} from './shopping-cart.service';
import {ProductQuantityComponent} from './products/product-quantity/product-quantity.component';
import {OrderService} from './order.service';
import {CheckoutStepsService} from './checkout-steps.service';
import {CheckoutStepsGuardService} from './checkout-steps-guard.service';
import {AddressComponent} from './checkout/address/address.component';
import {ConfirmComponent} from './checkout/confirm/confirm.component';
import {CheckoutNavbarComponent} from './checkout/checkout-navbar/checkout-navbar.component';
import {CheckoutSuccessComponent} from './checkout/checkout-success/checkout-success.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {WishlistService} from './wishlist.service';
import {AdminOrderDetailsComponent} from './admin/admin-order-details/admin-order-details.component';
import {UserMenuComponent} from './user/user-menu/user-menu.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {WishlistButtonComponent} from './wishlist-button/wishlist-button.component';
import {AdminAuthGuardService} from './admin-auth-guard.service';
import {MaterialModule} from './material/material.module';
import {AddComponent} from './admin/admin-products/add/add.component';
import {EditComponent} from './admin/admin-products/edit/edit.component';
import {RemoveComponent} from './admin/admin-products/remove/remove.component';
import {AdminNavigationComponent} from './admin/admin-navigation/admin-navigation.component';
import {OrderDetailsDialogComponent} from "./admin/admin-orders/order-details/order-details.component";
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { ProductDetailsDialogComponent } from './products/product-details-dialog/product-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ShoppingCartComponent,
    WishlistComponent,
    MyOrdersComponent,
    MyAccountComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    AddressComponent,
    ConfirmComponent,
    CheckoutNavbarComponent,
    CheckoutSuccessComponent,
    OrderDetailsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminOrderDetailsComponent,
    UserMenuComponent,
    UserSettingsComponent,
    ProductDetailsComponent,
    WishlistButtonComponent,
    AddComponent,
    EditComponent,
    RemoveComponent,
    AdminNavigationComponent,
    OrderDetailsDialogComponent,
    AdminCategoryComponent,
    ProductDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    NgProgressModule,
    NgxDatatableModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
    AuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    WishlistService,
    ProductsComponent,
    NavbarComponent,
    ShoppingCartComponent,
    WishlistComponent,
    OrderService,
    CheckoutStepsService,
    CheckoutStepsGuardService,
    ProductDetailsComponent,
    AdminAuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true}
  ],
  entryComponents: [
    AddComponent,
    EditComponent,
    RemoveComponent,
    OrderDetailsDialogComponent,
    ProductDetailsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
