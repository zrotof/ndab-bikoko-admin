import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTopHeaderComponent } from '../../components/page-top-header/page-top-header.component';
import { RouterModule } from '@angular/router';
import { ImagePreviewComponent } from '../../components/image-preview/image-preview.component';
import { VideoPreviewComponent } from '../../components/video-preview/video-preview.component';
import { MainActionBarComponent } from '../../components/main-action-bar/main-action-bar.component';


@NgModule({
  declarations: [
    PageTopHeaderComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    MainActionBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    PageTopHeaderComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    MainActionBarComponent
  ]
})
export class CommonComponentsModule { }
