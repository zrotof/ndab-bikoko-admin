import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, Location, NgClass, NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, lastValueFrom, map, timer } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Rubric } from 'src/app/shared/models/rubric';
import { DropdownModule } from 'primeng/dropdown';
import { User } from 'src/app/shared/models/user';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'app-article-add-edit-container',
    imports: [
        NgIf,
        NgFor,
        NgClass,
      
    ],
    templateUrl: './article-add-edit-container.component.html',
    styleUrls: ['./article-add-edit-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})
export class ArticleAddEditContainerComponent {

}
