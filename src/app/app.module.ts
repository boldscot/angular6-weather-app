import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MiddleTopPanelComponent } from './middle-top-panel/middle-top-panel.component';
import { MiddleBottomPanelComponent } from './middle-bottom-panel/middle-bottom-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MiddleTopPanelComponent,
    MiddleBottomPanelComponent,
    RightPanelComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
