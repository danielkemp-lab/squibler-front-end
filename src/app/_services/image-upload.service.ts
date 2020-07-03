import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    constructor(private http: HttpClient) {}

  uploadImage(formData) {
    return this.http.post(
        `${environment.backUrlImage}/upload`,
        formData,
        {headers: {Authorization: `JWT ${localStorage.token}`}}
    );
  }
}
