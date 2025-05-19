import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-video-preview',
    templateUrl: './video-preview.component.html',
    styleUrls: ['./video-preview.component.scss'],
    imports: [NgClass]
})
export class VideoPreviewComponent {

  @Input() formValue : File | null | undefined;;
  
  path : string | ArrayBuffer | null | undefined;
}
