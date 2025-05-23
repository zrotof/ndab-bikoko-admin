import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
    imports: [NgClass]
})

export class ImagePreviewComponent implements OnChanges{

  @Input() formValue : File | null | undefined;
  @Input() dismisseable !: boolean;
  @Input() index ?: number;
  @Output() removeImageEvent = new EventEmitter<number>()
  
  path : string | ArrayBuffer | null | undefined;

  removeSecondaryPictureEvent(){
    this.removeImageEvent.emit(this.index)
  }

  ngOnChanges(): void {
    
    if(this.formValue){
      const reader = new FileReader();
      reader.onload = (e) => {
        this.path = e.target?.result;
      };
      reader.readAsDataURL(this.formValue as File);
    }
    
  }

}
