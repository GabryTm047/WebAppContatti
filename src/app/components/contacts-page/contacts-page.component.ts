import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HighlightDirective } from '../../directives/highlight.directive';
import { contact } from '../../models/contact.model';
import { AuthService } from '../../services/auth.service';
import { ContactService } from '../../services/contact.service';
import { CardContactComponent } from '../card-contact/card-contact.component';
import { Condition, QueryFilterComponent } from '../query-filter/query-filter.component';
import ODataStore from 'devextreme/data/odata/store';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [RouterOutlet,
    CardContactComponent,
    CommonModule,
    QueryFilterComponent,
    HighlightDirective,],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent implements OnInit {

  title: string = 'Titolo';

  newContact: contact | undefined;

  appFilter: Condition = [];
  savedFilter: Condition = ['Name', 'contains', 'pippo'];

  appColor: string = 'blue';
  altColor: string = 'red';
  stdColor: string = 'blue';

  store: ODataStore = new ODataStore({
    url: "https://localhost:7023/odata/Contact",
    key: "ContactId",
    keyType: "Int32",
    withCredentials: true,
    beforeSend: (request) => {
      request.headers = {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("Auth")!).token}`
      }
    },
    onLoaded: (data) => {
      this.cs.contacts$.next(data);
    }
  });

  private die$: Subject<void> = new Subject<void>();
  //#endregion

  constructor(public cs: ContactService, public as: AuthService, private _router: Router) { }

  loggedInSub : Subscription | undefined;
  ngOnInit(): void {
    this.cs.getAllOData(this.die$);
    this.loggedInSub = this.as.loggedIn$.subscribe({
      next: (p) => {
        if (!p)  {
          this._router.navigate(['/login']);
        }
      }
    })

  }

  addPanelToggle() {
    if (this.newContact) {
      this.newContact = undefined;
    } else {
      this.newContact = {
        Name: '',
        Surname: '',
        Age: 18,
        Phones: [],
        Emails: [],
        ExtraInfoId: 0,
        ContactId: 0,
        ExtraInfo: undefined 
      };
    }
    console.log(this.cs.contacts$.value);
  }

  applyFilterOnApp(filter: Condition) {
    //qui arriva il filtro dal figlio
    this.store.load({
      filter: filter
    });
    console.log('ecco il filtro');
  }

  loadFilter() {
    this.appFilter = JSON.parse(JSON.stringify(this.savedFilter));
  }

  changeColor() {
    this.appColor == this.altColor ? this.appColor = this.stdColor : this.appColor = this.altColor;
  }

  ngOnDestroy(): void {
    // console.log('AppComponent - ngOnDestroy');
    this.loggedInSub?.unsubscribe();
    this.loggedInSub = undefined;
    this.die$.next();
  }

}
