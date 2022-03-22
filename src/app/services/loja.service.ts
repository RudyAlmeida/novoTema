import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    // private url = 'http://localhost:8080';
    private url = {
        store: 'http://35.224.127.34:8080',
        currency: 'http://35.224.15.49:2000',
    };

    constructor(private http: HttpClient) { }

    getProducts(): Promise<any> {
        return this.http.get(this.url.store + '/products').toPromise();
    }

    getCurrency(): Promise<any> {
        return this.http.get(this.url.currency + '/exchange').toPromise();
    }
}
