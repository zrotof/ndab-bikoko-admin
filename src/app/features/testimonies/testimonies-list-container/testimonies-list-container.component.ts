import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestimonyService } from 'src/app/core/services/testimony/testimony.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { TestimonyListComponent } from './components/testimony-list/testimony-list.component';

@Component({
  selector: 'app-testimonies-list-container',
  templateUrl: './testimonies-list-container.component.html',
  styleUrl: './testimonies-list-container.component.scss',
  imports: [
    AsyncPipe,
    RouterLink,
    PageTopHeaderComponent,
    TestimonyListComponent
  ]
})

export class TestimoniesListContainerComponent {
  private testimonyService = inject(TestimonyService);

  protected testimonies$ = this.testimonyService.getTestimoniesList();

  protected readonly topHeaderPageData = { title: "Témoignages", description: "Gestion des témoignages" }
  
}
