import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from '../../product/product.component';
import { AddOrEditComponent } from '../../product/add-or-edit/add-or-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from '../../top/top-bar/top-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../../product/product-details/product-details.component';


const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddOrEditComponent,
    TopBarComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap:[AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
