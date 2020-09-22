import { DevicesService } from './../../../dashboard/src/app/services/devices.service';
import { SettingsService } from './services/settings.service';
import { LanguageHandlerService } from './services/language-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IntroComponent } from './home/intro/intro.component';
import { OwlModule } from 'ngx-owl-carousel';
import { VideoComponent } from './home/video/video.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import { RatingComponent } from './home/rating/rating.component';
import { NgxStarsModule } from 'ngx-stars';
import { MatCardModule } from '@angular/material/card';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroComponent,
    VideoComponent,
    OurServicesComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    NgxStarsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    OwlModule,
    MatProgressSpinnerModule,
  ],
  providers: [LanguageHandlerService, SettingsService, DevicesService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
