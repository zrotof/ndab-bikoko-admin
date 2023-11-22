import { NgIf, NgFor, NgClass, AsyncPipe, Location, DatePipe } from '@angular/common';
import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, lastValueFrom, timer, pipe } from 'rxjs';
import { Rubric } from 'src/app/shared/models/rubric';
import { ArticleService } from 'src/app/shared/services/article/article.service';

@Component({
  selector: 'app-agenda-add-edit-container',
  templateUrl: './agenda-add-edit-container.component.html',
  styleUrls: ['./agenda-add-edit-container.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    EditorModule
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, DatePipe]
})
export class AgendaAddEditContainerComponent implements OnInit {

  eventTypes$ !: Observable<Rubric[]>;
  articleList$ !: Observable<any>;

  agendaForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  imageDisplay!: string | ArrayBuffer | null;
  isImageEdit = false;

  initialAgendaDataWhenEdit: any;
  
  constructor(
    private fb : FormBuilder,
    private agendaService : AgendaService,
    private articleService : ArticleService,
    private messageService : MessageService, 
    private location: Location,
    private activatedRoute : ActivatedRoute,
    private datePipe : DatePipe
  ){}
  
  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getEventTypes();
    this.getArticleList();
  }

  initForm() : void {
    this.agendaForm = this.fb.group(
      {
        title : ["", Validators.required],
        date : ["", Validators.required],
        hour : [""],
        coverImage : ["", Validators.required],
        eventType : ["", Validators.required],
        article : [""]
      }
    );
  }

  getEventTypes(): void {
    this.eventTypes$ = this.agendaService.getEventTypeList().pipe(
      map(result => result.map( (res: Rubric)=> {
        return {
          id: res.id,
          name: res.name
        }
      }))
    );
  }

  getArticleList(): void {
    this.articleList$ = this.articleService.getArticleList().pipe(
      map(result => result.map( (res: any)=> {
        return {
          id: res.id,
          title: res.title,
          date: res.date,
          coverImage : res.coverImage
        }
      }))
    )
  }

  get formControls(){
    return this.agendaForm.controls
  }

 
  checkEditMode(){
    this.activatedRoute.params.subscribe(
       (params : any)=>{
        if(params.id){
          this.isEditMode = true;

          this.agendaService.getEventById(params.id).subscribe(
            (result : any) => {
              if(result.status === "success"){
                //initialising first data when edit in order to know if value have any changes
                this.initialAgendaDataWhenEdit = result.data;

                this.agendaForm.controls['title'].setValue(this.initialAgendaDataWhenEdit.title);
                this.agendaForm.controls['date'].setValue(new Date(this.initialAgendaDataWhenEdit.date));
                this.agendaForm.controls['hour'].setValue(this.initialAgendaDataWhenEdit.hour);
                
                this.eventTypes$.subscribe({
                  next : (result) => {
                    const currentEventType = result.filter(res => res.id === this.initialAgendaDataWhenEdit.eventTypeId)
                    this.agendaForm.controls['eventType'].setValue(currentEventType[0]);
                  }
                })

                this.articleList$.subscribe({
                  next : (result) => {
                    const currentArticle = result.filter((res : any) => res.id === this.initialAgendaDataWhenEdit.articleId);
                    this.agendaForm.controls['article'].setValue(currentArticle[0]);
                  }
                })

                const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
                this.imageDisplay = `${this.initialAgendaDataWhenEdit.coverImage}`;
                imagePreviewed.style.display = 'block';
                this.agendaForm.controls['coverImage'].clearValidators();
                this.agendaForm.controls['coverImage'].updateValueAndValidity();
              }
            },
            () =>{
              this.messageService.add({
                severity:'warn', 
                detail: "Évènement d'agenda inexistant, contactez le webmaster"
              });
              return;
            }
          )
        }
      },
      () =>{
        this.messageService.add({
          severity:'warn', 
          detail: "Évènement d'agenda inconnu"
        });
        return;
      }
    )
  }

onCancelAddEditEvent(){
  this.location.back();
}

