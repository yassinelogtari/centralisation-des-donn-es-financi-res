import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../File';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8090/api/file';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.baseUrl);
  }

  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }
  getFileCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
  getFileFilledCount():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/filled/count`)
  }
  getFilesByUserType(userType: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.baseUrl}/userType/${userType}`);
  }

  getFileById(id: number): Observable<File> {
    return this.http.get<File>(`${this.baseUrl}/${id}`);
  }

  updateFile(id: number, formData: FormData): Observable<File> {
    return this.http.put<File>(`${this.baseUrl}/${id}`, formData);
  }
}
