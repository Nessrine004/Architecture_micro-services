import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// ⚠️ ce sont des composants standalone
import { Products } from './products/products';
import { Customers } from './customers/customers';
import { Bills } from './bills/bills';

@NgModule({
  // 👇 seul composant déclaré dans le module
  declarations: [
    App
  ],
  // 👇 modules + composants standalone ici
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Products,
    Customers,
    Bills
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