onSaveEvent(){
  this.isSaveButtonClicked = true;

  if(this.agendaForm.invalid){
    return;
  }

  const newEvent = new FormData();

  if(this.agendaForm.get('title')?.value){
    newEvent.append('title', this.agendaForm.get('title')?.value);
  }

  if(this.agendaForm.get('date')?.value){
    newEvent.append('date', this.agendaForm.get('date')?.value);
  }

  if(this.agendaForm.get('hour')?.value){
    newEvent.append('hour', this.agendaForm.get('hour')?.value);
  }

  if(this.agendaForm.get('coverImage')?.value){
    newEvent.append('coverImage', this.agendaForm.get('coverImage')?.value);
  }

  if(this.agendaForm.get('eventType')?.value){
    newEvent.append('eventTypeId', this.agendaForm.get('eventType')?.value.id);
  }

  this.agendaService.addEvent(newEvent)
      .subscribe(
        (result : any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({severity:'success', detail: result.message});
          lastValueFrom(timer(2000))
          .then(
            //après l'ajout d'une catégorie on revient à la liste
          () =>{this.location.back()});
        }
      )
}

onEditEvent(){

  this.isEditButtonClicked = true;

    if(
      this.agendaForm.controls['title'].value === this.initialAgendaDataWhenEdit.title
      &&
      this.agendaForm.controls['date'].value.getTime() === (new Date(this.initialAgendaDataWhenEdit.date).getTime())
      &&
      this.agendaForm.controls['hour'].value === this.initialAgendaDataWhenEdit.hour
      &&
      (
        this.agendaForm.controls['article'].value?.id === this.initialAgendaDataWhenEdit.articleId
        ||
        typeof(this.agendaForm.controls['article'].value?.id) === 'undefined'
      )
      &&
      this.agendaForm.controls['eventType'].value.id === this.initialAgendaDataWhenEdit.eventTypeId
      &&
      !this.isImageEdit
    ){
      this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
      return ;
    }

    const editObjectAEvent = new FormData();

    if(this.agendaForm.get('title')?.value != this.initialAgendaDataWhenEdit.title){
      editObjectAEvent.append('title', this.agendaForm.get('title')?.value);
    }

    if(this.agendaForm.get('description')?.value != this.initialAgendaDataWhenEdit.description){
      editObjectAEvent.append('description', this.agendaForm.get('description')?.value);
    }

    if(this.agendaForm.get('date')?.value.getTime() != (new Date(this.initialAgendaDataWhenEdit.date).getTime())){
      editObjectAEvent.append('date', this.agendaForm.get('date')?.value);
    }

    if(this.agendaForm.get('hour')?.value != this.initialAgendaDataWhenEdit.hour){
      editObjectAEvent.append('hour', this.agendaForm.get('hour')?.value);
    }

    if(this.isImageEdit){
      editObjectAEvent.append('coverImage', this.agendaForm.get('coverImage')?.value);
    }

    if(typeof(this.agendaForm.controls['article'].value?.id) != 'undefined' && this.agendaForm.controls['article'].value?.id != this.initialAgendaDataWhenEdit.articleId){
      editObjectAEvent.append('articleId', this.agendaForm.get('article')?.value.id);
    }

    if(this.agendaForm.get('eventType')?.value.id != this.initialAgendaDataWhenEdit.eventTypeId){
      editObjectAEvent.append('eventTypeId', this.agendaForm.get('eventType')?.value.id);
    }

    this.agendaService.editEventById(this.initialAgendaDataWhenEdit.id as string, editObjectAEvent).subscribe(
      (result)=>{
        if(result.status === "success"){
         //affichage du message lors d'une édition sans erreur
         this.messageService.add({severity:'success', detail: result.message});
         lastValueFrom(timer(2000))
         .then(
           //après l'ajout d'une programme on revient à la liste
           () => { this.location.back() }
          );
        }
      },
      ()=>{
        this.messageService.add({severity:'info', detail: "Évènement d'agenda inconnu"});
      }
    )
  }

showImagePreview(event: any){
    
  const file = event.target.files[0];

  if(file){
    this.isImageEdit = true;
    this.agendaForm.patchValue({coverImage: file});
    this.formControls['coverImage'].updateValueAndValidity();

    const fileReader = new FileReader();
    fileReader.onload = () =>{
      this.imageDisplay = fileReader.result;
    }

    fileReader.readAsDataURL(file);

    const imgElement = <HTMLElement>document.getElementById('image-previewed');
    imgElement.style.display = 'block';
  }
}

convertDate( date : Date ) : string | null {
  return this.datePipe.transform(date, 'dd/MM/yyyy');
}
}


