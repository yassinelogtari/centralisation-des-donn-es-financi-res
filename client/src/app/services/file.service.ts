import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../File';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8090/file';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.baseUrl);
  }
}
