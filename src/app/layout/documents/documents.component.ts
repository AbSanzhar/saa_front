import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public searchResult = ''

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  private url: string;

  public DecodedToken =  this.getDecodedAccessToken(localStorage.getItem('token'));
  public IdToken = this.DecodedToken.jti;

  public currentPage = 1

  // Documents list
  public documents = [ ]
  public filteredDocs = this.documents
  

  constructor(private _api: ApiService) { }

  onSearch(event: any) { // without type info
    this.searchResult = event.target.value.toUpperCase();
    if(!this.searchResult){
      this.filteredDocs = this.documents
    }

    this.filteredDocs = this.documents.filter((doc) => {
      return doc.docName.toUpperCase().includes(this.searchResult)
    })

    console.log(this.filteredDocs)
  }
  ngOnInit() {
    this._api.getUserDocs(this.IdToken).subscribe(
      res => {
        this.documents = res;
        this.filteredDocs = res;
        console.log(this.filteredDocs)
      },
      err => {
        console.log(err);
      }
    );
  }

  downloadDoc() {
    this._api.getUserDocs(this.IdToken).subscribe(
      res => {
          console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );
    this._api.downloadFile("Снимок экрана 2019-04-09 в 11.00.36_1564264396685.png").subscribe(
      res => {
        console.log(res);
        var newBlob = new Blob([res], { type: 'application/octet-stream' });
        this.url = window.URL.createObjectURL(newBlob);
        window.open(this.url);
      },
        err => {
        console.log(err);
        }
     );
  }

}
