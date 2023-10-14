import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ConvertStringLabelToFontawesomeIconPipe } from '../../pipes/convertStringLabelToFontawesomeIcon/convert-string-label-to-fontawesome-icon.pipe';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EditorModule } from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton'
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [
    ConvertStringLabelToFontawesomeIconPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TableModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    InputNumberModule,
    AutoCompleteModule,
    InputSwitchModule,
    OverlayPanelModule,
    EditorModule,
    TooltipModule,
    SelectButtonModule,
    RadioButtonModule,
    SidebarModule
  ],
  exports : [
    FontAwesomeModule,
    ReactiveFormsModule,
    ConvertStringLabelToFontawesomeIconPipe,
    TableModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    InputNumberModule,
    AutoCompleteModule,
    InputSwitchModule,
    OverlayPanelModule,
    EditorModule,
    TooltipModule,
    SelectButtonModule,
    RadioButtonModule,
    SidebarModule
  ]
})

export class PrimengModule { }
