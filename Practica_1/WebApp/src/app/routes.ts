import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { AthleteComponent } from './components/athlete/athlete.component';
import { CoachComponent } from './components/coach/coach.component';
import {HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignupComponent} from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ChooseComponent } from './components/choose/choose.component';
import { UiRhythmComponent } from './components/ui-rhythm/ui-rhythm.component';
import { UiTemperatureComponent } from './components/ui-temperature/ui-temperature.component';
import { UiOxygenComponent } from './components/ui-oxygen/ui-oxygen.component';
import { ListProfileComponent} from './components/list-profile/list-profile.component';
import {ReportsComponent} from './components/reports/reports.component'

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'coach', component: CoachComponent, canActivate: [AuthGuard]},
    { path: 'athlete', component: AthleteComponent, canActivate: [AuthGuard]},
    { path: 'signup', component: SignupComponent},
    { path: 'about', component: AboutComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'choose' , component: ChooseComponent , canActivate: [AuthGuard]},
    { path: 'rhythm' , component: UiRhythmComponent ,  canActivate: [AuthGuard]},
    { path: 'temperature' , component: UiTemperatureComponent, canActivate: [AuthGuard]},
    { path: 'oxygen' , component: UiOxygenComponent , canActivate: [AuthGuard]},
    { path: 'list-profile', component: ListProfileComponent, canActivate: [AuthGuard]},
    { path: 'reports' , component: ReportsComponent}
];
