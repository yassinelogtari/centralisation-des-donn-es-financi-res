import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilledFile } from '../File'; 

@Injectable({
  providedIn: 'root'
})
export class FilledFileService {

  private apiUrl = 'http://localhost:8090/api/file/filledFiles';

  constructor(private http: HttpClient) { }

  getFilledFiles(): Observable<FilledFile[]> {
    return this.http.get<FilledFile[]>(this.apiUrl);
  }
  downloadFilledFile(id: number): Observable<Blob> {
    return this.http.get(`http://localhost:8090/api/file/filled/download/${id}`, { responseType: 'blob' });
  }
}
