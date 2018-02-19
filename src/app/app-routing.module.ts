import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutStepsGuardService } from './checkout-steps-guard.service';
import { ConfirmComponent } from './checkout/confirm/confirm.component';
import { AddressComponent } from './checkout/address/address.component';
import { CheckoutSuccessComponent } from './checkout/checkout-success/checkout-success.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'checkout/address', component: AddressComponent, canActivate: [CheckoutStepsGuardService] },//first step
  { path: 'checkout/confirm', component: ConfirmComponent, canActivate: [CheckoutStepsGuardService] },//second step
  { path: 'order-success/:id', component: CheckoutSuccessComponent },
  { path: 'checkout', redirectTo: 'checkout/address', pathMatch: 'full' },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/orders/:id', component: AdminOrderDetailsComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/products/new', component: ProductFormComponent },
  { path: 'admin/products/:id', component: ProductFormComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'my/account', component: MyAccountComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
