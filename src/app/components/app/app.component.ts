import { CommonModule } from '@angular/common';
import {
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CardContactComponent } from '../card-contact/card-contact.component';
import {
  QueryFilterComponent,
} from '../query-filter/query-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CardContactComponent,
    CommonModule,
    QueryFilterComponent,
    HighlightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //#region Variables
  title = 'WebApp_Contacts';


  //#region Methods

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('AppComponent - ngOnChanges', changes);
  // }

  // ngDoCheck(): void {
  //   console.log('AppComponent - ngDoCheck');
  // }


  // ngAfterContentInit(): void {
  //   console.log('AppComponent - ngAfterContentInit');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('AppComponent - ngAfterContentChecked');
  // }

  // ngAfterViewInit(): void {
  //   console.log('AppComponent - ngAfterViewInit');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('AppComponent - ngAfterViewChecked');
  // }


  //#endregion
}
