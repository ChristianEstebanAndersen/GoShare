import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { SavedLocationsComponent } from './components/saved-locations/saved-locations.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
  ],
  declarations: [
    LoginPage,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
