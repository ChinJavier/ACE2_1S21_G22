import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { AthleteComponent } from './components/athlete/athlete.component';
import { CoachComponent } from './components/coach/coach.component';
import {HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignupComponent} from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'coach', component: CoachComponent },
    { path: 'athlete', component: AthleteComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'about', component: AboutComponent},
    { path: 'dashboard', component: DashboardComponent},
];
