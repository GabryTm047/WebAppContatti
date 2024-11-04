import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { DxFilterBuilderComponent, DxFilterBuilderModule } from 'devextreme-angular';

export type Condition = Condition[] | string | number;
export type Fields = typeof fields;

const fields: Record<string, string | number>[] = [
  {
    caption: 'ID',
    dataField: 'ContactId',
    dataType: 'number',
  },
  {
    dataField: 'Name',
    dataType: 'string',
  },
  {
    dataField: 'Surname',
    dataType: 'string',
  },
  {
    dataField: 'Phone',
    dataType: 'string',
  },
  {
    dataField: 'Age',
    dataType: 'number',
  },
];

@Component({
  selector: 'app-query-filter',
  standalone: true,
  imports: [DxFilterBuilderModule],
  templateUrl: './query-filter.component.html',
  styleUrl: './query-filter.component.scss',
})
export class QueryFilterComponent
{

  fields: Fields = fields;

  private _filter: Condition = [];
  @Input()
  get filter() {
    return this._filter;
  }
  set filter(value: Condition) {
    console.log("QueryFilterComponent - setter filter on changes", {previous: JSON.parse(JSON.stringify(this._filter)), next: value})
    this._filter = value;
  }

  @ViewChild(DxFilterBuilderComponent)
  filterBuilderInstance: DxFilterBuilderComponent | undefined;

  @Output()
  apply: EventEmitter<Condition> = new EventEmitter<Condition>();

  applyFilter() {
    //passo dati al figlio o parent o sibling
    
    this.apply.emit(this.filter);
  }

  // ngOnInit(): void {
  //   console.log('QueryFilterComponent - ngOnInit');
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('QueryFilterComponent - ngOnChanges', changes);
  // }

  // ngDoCheck(): void {
  //   console.log('QueryFilterComponent - ngDoCheck');
  // }

  // ngOnDestroy(): void {
  //   console.log('QueryFilterComponent - ngOnDestroy');
  // }

  // ngAfterContentInit(): void {
  //   console.log('QueryFilterComponent - ngAfterContentInit');
  // }

  // ngAfterViewInit(): void {
  //   console.log('QueryFilterComponent - ngAfterViewInit');

  // }

  // ngAfterContentChecked(): void {
  //   console.log('QueryFilterComponent - ngAfterContentChecked');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('QueryFilterComponent - ngAfterViewChecked');
  // }

  prova() {
    this.filterBuilderInstance?.writeValue(['Surname', 'contains', 'CIAO']);
  } 
}
