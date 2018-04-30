import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {MyOrdersComponent} from './user/my-orders/my-orders.component';
import {MyAccountComponent} from './user/my-account/my-account.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {ProductsComponent} from './products/products.component';
import {CheckoutStepsGuardService} from './services/checkout-steps-guard.service';
import {ConfirmComponent} from './checkout/confirm/confirm.component';
import {AddressComponent} from './checkout/address/address.component';
import {CheckoutSuccessComponent} from './checkout/checkout-success/checkout-success.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminOrderDetailsComponent} from './admin/admin-order-details/admin-order-details.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';
import {AdminCategoryComponent} from "./admin/admin-category/admin-category.component";

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'checkout/address', component: AddressComponent, canActivate: [CheckoutStepsGuardService]}, // first step
  {path: 'checkout/confirm', component: ConfirmComponent, canActivate: [CheckoutStepsGuardService]}, // second step
  {path: 'order-success/:id', component: CheckoutSuccessComponent},
  {path: 'checkout', redirectTo: 'checkout/address', pathMatch: 'full'},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/orders/:id', component: AdminOrderDetailsComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin/categories', component: AdminCategoryComponent, canActivate: [AdminAuthGuardService]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
  {path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'my/settings', component: UserSettingsComponent, canActivate: [AuthGuardService]},
  {path: 'my/account', component: MyAccountComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
