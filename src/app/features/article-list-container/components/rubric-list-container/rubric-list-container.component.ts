import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rubric-list-container',
  imports: [],
  templateUrl: './rubric-list-container.component.html',
  styleUrl: './rubric-list-container.component.scss'
})
export class RubricListContainerComponent {
  rubrics = input<any>();
  chooseRubricEventEmiter = output<any>();

  onChooseRubric(id: string): void {
    this.chooseRubricEventEmiter.emit(id)
  }
}
