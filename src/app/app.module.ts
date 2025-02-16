import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
// import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    DashboardComponent,
    // SearchFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
