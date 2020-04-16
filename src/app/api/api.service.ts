import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, expand, filter, map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
// import {Http, Headers} from '@angular/http';
// import ResponseContentType;

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

   private base =  window["cfgApiBaseUrl"];
  //private base = 'http://localhost:8077/';

  table: number;

  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //     btoa('username:password'));
  // }

  login(user): Observable<any> {

    const url = 'auth/login';
    return this.http.post<any>(this.base + url, user)
      .pipe(catchError(this.errorHandler));
  }
  getAllUsers(): Observable<any> {
    const url = 'users/dis';
    return this.http.get(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  getUserById(id: number): Observable<any> {
    const url = 'users/';
    return this.http.get<any>(this.base + url + id  + '?jwt_token=' + window.localStorage.getItem('token'))
    .pipe(catchError(this.errorHandler));
  }
  updateProfile(updatedProfile): Observable<any> {
    const url = 'users/update/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), updatedProfile);
  }
  getDepUsers(id: number): Observable<any> {
    const url = 'depts/';
    return this.http.get(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'))
      .pipe(catchError(this.errorHandler));

  }
  getOwnUsers(): Observable<any> {
    const url = 'users/dis';
    return this.http.get(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  //Не рабочий метод. Следует ожидать когда будет доведен до ума на беке
  // getExUsers(): Observable<any> {
  //   const url = 'users/ex/dis';
  //   return this.http.get(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'));
  // }
  getUserDocs(id: number): Observable<any> {
    const url = 'docs/user/';
    return this.http.get<any>(this.base + url + id)
    .pipe(catchError(this.errorHandler));
  }

  uploadFileData(data): Observable<any> {
    const url = 'docs/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id,  data).
    pipe(catchError(this.errorHandler));
  }

  deleteFileData(id: number): Observable<any> {
    const url = 'docs/' + id;
    return this.http.delete<any>(this.base + url);
  }

  uploadFile(id , fileToUpload): Observable<any> {
    const url = 'docs/addFile/';
    // const headers1 = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'});
    // const options = { headers: headers1 };
    // const  headers = new  HttpHeaders().set('Content-Type', 'multipart/form-data');
    // const options = { headers };
    console.log(id);
    console.log(fileToUpload);
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload.file, fileToUpload.file.name);
    console.log(formData.get('file'));
    // console.log(headers);
    return this.http.post<any>(this.base + url + id, fileToUpload);
  }

  downloadFile(filename): Observable<Blob> {
    const url = 'docs/uploads/';
    return this.http.get<Blob>(this.base + url + filename, { responseType: 'blob' as 'json' });
  }

  uploadYourPlan(data): Observable<any> {
    const url = 'plans/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, data);
  }
  getYourPlan(): Observable<any> {
    const url = 'plans/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).
      pipe(catchError(this.errorHandler));
  }

  downloadYourPlan(): Observable<any> {
    const url = 'plans/reportPdf/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    // @ts-ignore
    return this.http.get<any>(this.base + url + id, { headers, responseType: 'blob' });
  }

  updateYourPlan(planId, newPlan): Observable<any> {
    const url = 'plans/update/';
    return this.http.patch<any>(this.base + url + planId, newPlan);
  }

  getActivity(): Observable<any> {
    const url = 'academic-method/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  selectTable(table) {
    this.table = table;
  }

  uploadActivity(activity): Observable<any> {
    const url = 'academic-method/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), activity).
    pipe(catchError(this.errorHandler));
  }
  updateActivity(acId, activity): Observable<any> {
    const url = 'academic-method/';
    return this.http.patch<any>(this.base + url + acId + '?jwt_token=' + window.localStorage.getItem('token'), activity).
    pipe(catchError(this.errorHandler));
  }

  getBudget(): Observable<any> {
    const url = 'budget-research/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token')).pipe(catchError(this.errorHandler));
  }
  uploadBudget(budget): Observable<any> {
    const url = 'budget-research/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, budget).
    pipe(catchError(this.errorHandler));
  }
  getOrg(): Observable<any> {
    const url = 'org-acts/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).pipe(catchError(this.errorHandler));
  }
  uploadOrg(org): Observable<any> {
    const url = 'org-acts/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, org).pipe(catchError(this.errorHandler));
  }



  getPublications(): Observable<any> {
    const url = 'publication/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token')).pipe(catchError(this.errorHandler));
  }
  uploadPub(pub): Observable<any> {
    const url = 'publication/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), pub).pipe(catchError(this.errorHandler));
  }
  updatePub(id, pub): Observable<any> {
    const url = 'publication/update/';
    return this.http.patch<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), pub);
  }

  getEvent(): Observable<any> {
    const url = 'event/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).pipe(catchError(this.errorHandler));
  }
  uploadEvent(Event1): Observable<any> {
    const url = 'event/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, Event1).pipe(catchError(this.errorHandler));
  }
  updateEvent(id, event): Observable<any> {
    const url = 'event/update/';
    return this.http.patch<any>(this.base + url + id, event);
  }

  getEdu(): Observable<any> {
    const url = 'edu-social/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).pipe(catchError(this.errorHandler));
  }
  uploadEdu(Edu): Observable<any> {
    const url = 'edu-social/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, Edu).pipe(catchError(this.errorHandler));
  }
  getPlanPerfomance(): Observable<any> {
    const url = 'plan-perform/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).pipe(catchError(this.errorHandler));
  }
  uploadPlanPerfomace(planPer): Observable<any> {
    const url = 'plan-perform/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, planPer).pipe(catchError(this.errorHandler));
  }
  updatePlanPerfomance(planPer): Observable<any> {
    const url = 'plan-perform/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.patch<any>(this.base + url + id, planPer);
  }

  getReasearch(): Observable<any> {
    const url = 'comm-work/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get<any>(this.base + url + id).pipe(catchError(this.errorHandler));
  }
  uploadResearch(research): Observable<any> {
    const url = 'comm-work/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post<any>(this.base + url + id, research).pipe(catchError(this.errorHandler));
  }

  downloadPubFile(filePath): Observable<any>{
    let headers = new HttpHeaders();
    const url = 'publication/uploads/';
    headers = headers.set('Content-Type', 'application/octet-stream');
    // const blob = new Blob(filePath, { type: 'application/octet-stream' });
    //
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    return this.http.get<any>(this.base + url + filePath + '?jwt_token=' + window.localStorage.getItem('token'), { headers, responseType: 'blob' as 'json'});
  }
  generatePubFile() : Observable<any> {
    const url = 'publication/reportPdf/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    // @ts-ignore
    return this.http.get<any>(this.base + url + id, { headers, responseType: 'blob' });
  }
  uploadPubFile(id, file): Observable<any> {
      const url = 'publication/addFile/';
      console.log(id);
      console.log(file);
      console.log(file.name);
      // const newBlob = new Blob([file], { type: 'multipart/form-data' });
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      // formData.append('id', id);
      // const httpHeaders = new HttpHeaders ({
      //   'Content-Type': 'multipart/form-data',
      //   Authorization: 'Bearer ' + localStorage.getItem('token')
      // });
      console.log(formData.get('file'));
      // console.log(formData.get('id'));
      return this.http.post<any>(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), formData);
  }

  getAllMyDisSovets(): Observable<any> {
    const url = 'dissovet/member/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  getSecDisSovet(): Observable<any> {
    const url = 'dissovet/secretary/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  uploadDisSovet(disSovet): Observable<any> {
    const url = 'dissovet/add';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), disSovet);
  }

  uploadDisMember(disId, disMember): Observable<any> {
    const url = 'dissovet/add/memberUser/';
    return this.http.post(this.base + url + disId + '?jwt_token=' + window.localStorage.getItem('token'), disMember);
  }
  uploadNewUser(newUser): Observable<any> {
    const url = 'levye/add';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), newUser);
  }


  getScienceProject(): Observable<any> {
    const url = 'science-member/user/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  getAllScienceProjects(): Observable<any> {
    const url = 'projects/all';
    return this.http.get(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'));
  }
  updateScienceProject(id, proj): Observable<any> {
    const url = 'projects/update/';
    return this.http.patch(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), proj);
  }


  getAllTeachers(): Observable<any> {
    const url = 'users/teachers';
    return this.http.get(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'));
  }

  addProject(project): Observable<any> {
    const url = 'projects/add/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.post(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'), project);
  }
  addMemberToProject(member): Observable<any> {
    const url = 'science-member/add';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), member);
  }

  addRole(role): Observable<any> {
    const url = 'roles/add';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), role);
  }
  deleteScPrRole(id): Observable<any> {
    const url = 'roles/del/';
    return this.http.delete(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }

  getNotifications(): Observable<any> {
    const url = 'notifications/all/';
    const id = this.getDecodedAccessToken(localStorage.getItem('token')).jti;
    return this.http.get(this.base + url + id + '?jwt_token=' + window.localStorage.getItem('token'));
  }

  addPatent(patent): Observable<any> {
    const url = 'patent/add';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), patent);
  }

  getPatent(userId): Observable<any> {
    const url = 'patent/getByUserId';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), userId);
  }

  getAllPatents(scienceId): Observable<any> {
    const url = 'patent/getAll';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), scienceId);
  }

  setPatentStatus(status): Observable<any> {
    const url = 'patent/updateStatus';
    return this.http.post(this.base + url + '?jwt_token=' + window.localStorage.getItem('token'), status);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }

}
