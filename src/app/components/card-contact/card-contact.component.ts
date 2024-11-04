import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';
import { ForbiddenNamesDirective, validateForbiddenNames } from '../../directives/forbidden-names.directive';
import { contact } from '../../models/contact.model';
import { ExponentialPipe } from '../../pipes/exponential.pipe';
import { ContactService } from '../../services/contact.service';
import { email } from '../../models/email.model';
import { phone } from '../../models/phone.model';

@Component({
  selector: 'app-card-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExponentialPipe, ForbiddenNamesDirective, EmailValidatorDirective],
  templateUrl: './card-contact.component.html',
  styleUrl: './card-contact.component.scss',
})
export class CardContactComponent
  implements
  OnInit,
  OnDestroy,
  AfterViewInit {
  //#region Variables

  // @Input()
  // model: contact | undefined;

  @Input()
  model: contact = {
    Name: '',
    Surname: '',
    Age: 16,
    Phones: [],
    Emails: [],
    ExtraInfoId : 0,
  }

  // @Input()
  // modelToEdit: contact | undefined;

  @Output()
  hideAddPanel: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  editMode: boolean = false;

  private die$: Subject<void> = new Subject<void>();

  exp: string = '1';

  fg = new FormGroup({

    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), validateForbiddenNames("Dario")]),
    surname: new FormControl<string>('', [Validators.required]),
    age: new FormControl<number>(16, [Validators.required, Validators.min(16)]),
    phones: new FormControl<Array<phone>>([], [Validators.required]),
    emails: new FormControl<Array<email>>([], [Validators.required])
  })

  invalidName: string = 'Giovanni';

  //#endregion

  constructor(private cs: ContactService) {

  }

  //#region Methods

  ngOnInit(): void {
    // console.log('CardContactComponent - ngOnInit');
    // console.log(this.editMode);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('CardContactComponent - ngOnChanges', changes);

  // }

  // ngDoCheck(): void {
  //   console.log('CardContactComponent - ngDoCheck');
  // }

  ngOnDestroy(): void {
    // console.log('CardContactComponent - ngOnDestroy');
    this.die$.next();
  }

  // ngAfterContentInit(): void {
  //   console.log('CardContactComponent - ngAfterContentInit');
  // }

  ngAfterViewInit(): void {
    // console.log('CardContactComponent - ngAfterViewInit');
    // console.log(this.editMode);
  }

  // ngAfterContentChecked(): void {
  //   console.log('CardContactComponent - ngAfterContentChecked');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('CardContactComponent - ngAfterViewChecked');
  // }

  editViewToggle() {
    // if (!this.modelToEdit) {
    //   this.modelToEdit = JSON.parse(JSON.stringify(this.model));
    // } else {
    //   this.modelToEdit = undefined;
    // }
    // this.hideAddPanel.emit();

    if (!this.editMode) {
      this.fg.controls.name.setValue(this.model.Name);
      this.fg.controls.surname.setValue(this.model.Surname);
      this.fg.controls.age.setValue(this.model.Age);
      this.fg.controls.emails.setValue(this.model.Emails)
      this.fg.controls.phones.setValue(this.model.Phones)

      // this.fg.setValue(this.model); se il modello e formControl hanno stessi nomi attributi

      this.editMode = true;
    } else {
      this.editMode = false;
    }
    // this.hideAddPanel.emit();

  }

  setFormControlToModel() {
    this.model.Name = this.fg.controls.name.value!;
    this.model.Surname = this.fg.controls.surname.value!;
    this.model.Age = this.fg.controls.age.value!;
    this.model.Phones = this.fg.controls.phones.value!;
    this.model.Emails = this.fg.controls.emails.value!;
  }

  updateSub: Subscription | undefined;

  upsert() {
    this.setFormControlToModel();
    this.updateSub = this.cs.updated$.pipe(takeUntil(this.die$)).subscribe({
      next: () => {
        this.updateSub?.unsubscribe();
        this.updateSub = undefined;
        if (this.model.ContactId) {
          this.editViewToggle();
        } else {
          this.hideAddPanel.emit();
        }
      },
    });
    if (this.model.ContactId) {
      this.cs.update(this.die$, this.model.ContactId!, this.model);
    } else {
      this.cs.create(this.die$, this.model!);
    }
  }

  delete() {
    this.cs.delete(this.die$, this.model!.ContactId!);
  }


  //#endregion
}
