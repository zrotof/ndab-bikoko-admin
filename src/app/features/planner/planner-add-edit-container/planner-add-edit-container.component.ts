import { NgClass } from '@angular/common';
import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { ProcessState } from 'src/app/core/enums/process-state.enum';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { PLANNER_TYPES } from 'src/app/shared/constants/planner-type';
import { lastValueFrom, timer } from 'rxjs';
import { PlannerService } from 'src/app/core/services/planner/planner.service';

@Component({
  selector: 'app-planner-add-edit-container',
  templateUrl: './planner-add-edit-container.component.html',
  styleUrl: './planner-add-edit-container.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    EditorModule,
    ToastModule,
    PageTopHeaderComponent
  ]
})

export class PlannerAddEditContainerComponent {

  protected PLANNER_TYPES = PLANNER_TYPES;
  protected PROCESS_STATE = ProcessState;
  protected processState = input<ProcessState>();
  protected id = input<string>()

  private router = inject(Router)
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private plannerService = inject(PlannerService);

  topHeaderPageData = computed(() => {
    if (this.processState() === ProcessState.Create) {
      return { title: "Créer Un Évènement", description: "Création d'un nouvel évènement" }
    }

    return { title: "Modifier Un Évènement", description: "Modification d'un évènement" }
  });

  plannerForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  imageDisplay!: string | ArrayBuffer | null;
  isImageEdit = false;

  initialPlannerDataWhenEdit: any;

  isMediaVideoInputIsToDisable = true;


