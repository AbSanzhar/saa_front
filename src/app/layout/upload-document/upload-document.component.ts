import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../api/api.service' ;
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private http: HttpClient, private _api: ApiService, private _fb: FormBuilder) { }


  public message = {
    type: '',
    text: ''
  }

  docUploadForm = this._fb.group({
    docName: ['', Validators.required],
    docType: ['', Validators.required],
    docFile: ['', Validators.required],
  })

  public file = null;
  public docId;


  onSubmit(){
    const fileData = {
      docName: this.docUploadForm.get('docName').value,
      docType: this.docUploadForm.get('docType').value,
      docDate: new Date(),
      docStatus: 'ACTIVE'
    }
    if(this.file.type !== 'application/pdf'){
      this.message.text = 'File must be pdf'
      this.message.type = 'error'
      console.log(this.message)
      return
    }
    this._api.uploadFileData(fileData).subscribe(
      res => {
        const file = {
          file: this.file
      }
        this.docId = res.docId;
        this._api.uploadFile(res.docId, file).subscribe(
          res => {
            console.log(res)
            this.message.text = 'Your file succesfully uploaded'
            this.message.type = 'success'
          },
          err => {
            console.log(err)
            this.message.text = 'Something wrong with your file'
            this.message.type = 'error';
            this._api.deleteFileData(res.docId).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              res => {
                console.log(res);
              },
              // tslint:disable-next-line:no-shadowed-variable
              err => {
                console.log(err);
              }
            );
          }
        );
      },
      err => {
          console.log(err);
      }
    )
  }

  onFileChange(files: FileList) {
    // let reader = new FileReader();
    //
    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   this.file = file
    // }
      this.file = files.item(0);
  }
}
