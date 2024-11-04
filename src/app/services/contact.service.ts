import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { contact } from "../models/contact.model";
import { ODataResponse } from "../models/oDataContact.model";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) { }


    path: string = 'https://localhost:7023/api/Contact';
    pathOD:  string = 'https://localhost:7023/odata/Contact';

    private subs: Subscription[] = [];

    updated$: Subject<void> = new Subject<void>();

    contacts$: BehaviorSubject<contact[]> = new BehaviorSubject<contact[]>([]);

    //Metodo vecchio
    // onDestroy() {
        // this.subs.forEach(s => {
        //     s.unsubscribe();
        // })
        // this.subs.length = 0;
    // }

    // getAll() {
    //     this.subs.push(this.http.get<contact[]>(this.path).subscribe({
    //         next: (result) => {
    //             this.contacts$.next(result);
    //         },
    //         error: (err) => {
    //             console.error(err);
    //         }
    //     }));
    // }

    //Metodo nuovo
    
    getAll(die$: Subject<void>) {
        this.http.get<contact[]>(this.path).pipe(takeUntil(die$)).subscribe({
            next: (result) => {
                this.contacts$.next(result);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    getAllOData(die$: Subject<void>) {
        this.http.get<ODataResponse<contact>>(`${this.pathOD}?expand=Phones,Emails`).pipe(takeUntil(die$)).subscribe({
            next: (result) => {
                this.contacts$.next(result.value);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    getSingle(die$: Subject<void>, id: number) {
        this.http.get<contact>('')
            .subscribe((result) => {

            });
    }

    create(die$: Subject<void>, contact: contact) {
        this.http.post<contact>(this.path, contact).pipe(takeUntil(die$)).subscribe({
            next: (result) => {
                this.contacts$.value.push(result);
                this.contacts$.next(this.contacts$.value);
                this.updated$.next();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    update(die$: Subject<void>, id: number, contact: contact) {
        this.http.put<contact>(`${this.path}/${id}`, contact).pipe(takeUntil(die$)).subscribe({
            next: (result) => {
                const contactToUpdate: contact | undefined = this.contacts$.value.find(c => {
                    return c.ContactId === result.ContactId
                });

                if (contactToUpdate) {
                    contactToUpdate.Name = result.Name;
                    contactToUpdate.Surname = result.Surname;
                    contactToUpdate.Age = result.Age;
                    contactToUpdate.Phones = result.Phones;
                    contactToUpdate.Emails = result.Emails;
                    
                    this.contacts$.next(this.contacts$.value);
                    this.updated$.next();
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    delete(die$: Subject<void>, id: number) {
        this.http.delete<contact>(`${this.path}/${id}`).pipe(takeUntil(die$)).subscribe({
            next: (result) => {
                const index = this.contacts$.value.findIndex(c => c.ContactId === result.ContactId);
                if (index > -1) {
                    this.contacts$.value.splice(index, 1);
                    this.contacts$.next(this.contacts$.value);
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

}