  get formControls() {
    return this.plannerForm.controls
  }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.onHandlingMedia();
  }

  initForm(): void {
    this.plannerForm = this.fb.group({
      eventType: ["", Validators.required],
      date: ["", Validators.required],
      town: ["", Validators.required],
      country: ["", Validators.required],
      hasVideo: [false],
      videoLink: [{ value: "", disabled: true }],
      content: ["", Validators.required],
      coverImage: ["", Validators.required]
    })
  }

  onHandlingMedia() {
    this.plannerForm.controls['hasVideo'].valueChanges.subscribe(
      result => {

        if (result) {
          this.plannerForm.controls['videoLink'].enable();
          this.plannerForm.controls['videoLink'].setValidators(Validators.required);
        }
        else {
          this.plannerForm.controls['videoLink'].setValue('');
          this.plannerForm.controls['videoLink'].disable();
          this.plannerForm.controls['videoLink'].removeValidators(Validators.required);
        }

        this.isMediaVideoInputIsToDisable = !this.isMediaVideoInputIsToDisable;
        this.plannerForm.controls['videoLink'].updateValueAndValidity();
      }
    )
  }

  checkEditMode() {
    if (this.processState() === ProcessState.Edit) {

      this.plannerService.getPlannerById(this.id() as string).subscribe(
        (result: any) => {
          if (result.status === "success") {
            //initialising first data when edit in order to know if value have any changes
            this.initialPlannerDataWhenEdit = result.data;

            const currentPlannerType = PLANNER_TYPES.filter((res: any) => res.type === this.initialPlannerDataWhenEdit.type)
            this.plannerForm.controls['eventType'].setValue(currentPlannerType[0]);

            this.plannerForm.controls['date'].setValue(this.initialPlannerDataWhenEdit.date);
            this.plannerForm.controls['town'].setValue(this.initialPlannerDataWhenEdit.town);
            this.plannerForm.controls['country'].setValue(this.initialPlannerDataWhenEdit.country);
            this.plannerForm.controls['hasVideo'].setValue(this.initialPlannerDataWhenEdit.hasVideo);
            this.plannerForm.controls['videoLink'].setValue(this.initialPlannerDataWhenEdit.videoLink);
            this.plannerForm.controls['content'].setValue(this.initialPlannerDataWhenEdit.content);

            const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
            this.imageDisplay = `${this.initialPlannerDataWhenEdit.coverImage}`;
            imagePreviewed.style.display = 'block';
            this.plannerForm.controls['coverImage'].clearValidators();
            this.plannerForm.controls['coverImage'].updateValueAndValidity();
          }
        },
        () => {
          this.messageService.add({
            severity: 'warn',
            detail: 'Évênement inexistant, contactez le webmaster'
          });
          return;
        }
      )
    }
  }

  getUserConnected(): void {
    //this.connectedUser = this.activatedRoute.snapshot.data.user;
  }

  onSavePlanner() {

    this.isSaveButtonClicked = true;

    if (this.plannerForm.invalid) {
      return;
    }

    const newPlanner = new FormData();

    if (this.plannerForm.get('eventType')?.value) {
      newPlanner.append('type', this.plannerForm.get('eventType')?.value.type);
    }

    if (this.plannerForm.get('date')?.value) {
      newPlanner.append('date', this.plannerForm.get('date')?.value);
    }

    if (this.plannerForm.get('town')?.value) {
      newPlanner.append('town', this.plannerForm.get('town')?.value);
    }

    if (this.plannerForm.get('country')?.value) {
      newPlanner.append('country', this.plannerForm.get('country')?.value);
    }

    if (this.plannerForm.get('hasVideo')?.value) {
      newPlanner.append('hasVideo', this.plannerForm.get('hasVideo')?.value);
    }

    if (this.plannerForm.get('videoLink')?.value) {
      newPlanner.append('videoLink', this.plannerForm.get('videoLink')?.value);
    }

    if (this.plannerForm.get('content')?.value) {
      newPlanner.append('content', this.plannerForm.get('content')?.value);
    }

    if (this.plannerForm.get('coverImage')?.value) {
      newPlanner.append('coverImage', this.plannerForm.get('coverImage')?.value);
    }

    //newArticle.append('userId', this.connectedUser!.id as string)
    newPlanner.append('userId', '1')

    this.plannerService.addPlanner(newPlanner)
      .subscribe(
        (result: any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              () => { this.router.navigateByUrl("/evenements") });
        }
      )
  }

  onEditPlanner() {
    this.isEditButtonClicked = true;

    if (
      this.plannerForm.controls['eventType'].value.type === this.initialPlannerDataWhenEdit.type
      &&
      this.plannerForm.controls['date'].value === this.initialPlannerDataWhenEdit.date
      &&
      this.plannerForm.controls['town'].value === this.initialPlannerDataWhenEdit.town
      &&
      this.plannerForm.controls['country'].value === this.initialPlannerDataWhenEdit.country
      &&
      this.plannerForm.controls['hasVideo'].value === this.initialPlannerDataWhenEdit.hasVideo
      &&
      this.plannerForm.controls['videoLink'].value === this.initialPlannerDataWhenEdit.videoLink
      &&
      this.plannerForm.controls['content'].value === this.initialPlannerDataWhenEdit.content
      &&
      !this.isImageEdit
    ) {
      this.messageService.add({ severity: 'info', detail: 'Aucune modification enregistrée' });
      return;
    }

    const editObjectArticle = new FormData()

    if (this.plannerForm.get('eventType')?.value.type != this.initialPlannerDataWhenEdit.type) {
      editObjectArticle.append('type', this.plannerForm.get('eventType')?.value.type);
    }

    if (this.plannerForm.get('date')?.value != this.initialPlannerDataWhenEdit.date) {
      editObjectArticle.append('date', this.plannerForm.get('date')?.value);
    }

    if (this.plannerForm.get('town')?.value != this.initialPlannerDataWhenEdit.town) {
      editObjectArticle.append('town', this.plannerForm.get('town')?.value);
    }


    if (this.plannerForm.get('country')?.value != this.initialPlannerDataWhenEdit.country) {
      editObjectArticle.append('country', this.plannerForm.get('country')?.value);
    }

    if (this.plannerForm.get('hasVideo')?.value != this.initialPlannerDataWhenEdit.hasVideo) {
      editObjectArticle.append('hasVideo', this.plannerForm.get('hasVideo')?.value);
    }

    if (this.plannerForm.get('videoLink')?.value != this.initialPlannerDataWhenEdit.videoLink) {
      editObjectArticle.append('videoLink', this.plannerForm.get('videoLink')?.value);
    }

    if (this.plannerForm.get('content')?.value != this.initialPlannerDataWhenEdit.content) {
      editObjectArticle.append('content', this.plannerForm.get('content')?.value);
    }

    if (this.isImageEdit) {
      editObjectArticle.append('coverImage', this.plannerForm.get('coverImage')?.value);
    }

    //editObjectArticle.append('userId', this.connectedUser.id as any);
    editObjectArticle.append('userId', '1');

    this.plannerService.editPlannerById(this.initialPlannerDataWhenEdit.id as string, editObjectArticle).subscribe(
      (result) => {
        if (result.status === "success") {
          //affichage du message lors d'une édition sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une programme on revient à la liste
              () => { this.router.navigateByUrl("/evenements") }
            );
        }
      },
      () => {
        this.messageService.add({ severity: 'info', detail: 'Programme inconnue' });
      }
    )
  }

  showImagePreview(event: any) {

    const file = event.target.files[0];

    if (file) {
      this.isImageEdit = true;
      this.plannerForm.patchValue({ coverImage: file });
      this.formControls['coverImage'].updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }

      fileReader.readAsDataURL(file);

      const imgElement = <HTMLElement>document.getElementById('image-previewed');
      imgElement.style.display = 'block';
    }
  }
}