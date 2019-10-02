import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentsComponent } from './documents/documents.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';
import { YearPlanComponent } from './year-plan/year-plan.component';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [LayoutComponent, ProfileComponent, DocumentsComponent, UploadDocumentComponent, YearPlanComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    FormsModule,
    FileUploadModule
  ],
})
export class LayoutModule { }
