import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FiveDaysWeatherComponent } from './five-days-weather/five-days-weather.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MiddleTopPanelComponent } from './middle-top-panel/middle-top-panel.component';
import { MiddleBottomPanelComponent } from './middle-bottom-panel/middle-bottom-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    FiveDaysWeatherComponent,
    LeftPanelComponent,
    MiddleTopPanelComponent,
    MiddleBottomPanelComponent,
    RightPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
