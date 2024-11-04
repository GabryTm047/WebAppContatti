import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { CanActivateRouteGuard } from './guards/login.guard';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: AuthComponent},
    {path: 'contacts', component: ContactsPageComponent, canActivate: [CanActivateRouteGuard] }
];
