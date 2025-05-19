import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable, map, lastValueFrom, timer } from 'rxjs';
import { ProcessState } from 'src/app/core/enums/process-state.enum';
import { Rubric } from 'src/app/core/models/blog';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { User } from 'src/app/shared/models/user';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-article-add-edit-container',
  templateUrl: './article-add-edit-container.component.html',
  styleUrl: './article-add-edit-container.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
  imports: [
    NgIf,
    NgClass,
    AsyncPipe,
    RouterLink,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    DatePickerModule,
    TextareaModule,
    SelectModule,
    EditorModule,
    ToggleSwitchModule,
    PageTopHeaderComponent
  ]
})

export class ArticleAddEditContainerComponent {

  PROCESS_STATE = ProcessState;
  processState = input<ProcessState>();
  private router = inject(Router)
  id = input<string>()

  private blogService = inject(BlogService)

  connectedUser !: User;


  blogRubrics$ = this.blogService.getBlogRubrics().pipe(
    map(result => result.map((res: Rubric) => {
      return {
        id: res.id,
        name: res.name
      }
    }))
  );

  articleForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  imageDisplay!: string | ArrayBuffer | null;
  isImageEdit = false;

  initialArticleDataWhenEdit: any;

  isMediaVideoInputIsToDisable = true;

  topHeaderPageData = computed(() => {
    if (this.processState() === ProcessState.Create) {
      return { title: "Créer Un d'Article", description: "Création d'un nouvel article" }
    }

    return { title: "Modifier Un Article", description: "Modification d'un article" }
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getUserConnected();
    this.onHandlingMedia();
  }

  initForm(): void {
    this.articleForm = this.fb.group(
      {
        title: ["", Validators.required],
        description: ["", Validators.required],
        date: ["", Validators.required],
        hour: [""],
        content: ["", Validators.required],
        hasVideo: [false],
        videoLink: [""],
        coverImage: ["", Validators.required],
        rubric: ["", Validators.required]
      }
    );
  }

  onHandlingMedia() {
    this.articleForm.controls['hasVideo'].valueChanges.subscribe(
      result => {

        if (result) {
          this.articleForm.controls['videoLink'].enable();
          this.articleForm.controls['videoLink'].setValidators(Validators.required);
        }
        else {
          this.articleForm.controls['videoLink'].setValue('');
          this.articleForm.controls['videoLink'].disable();
          this.articleForm.controls['videoLink'].removeValidators(Validators.required);
        }

        this.isMediaVideoInputIsToDisable = !this.isMediaVideoInputIsToDisable;
        this.articleForm.controls['videoLink'].updateValueAndValidity();
      }
    )
  }

  get formControls() {
    return this.articleForm.controls
  }

  checkEditMode() {

    if (this.processState() === ProcessState.Edit) {

      this.blogService.getBlogArticleById(this.id() as string).subscribe(
        (result: any) => {
          if (result.status === "success") {
            //initialising first data when edit in order to know if value have any changes
            this.initialArticleDataWhenEdit = result.data;

            this.articleForm.controls['title'].setValue(this.initialArticleDataWhenEdit.title);
            this.articleForm.controls['description'].setValue(this.initialArticleDataWhenEdit.description);
            this.articleForm.controls['date'].setValue(new Date(this.initialArticleDataWhenEdit.date));
            this.articleForm.controls['hour'].setValue(this.initialArticleDataWhenEdit.hour);
            this.articleForm.controls['content'].setValue(this.initialArticleDataWhenEdit.content);
            this.articleForm.controls['hasVideo'].setValue(this.initialArticleDataWhenEdit.hasVideo);
            this.articleForm.controls['videoLink'].setValue(this.initialArticleDataWhenEdit.videoLink);

            this.blogRubrics$.subscribe({
              next: (result) => {
                const currentRubric = result.filter((res: any) => res.id === this.initialArticleDataWhenEdit.rubricId)
                this.articleForm.controls['rubric'].setValue(currentRubric[0]);
              }
            })

            const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
            this.imageDisplay = `${this.initialArticleDataWhenEdit.coverImage}`;
            imagePreviewed.style.display = 'block';
            this.articleForm.controls['coverImage'].clearValidators();
            this.articleForm.controls['coverImage'].updateValueAndValidity();
          }
        },
        () => {
          this.messageService.add({
            severity: 'warn',
            detail: 'Article inexistant, contactez le webmaster'
          });
          return;
        }
      )
    }
  }

  getUserConnected(): void {
    this.connectedUser = this.activatedRoute.snapshot.data.user;
  }

  onSaveArticle() {

    this.isSaveButtonClicked = true;

    if (this.articleForm.invalid) {
      return;
    }

    const newArticle = new FormData();

    if (this.articleForm.get('title')?.value) {
      newArticle.append('title', this.articleForm.get('title')?.value);
    }

    if (this.articleForm.get('description')?.value) {
      newArticle.append('description', this.articleForm.get('description')?.value);
    }

    if (this.articleForm.get('date')?.value) {
      newArticle.append('date', this.articleForm.get('date')?.value);
    }

    if (this.articleForm.get('hour')?.value) {
      newArticle.append('hour', this.articleForm.get('hour')?.value);
    }

    if (this.articleForm.get('hasVideo')?.value) {
      newArticle.append('hasVideo', this.articleForm.get('hasVideo')?.value);
    }

    if (this.articleForm.get('videoLink')?.value) {
      newArticle.append('videoLink', this.articleForm.get('videoLink')?.value);
    }

    if (this.articleForm.get('coverImage')?.value) {
      newArticle.append('coverImage', this.articleForm.get('coverImage')?.value);
    }

    if (this.articleForm.get('content')?.value) {
      newArticle.append('content', this.articleForm.get('content')?.value);
    }

    if (this.articleForm.get('rubric')?.value) {
      newArticle.append('rubricId', this.articleForm.get('rubric')?.value.id);
    }

    //newArticle.append('userId', this.connectedUser!.id as string)
    newArticle.append('userId', '1')

    this.blogService.addArticle(newArticle)
      .subscribe(
        (result: any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une catégorie on revient à la liste
              () => { this.router.navigateByUrl("/blog/articles") });
        }
      )
  }

