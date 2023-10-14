import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent {

  @Input() formValue : File | null | undefined;;
  
  path : string | ArrayBuffer | null | undefined;
}
