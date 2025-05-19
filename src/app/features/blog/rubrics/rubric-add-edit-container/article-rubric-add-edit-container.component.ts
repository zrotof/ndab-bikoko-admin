import { Component, computed, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs';
import { InputSwitchModule } from 'primeng/inputswitch';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { ProcessState } from 'src/app/core/enums/process-state.enum';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Rubric } from 'src/app/core/models/blog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-article-rubric-add-edit-container',
  imports: [
    RouterLink,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ToggleSwitchModule,
    PageTopHeaderComponent
  ],
  templateUrl: './article-rubric-add-edit-container.component.html',
  styleUrls: ['./article-rubric-add-edit-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})

export class ArticleRubricAddEditContainerComponent implements OnInit {

  PROCESS_STATE = ProcessState;
  processState = input<ProcessState>();
  id = input<string>()

  private blogService = inject(BlogService);

  rubricForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  initialReplayDataWhenEdit: any;

  connectedUser !: User;

  topHeaderPageData = computed(() => {
    if (this.processState() === ProcessState.Create) {
      return { title: "Créer Une Rubrique", description: "Création d'une nouvelle rubrique d'articles" }
    }

    return { title: "Modifier Une Rubrique", description: "Modification d'une rubrique d'articles" }
  });

  constructor(
    private fb: FormBuilder,
    private artcileService: ArticleService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getUserConnected();
  }

  initForm(): void {
    this.rubricForm = this.fb.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        isActive: [false]
      }
    );
  }

  get formControls() {
    return this.rubricForm.controls;
  }

  checkEditMode() {
    if(this.processState() === ProcessState.Edit){
      this.blogService.getBlogRubricById(this.id() as string).subscribe(
        (result: any) => {
          if (result.status === "success") {
            //initialising first data when edit in order to know if value have any changes
            this.initialReplayDataWhenEdit = result.data;
            this.rubricForm.controls['name'].setValue(this.initialReplayDataWhenEdit.name);
            this.rubricForm.controls['description'].setValue(this.initialReplayDataWhenEdit.description);
            this.rubricForm.controls['isActive'].setValue(this.initialReplayDataWhenEdit.isActive);
          }
        },
        () => {
          this.messageService.add({
            severity: 'warn',
            detail: 'Rubrique inexistant, contactez le webmaster'
          });
          return;
        }
      )
    }
  }

  getUserConnected(): void {
    this.connectedUser = this.activatedRoute.snapshot.data.user;
  }

  onSaveRubric() {

    this.isSaveButtonClicked = true;

    if (this.rubricForm.invalid) {
      return;
    }

    const newRubric: Partial<Rubric> = {
      name: this.rubricForm.get('name')?.value,
      description: this.rubricForm.get('description')?.value,
      isActive: this.rubricForm.get('isActive')?.value,
      userId: this.connectedUser?.id
    }

    this.blogService.addRubric(newRubric)
      .subscribe(
        (result: any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une catégorie on revient à la liste
              () => { this.location.back() });
        }
      )
  }

  onEditRubric() {
    this.isEditButtonClicked = true;

    if (
      this.rubricForm.controls['name'].value === this.initialReplayDataWhenEdit.name
      &&
      this.rubricForm.controls['description'].value === this.initialReplayDataWhenEdit.description
      &&
      this.rubricForm.controls['isActive'].value === this.initialReplayDataWhenEdit.isActive
    ) {
      this.messageService.add({ severity: 'info', detail: 'Aucune modification enregistrée' });
      return;
    }

    let updatedRubric = {};

    if (this.rubricForm.controls['name'].value !== this.initialReplayDataWhenEdit.name) {
      updatedRubric = { ...updatedRubric, name: this.rubricForm.controls['name'].value }
    }

    if (this.rubricForm.controls['description'].value !== this.initialReplayDataWhenEdit.description) {
      updatedRubric = { ...updatedRubric, description: this.rubricForm.controls['description'].value }
    }

    if (this.rubricForm.controls['isActive'].value !== this.initialReplayDataWhenEdit.isActive) {
      updatedRubric = { ...updatedRubric, isActive: this.rubricForm.controls['isActive'].value }
    }

    updatedRubric = { ...updatedRubric, userId: this.connectedUser?.id }

    this.blogService.editRubric(this.initialReplayDataWhenEdit.id as string, updatedRubric).subscribe(
      (result) => {
        if (result.status === "success") {
          //affichage du message lors d'une édition sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une programme on revient à la liste
              () => { this.location.back() }
            );
        }
      },
      () => {
        this.messageService.add({ severity: 'info', detail: 'Programme inconnue' });
      }
    )
  }
}
