import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TimeagoModule } from "ngx-timeago";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-spin-fade'
    }),
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,
    TimeagoModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    SlickCarouselModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    ModalModule,
    NgxGalleryModule,
    TimeagoModule,
    ModalModule,
    NgxSpinnerModule,
    SlickCarouselModule
  ]
})
export class SharedModule { }
