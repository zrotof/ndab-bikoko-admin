import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { ProcessState } from 'src/app/core/enums/process-state.enum';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { TestimonyService } from 'src/app/core/services/testimony/testimony.service';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-testimony-add-edit-container',
  templateUrl: './testimony-add-edit-container.component.html',
  styleUrl: './testimony-add-edit-container.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    ToggleSwitchModule,
    SelectModule,
    TextareaModule,
    ToastModule,
    PageTopHeaderComponent
  ]
})

export class TestimonyAddEditContainerComponent {

  protected testimonyOwnerTypes = [
    {
      type: "ADHERENT", label: "Adhérent"
    },
    {
      type: "BENEFICIARY", label: "Bénéficiaire"
    }
  ];

  protected PROCESS_STATE = ProcessState;
  protected processState = input<ProcessState>();
  protected id = input<string>()

  private router = inject(Router)
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  protected readonly testimonyService = inject(TestimonyService);

  testimonyForm !: FormGroup;

  imageDisplay!: string | ArrayBuffer | null;
  isImageEdit = false;

  isSaveButtonClicked = false;
  isEditButtonClicked = false

  initialTestimonyDataWhenEdit : any;

  protected topHeaderPageData = computed(() => {
    if (this.processState() === ProcessState.Create) {
      return { title: "Créer Un Témoignage", description: "Création d'un nouvel Témoignage" }
    }

    return { title: "Modifier Un Témoignage", description: "Modification d'un Témoignage" }
  });

  get formControls() {
    return this.testimonyForm.controls
  }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.testimonyForm = this.fb.group({
      testimonyOwnerType: ["", Validators.required],
      name: ["", Validators.required],
      title: ["", Validators.required],
      message: ["", Validators.required],
      image: ["", Validators.required],
      isActive: [false, Validators.required]
    })
  }


  checkEditMode() {
    
    if (this.processState() === ProcessState.Edit) {

      this.testimonyService.getTestimonyById(this.id() as string).subscribe(
        (result: any) => {
          if (result.status === "success") {
            //initialising first data when edit in order to know if value have any changes
            this.initialTestimonyDataWhenEdit = result.data;

            const currentTestimonyOwnerType = this.testimonyOwnerTypes.filter((res: any) => res.type === this.initialTestimonyDataWhenEdit.testimonyOwnerType)
            this.testimonyForm.controls['testimonyOwnerType'].setValue(currentTestimonyOwnerType[0]);

            this.testimonyForm.controls['name'].setValue(this.initialTestimonyDataWhenEdit.name);
            this.testimonyForm.controls['title'].setValue(this.initialTestimonyDataWhenEdit.title);
            this.testimonyForm.controls['message'].setValue(this.initialTestimonyDataWhenEdit.message);
            this.testimonyForm.controls['isActive'].setValue(this.initialTestimonyDataWhenEdit.isActive);
           
            const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
            this.imageDisplay = `${this.initialTestimonyDataWhenEdit.image}`;
            imagePreviewed.style.display = 'block';
            this.testimonyForm.controls['image'].clearValidators();
            this.testimonyForm.controls['image'].updateValueAndValidity();
          }
        },
        () => {
          this.messageService.add({
            severity: 'warn',
            detail: 'Témoignage inexistant, contactez le webmaster'
          });
          return;
        }
      )
    }

    
  }

  onSaveTestimony() {
    this.isSaveButtonClicked = true;

    if (this.testimonyForm.invalid) {
      return;
    }

    const newTestimony = new FormData();

    if (this.testimonyForm.get('name')?.value) {
      newTestimony.append('name', this.testimonyForm.get('name')?.value);
    }

    if (this.testimonyForm.get('title')?.value) {
      newTestimony.append('title', this.testimonyForm.get('title')?.value);
    }

    if (this.testimonyForm.get('message')?.value) {
      newTestimony.append('message', this.testimonyForm.get('message')?.value);
    }

    if (this.testimonyForm.get('isActive')?.value) {
      newTestimony.append('isActive', this.testimonyForm.get('isActive')?.value);
    }

    if (this.testimonyForm.get('image')?.value) {
      newTestimony.append('image', this.testimonyForm.get('image')?.value);
    }

    if (this.testimonyForm.get('testimonyOwnerType')?.value) {
      newTestimony.append('testimonyOwnerType', this.testimonyForm.get('testimonyOwnerType')?.value.type);
    }

    this.testimonyService.addTestimony(newTestimony)
      .subscribe(
        (result: any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              () => { this.router.navigateByUrl("/temoignages") });
        }
      )
  }

  onEditTestimony() {
    this.isEditButtonClicked = true;

    if (
      this.testimonyForm.controls['testimonyOwnerType'].value.type === this.initialTestimonyDataWhenEdit.testimonyOwnerType
      &&
      this.testimonyForm.controls['name'].value === this.initialTestimonyDataWhenEdit.name
      &&
      this.testimonyForm.controls['title'].value === this.initialTestimonyDataWhenEdit.title
      &&
      this.testimonyForm.controls['message'].value === this.initialTestimonyDataWhenEdit.message
      &&
      this.testimonyForm.controls['isActive'].value === this.initialTestimonyDataWhenEdit.isActive
      &&
      !this.isImageEdit
    ){
      this.messageService.add({ severity: 'info', detail: 'Aucune modification enregistrée' });
      return;
    }

    const editObjectTestimony = new FormData()

    if (this.testimonyForm.get('testimonyOwnerType')?.value.type != this.initialTestimonyDataWhenEdit.testimonyOwnerType) {
      editObjectTestimony.append('testimonyOwnerType', this.testimonyForm.get('testimonyOwnerType')?.value.type);
    }

    if (this.testimonyForm.get('name')?.value != this.initialTestimonyDataWhenEdit.name) {
      editObjectTestimony.append('name', this.testimonyForm.get('name')?.value);
    }

    if (this.testimonyForm.get('title')?.value != this.initialTestimonyDataWhenEdit.town) {
      editObjectTestimony.append('title', this.testimonyForm.get('title')?.value);
    }

    if (this.testimonyForm.get('message')?.value != this.initialTestimonyDataWhenEdit.message) {
      editObjectTestimony.append('message', this.testimonyForm.get('message')?.value);
    }

    if (this.testimonyForm.get('isActive')?.value != this.initialTestimonyDataWhenEdit.isActive) {
      editObjectTestimony.append('isActive', this.testimonyForm.get('isActive')?.value);
    }

    if (this.isImageEdit) {
      editObjectTestimony.append('image', this.testimonyForm.get('image')?.value);
    }

    this.testimonyService.editTestimony(this.initialTestimonyDataWhenEdit.id as string, editObjectTestimony).subscribe(
      (result) => {
        if (result.status === "success") {
          //affichage du message lors d'une édition sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une programme on revient à la liste
              () => { this.router.navigateByUrl("/temoignages") }
            );
        }
      },
      () => {
        this.messageService.add({ severity: 'info', detail: 'témoignage inconnu' });
      }
    )
  }

  showImagePreview(event: any) {

    const file = event.target.files[0];

    if (file) {
      this.isImageEdit = true;
      this.testimonyForm.patchValue({ image: file });
      this.formControls['image'].updateValueAndValidity();

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
