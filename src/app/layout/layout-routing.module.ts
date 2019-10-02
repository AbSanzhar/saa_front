import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component'
import { ProfileComponent } from './profile/profile.component'
import { DocumentsComponent } from './documents/documents.component'
import { UploadDocumentComponent } from './upload-document/upload-document.component'
import { YearPlanComponent } from './year-plan/year-plan.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'upload-document',
        component: UploadDocumentComponent
      },
      {
        path: 'year-plan',
        component: YearPlanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
