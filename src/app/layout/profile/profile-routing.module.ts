import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicationComponent} from './teacher/publication/publication.component';
import {ProfileComponent} from './profile.component';
import {DissovetComponent} from './dissovet/dissovet.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'dissovet',
    component: DissovetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule{ }
