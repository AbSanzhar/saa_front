import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentsComponent } from './documents/documents.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { YearPlanComponent } from './year-plan/year-plan.component';
import { PublicationComponent } from './profile/teacher/publication/publication.component';
import { DissovetComponent } from './profile/dissovet/dissovet.component';





@NgModule({
  declarations: [LayoutComponent, ProfileComponent, DocumentsComponent, UploadDocumentComponent, YearPlanComponent, PublicationComponent, DissovetComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class LayoutModule { }
