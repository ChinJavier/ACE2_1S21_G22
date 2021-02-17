import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { CoachComponent } from './components/coach/coach.component';
import { AthleteComponent } from './components/athlete/athlete.component';
import { routes } from './routes';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { ChooseComponent } from './components/choose/choose.component';
import { UiRhythmComponent } from './components/ui-rhythm/ui-rhythm.component';
import { UiTemperatureComponent } from './components/ui-temperature/ui-temperature.component';
import { UiOxygenComponent } from './components/ui-oxygen/ui-oxygen.component';
//import { ListProfile2Component } from './components/list-profile2/list-profile2.component';
import { ListProfileComponent } from './components/list-profile/list-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AthleteComponent,
    CoachComponent,
    SignupComponent,
    DashboardComponent,
    ProfileComponent,
    ChooseComponent,
    UiRhythmComponent,
    UiTemperatureComponent,
    UiOxygenComponent,
   // ListProfile2Component,
    ListProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