  onEditArticle() {
    this.isEditButtonClicked = true;

    if (
      this.articleForm.controls['title'].value === this.initialArticleDataWhenEdit.title
      &&
      this.articleForm.controls['description'].value === this.initialArticleDataWhenEdit.description
      &&
      this.articleForm.controls['date'].value.getTime() === (new Date(this.initialArticleDataWhenEdit.date).getTime())
      &&
      this.articleForm.controls['hour'].value === this.initialArticleDataWhenEdit.hour
      &&
      this.articleForm.controls['content'].value === this.initialArticleDataWhenEdit.content
      &&
      this.articleForm.controls['hasVideo'].value === this.initialArticleDataWhenEdit.hasVideo
      &&
      this.articleForm.controls['videoLink'].value === this.initialArticleDataWhenEdit.videoLink
      &&
      this.articleForm.controls['rubric'].value.id === this.initialArticleDataWhenEdit.rubricId
      &&
      !this.isImageEdit
    ) {
      this.messageService.add({ severity: 'info', detail: 'Aucune modification enregistrée' });
      return;
    }

    const editObjectArticle = new FormData()

    if (this.articleForm.get('title')?.value != this.initialArticleDataWhenEdit.title) {
      editObjectArticle.append('title', this.articleForm.get('title')?.value);
    }

    if (this.articleForm.get('description')?.value != this.initialArticleDataWhenEdit.description) {
      editObjectArticle.append('description', this.articleForm.get('description')?.value);
    }

    if (this.articleForm.get('date')?.value.getTime() != (new Date(this.initialArticleDataWhenEdit.date).getTime())) {
      editObjectArticle.append('date', this.articleForm.get('date')?.value);
    }

    if (this.articleForm.get('hour')?.value != this.initialArticleDataWhenEdit.hour) {
      editObjectArticle.append('hour', this.articleForm.get('hour')?.value);
    }

    if (this.articleForm.get('hasVideo')?.value != this.initialArticleDataWhenEdit.hasVideo) {
      editObjectArticle.append('hasVideo', this.articleForm.get('hasVideo')?.value);
    }

    if (this.articleForm.get('videoLink')?.value != this.initialArticleDataWhenEdit.videoLink) {
      editObjectArticle.append('videoLink', this.articleForm.get('videoLink')?.value);
    }

    if (this.isImageEdit) {
      editObjectArticle.append('coverImage', this.articleForm.get('coverImage')?.value);
    }

    if (this.articleForm.get('content')?.value != this.initialArticleDataWhenEdit.content) {
      editObjectArticle.append('content', this.articleForm.get('content')?.value);
    }

    if (this.articleForm.get('rubric')?.value.id != this.initialArticleDataWhenEdit.rubricId) {
      editObjectArticle.append('rubricId', this.articleForm.get('rubric')?.value.id);
    }

    //editObjectArticle.append('userId', this.connectedUser.id as any);
    editObjectArticle.append('userId', '1');

    
    this.blogService.editArticle(this.initialArticleDataWhenEdit.id as string, editObjectArticle).subscribe(
      (result) => {
        if (result.status === "success") {
          //affichage du message lors d'une édition sans erreur
          this.messageService.add({ severity: 'success', detail: result.message });
          lastValueFrom(timer(2000))
            .then(
              //après l'ajout d'une programme on revient à la liste
              () => { this.router.navigateByUrl("/blog/articles") }
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
      this.articleForm.patchValue({ coverImage: file });
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


