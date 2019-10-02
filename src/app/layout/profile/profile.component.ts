import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ApiService } from '../../api/api.service';
import * as jwt_decode from "jwt-decode";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {combineAll} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public updatePubForm: FormGroup;
  public updateEventForm: FormGroup;
  public updatePub = false;
  message = {
    type: '',
    text: '',
    hide: false
  };

  get updatePubId() {
    return this.updatePubForm.get('updatePubId') as FormArray;
  }

  get pubType() {
    return this.updatePubForm.get('pubType') as FormArray;
  }

  get pubCoAuthor() {
    return this.updatePubForm.get('pubCoAuthor') as FormArray;
  }

  get pubName() {
    return this.updatePubForm.get('pubName') as FormArray;
  }

  get pubYear() {
    return this.updatePubForm.get('pubYear') as FormArray;
  }

  get pubCity() {
    return this.updatePubForm.get('pubCity') as FormArray;
  }

  get pubPubName() {
    return this.updatePubForm.get('pubPubName') as FormArray;
  }

  get pubPage() {
    return this.updatePubForm.get('pubPage') as FormArray;
  }

  get pubUrl() {
    return this.updatePubForm.get('pubUrl') as FormArray;
  }

  get pubDoi() {
    return this.updatePubForm.get('pubDoi') as FormArray;
  }

  get evId() {
    return this.updateEventForm.get('evId') as FormArray;
  }

  get evType() {
    return this.updateEventForm.get('evType') as FormArray;
  }

  get evRole() {
    return this.updateEventForm.get('evRole') as FormArray;
  }

  get evName() {
    return this.updateEventForm.get('evName') as FormArray;
  }

  get evYear() {
    return this.updateEventForm.get('evYear') as FormArray;
  }

  get evCity() {
    return this.updateEventForm.get('evCity') as FormArray;
  }

  get evUrl() {
    return this.updateEventForm.get('evUrl') as FormArray;
  }

  get disFirstName() {
    return this.disMemForm.get('firstName') as FormArray;
  }
  get disLastName() {
    return this.disMemForm.get('lastName') as FormArray;
  }
  // tslint:disable-next-line:variable-name
  constructor(private _api: ApiService, private fb: FormBuilder, private ref: ChangeDetectorRef) {
    this.disMemForm = this.fb.group({
      disMember: this.fb.array([])
      // fullName: this.fb.array([]),
      // firstName: this.fb.array([]),
      // lastName : this.fb.array([]),
      // memberType: this.fb.array([]),
      // academicDegree: this.fb.array([]),
      // specCode: this.fb.array([]),
      // disSpecCode: this.fb.array([]),
      // workPlace: this.fb.array([]),
      // disPosition: this.fb.array([]),
      // disId: this.fb.array([])
    });
  }
  get disMemberType() {
    return this.disMemForm.get('memberType') as FormArray;
  }
  get disAcademDegree() {
    return this.disMemForm.get('academicDegree') as FormArray;
  }
  get disSpecCode() {
    return this.disMemForm.get('specCode') as FormArray;
  }
  get disDisSpecCode() {
    return this.disMemForm.get('disSpecCode') as FormArray;
  }
  get disWorkPlace() {
    return this.disMemForm.get('workPlace') as FormArray;
  }
  get disPosition() {
    return this.disMemForm.get('disPosition') as FormArray;
  }
  get disID() {
    return this.disMemForm.get('disId') as FormArray;
  }
  get disFullName() {
    return this.disMemForm.get('fullName') as FormArray;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  // public currentPage = 1;
  public DecodedToken = this.getDecodedAccessToken(localStorage.getItem('token'));
  public IdToken = this.DecodedToken.jti;
  public roles = this.DecodedToken.roles;
  public depUsers = [];

  // Profile user
  public user: any = {}

  // Documents list
  public documents = []

  public publications = []
  public Allpublications = []
  public events;
  public publicationForm: FormGroup;
  public eventForm: FormGroup;

  public selectTable = 1;

  public reloadPublications = true;
  public reloadEvenet = true;
  public one_time = 0;
  public one_time_event = 0;
  public startPubDate: FormControl;
  public endPubDate: FormControl;
  public startDate;
  public endDate;

  public headDep = false;
  public disRole = false;
  public disMemRole = false;
  public disForm: FormGroup;
  public disCreate = false;
  public disMemForm: FormGroup;
  public disId;
  public ourMem = false;
  ngOnInit() {
    console.log(this.roles)
    this.startPubDate = new FormControl();
    this.endPubDate = new FormControl();
    this._api.getUserById(this.IdToken).subscribe(
      res => {
        console.log(res)
        this.user = res;
        this.documents = res.documentEntities;
      },
      err => {
        console.log(err);
      }
    );
    this._api.getEvent().subscribe(
      res => {
        this.events = res;
      },
      error1 => {
        console.log(error1);
      }
    );
    // for(var i = 0; i < 2; i++) {
    //   if (this.user.roles[i].roleName == 'ROLE_HEAD_DEP') {
    //     this.headDep = true;
    //     break;
    //   }
    // }
    this._api.getDepUsers(this.IdToken).subscribe(
      res => {
        console.log(res);
        for (var i = 0; i < res.usersDeptsEntities.length; i++) {
          let tempUser = {
            'userId': res.usersDeptsEntities[i].primaryKey.userEntity.userId,
            'firstName': res.usersDeptsEntities[i].primaryKey.userEntity.firstName,
            'lastName': res.usersDeptsEntities[i].primaryKey.userEntity.lastName,
            'email': res.usersDeptsEntities[i].primaryKey.userEntity.email,
            'description': res.usersDeptsEntities[i].primaryKey.userEntity.description,
            'userType': res.usersDeptsEntities[i].userType
          }
          this.depUsers.push(tempUser);
        }
      },
      err => {
        console.log(err);
      }
    );
    this.disForm = this.fb.group({
      disInfo: ['', Validators.required],
      disStartDate: ['', Validators.required],
      disStopDate: ['', Validators.required],
      ministryOrder: ['', Validators.required],
      membersNum: ['', Validators.required],
      secretaryId: this.IdToken
    });
    this.publicationForm = this.fb.group({
      pubName: ['', Validators.required],
      pubType: [''],
      pubCoAuthor: [''],
      pubYear: ['', Validators.required],
      pubPubName: ['', Validators.required],
      pubCity: ['', Validators.required],
      pubPage: ['', Validators.required],
      pubUrl: ['', Validators.required],
      pubDoi: ['', Validators.required],
      pubFile: ['']
    });
    this.eventForm = this.fb.group({
      evType: [''],
      evRole: [''],
      evName: ['', Validators.required],
      evCity: ['', Validators.required],
      evUrl: ['', Validators.required],
      evYear: ['', Validators.required]
    });

    this.updatePubForm = this.fb.group({
      updatePubId: this.fb.array([]),
      pubName: this.fb.array([]),
      pubType: this.fb.array([]),
      pubCoAuthor: this.fb.array([]),
      pubYear: this.fb.array([]),
      pubPubName: this.fb.array([]),
      pubCity: this.fb.array([]),
      pubPage: this.fb.array([]),
      pubUrl: this.fb.array([]),
      pubDoi: this.fb.array([])
    });
    this.updateEventForm = this.fb.group({
      evId: this.fb.array([]),
      evType: this.fb.array([]),
      evRole: this.fb.array([]),
      evName: this.fb.array([]),
      evCity: this.fb.array([]),
      evUrl: this.fb.array([]),
      evYear: this.fb.array([])
    });
    this._api.getPublications().subscribe(
      res => {
        // var i = 0;
        // console.log(res);
        // this.updatePubId.setValue([1, 2, 3, 4]);
        // for (; i < res.length; i++) {
        //   this.updatePubId.setValue(res[i].updatePubId);
        //   console.log(res[i].pubType);
        //   this.pubType.setValue(res[i].pubType);
        // }
        this.publications = res;
        this.Allpublications = res;
      },
      err => {
        console.log(err);
      }
    );

    this._api.getPublications().subscribe(
      res => {
        console.log(res);
        var i = 0;
        for (; i < res.length; i++) {
          console.log(res[i].pubType);
          this.updatePubId.push(this.fb.control(res[i].pubId));
          this.pubType.push(this.fb.control(res[i].pubType));
          this.pubCoAuthor.push(this.fb.control(res[i].pubCoAuthor));
          this.pubName.push(this.fb.control(res[i].pubName));
          this.pubYear.push(this.fb.control(res[i].pubYear));
          this.pubCity.push(this.fb.control(res[i].pubCity));
          this.pubPubName.push(this.fb.control(res[i].pubPubName));
          this.pubPage.push(this.fb.control(res[i].pubPage));
          this.pubUrl.push(this.fb.control(res[i].pubUrl));
          this.pubDoi.push(this.fb.control(res[i].pubDoi));
        }
      },
      err => {
        console.log(err);
      }
    );
    this._api.getEvent().subscribe(
      res => {
        console.log(res);
        var i = 0;
        for (; i < res.length; i++) {
          this.evId.push(this.fb.control(res[i].evId));
          this.evType.push(this.fb.control(res[i].evType));
          this.evRole.push(this.fb.control(res[i].evRole));
          this.evName.push(this.fb.control(res[i].evName));
          this.evYear.push(this.fb.control(res[i].evYear));
          this.evCity.push(this.fb.control(res[i].evCity));
          this.evUrl.push(this.fb.control(res[i].evUrl));
        }
      },
      error1 => {
        console.log(error1);
      }
    );
    console.log(this.roles);
    for (var i = 0; i < this.roles.length; i++) {
      if (this.roles[i] == 'Head_Of_Dept') {
        this.headDep = true;
      } else if (this.roles[i] == 'Science_Secretary_Dissovet') {
        this.disRole = true;
      } else if (this.roles[i] == 'Dissovet_Member') {
        this.disMemRole = true;
      }
    }

    this.disMemForm.valueChanges.subscribe(
      res => {
        console.log(this.disMemForm.get('disMember').value[0].memberType);
      },
      err => {
        console.log(err);
      }
    )
  }

  sendPublication($event) {
    var publicationType1 = (<HTMLInputElement> document.getElementById('publicationType')).value;
    this.publicationForm.patchValue({
      pubType: publicationType1
    })
    this._api.uploadPub(this.publicationForm.value).subscribe(
      res => {
        console.log(res);
        this._api.uploadPubFile(3, this.selectedFile).subscribe(
          res => {
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        this._api.uploadPubFile(68, this.selectedFile).subscribe(
          res => {
          },
          err => {
            console.log(err);
          }
        );
        console.log(err);
      }
    );
    this.reloadPublications = false;
    setTimeout(() => {
      this.reloadPublications = true
      this._api.getPublications().subscribe(
        res => {
          this.publications = res;
          this.publications = res;
        },
        err => {
          console.log(err);
        }
      );
    }, 2000);
    console.log(this.publications);
    if (this.publications.length != 0) {
      this.updatePubId.push(this.fb.control(this.publications[this.publications.length - 1].pubId + 1));
      this.pubType.push(this.fb.control(this.publicationForm.value.pubType));
      this.pubCoAuthor.push(this.fb.control(this.publicationForm.value.pubCoAuthor));
      this.pubName.push(this.fb.control(this.publicationForm.value.pubName));
      this.pubYear.push(this.fb.control(this.publicationForm.value.pubYear));
      this.pubCity.push(this.fb.control(this.publicationForm.value.pubCity));
      this.pubPubName.push(this.fb.control(this.publicationForm.value.pubPubName));
      this.pubPage.push(this.fb.control(this.publicationForm.value.pubPage));
      this.pubUrl.push(this.fb.control(this.publicationForm.value.pubUrl));
      this.pubDoi.push(this.fb.control(this.publicationForm.value.pubDoi));
    }
  }

  sendEvent() {
    var evType1 = (<HTMLInputElement> document.getElementById('evType')).value;
    var evRole1 = (<HTMLInputElement> document.getElementById('evRole')).value;
    this.eventForm.patchValue({
      evType: evType1,
      evRole: evRole1
    });
    this._api.uploadEvent(this.eventForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    this.reloadEvenet = false;
    setTimeout(() => {
      this.reloadEvenet = true;
      this._api.getEvent().subscribe(
        res => {
          this.events = res;
        },
        err => {
          console.log(err);
        }
      );
    }, 2000);

    if (this.events.length != 0) {
      this.evId.push(this.fb.control(this.events[this.events.length - 1].evId + 1));
      this.evType.push(this.fb.control(this.eventForm.value.evType));
      this.evRole.push(this.fb.control(this.eventForm.value.evRole));
      this.evName.push(this.fb.control(this.eventForm.value.evName));
      this.evYear.push(this.fb.control(this.eventForm.value.evYear));
      this.evCity.push(this.fb.control(this.eventForm.value.evCity));
      this.evUrl.push(this.fb.control(this.eventForm.value.evUrl));
    }
  }

  selectedFile: File = null;
  private temPub: {};
  private temEvent: {};

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
  }

  downloadPublicationFile(filePath) {
    this._api.downloadPubFile(filePath).subscribe(
      res => {
        console.log(res);
        var newBlob = new Blob([res], {type: 'application/octet-stream'});
        window.open(window.URL.createObjectURL(newBlob));
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  updatePublication() {
    this.message.type = 'error';
    this.message.text = 'Что бы сохранить все изменения нажмите повторно Edit';
    this.message.hide = false;
    this._api.getPublications().subscribe(
      res => {
        this.publications = res;
        this.Allpublications = res;
      },
      err => {
        console.log(err);
      }
    );
    this._api.getEvent().subscribe(
      res => {
        this.events = res;
      },
      err => {
        console.log(err);
      }
    );
    if (this.publications.length === 1 && this.one_time === 0) {
      console.log(this.one_time);
      this.updatePubId.push(this.fb.control(this.publications[this.publications.length - 1].pubId));
      this.pubType.push(this.fb.control(this.publicationForm.value.pubType));
      this.pubCoAuthor.push(this.fb.control(this.publicationForm.value.pubCoAuthor));
      this.pubName.push(this.fb.control(this.publicationForm.value.pubName));
      this.pubYear.push(this.fb.control(this.publicationForm.value.pubYear));
      this.pubCity.push(this.fb.control(this.publicationForm.value.pubCity));
      this.pubPubName.push(this.fb.control(this.publicationForm.value.pubPubName));
      this.pubPage.push(this.fb.control(this.publicationForm.value.pubPage));
      this.pubUrl.push(this.fb.control(this.publicationForm.value.pubUrl));
      this.pubDoi.push(this.fb.control(this.publicationForm.value.pubDoi));
      this.one_time++;
    }
    if (this.events.length === 1 && this.one_time_event === 0) {
      console.log(this.one_time_event);
      this.evId.push(this.fb.control(this.events[this.events.length - 1].evId));
      this.evType.push(this.fb.control(this.eventForm.value.evType));
      this.evRole.push(this.fb.control(this.eventForm.value.evRole));
      this.evName.push(this.fb.control(this.eventForm.value.evName));
      this.evYear.push(this.fb.control(this.eventForm.value.evYear));
      this.evCity.push(this.fb.control(this.eventForm.value.evCity));
      this.evUrl.push(this.fb.control(this.eventForm.value.evUrl));
      this.one_time_event++;
    }
    if (this.updatePub == false) {
      this.updatePub = true;
    } else {
      for (var i = 0; i < this.publications.length; i++) {
        this.temPub = {
          pubName: this.pubName.value[i],
          pubType: this.pubType.value[i],
          pubCoAuthor: this.pubCoAuthor.value[i],
          pubYear: this.pubYear.value[i],
          pubPubName: this.pubPubName.value[i],
          pubCity: this.pubCity.value[i],
          pubPage: this.pubPage.value[i],
          pubUrl: this.pubUrl.value[i],
          pubDoi: this.pubDoi.value[i]
        };
        this._api.updatePub(this.publications[i].pubId, this.temPub).subscribe(
          res => {
            console.log(res);
          },
          error1 => {
            console.log(error1);
          }
        );
      }
      for (var j = 0; j < this.events.length; j++) {
        this.temEvent = {
          evName: this.evName.value[j],
          evType: this.evType.value[j],
          evRole: this.evRole.value[j],
          evYear: this.evYear.value[j],
          evCity: this.evCity.value[j],
          evUrl: this.evUrl.value[j],
        };
        this._api.updateEvent(this.events[j].evId, this.temEvent).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
      setTimeout(() => {
        this.message.type = 'success';
        this.message.text = 'Изменения успешно сохранены';
        this.message.hide = false;
        setTimeout(() => {
          this.message.hide = true;
        }, 2000);
      }, 200);
      this.updatePub = false;
    }
    setTimeout(() => {
      this.reloadPublications = true
      this._api.getPublications().subscribe(
        res => {
          this.publications = res;
          this.Allpublications = res;
        },
        err => {
          console.log(err);
        }
      );
    }, 1000);
    setTimeout(() => {
      this.reloadEvenet = true;
      this._api.getEvent().subscribe(
        res => {
          this.events = res;
        },
        err => {
          console.log(err);
        }
      );
    }, 1000);
  }
  genereatePubPDF() {
    console.log(this.depUsers);
    this._api.generatePubFile().subscribe(
      res => {
        var newBlob = new Blob([res], {type: 'application/pdf'});
        window.open(window.URL.createObjectURL(newBlob));
      },
      err => {
        console.log(err);
      }
    );
  }

  changeStartDate() {
    this.startDate = new Date(this.startPubDate.value);
    if (this.endPubDate.value != "" && this.startPubDate.value != "" && this.endPubDate.value != null) {
      console.log('this is filter')
      this.publications = this.Allpublications.filter((item: any) => {
        return new Date(item.pubYear).getTime() >= this.startDate.getTime() &&
          new Date(item.pubYear).getTime() <= this.endDate.getTime();
      });
    } else if (this.endPubDate.value == null && this.startPubDate.value != '') {
      this.publications = this.Allpublications.filter((item: any) => {
        return new Date(item.pubYear).getTime() >= this.startDate.getTime();
      });
    } else {
      console.log('I am here');
      this.publications = this.Allpublications;
    }
  }

  changeEndDate() {
    this.endDate = new Date(this.endPubDate.value);
    if (this.endPubDate.value != "" && this.startPubDate.value != "" && this.startPubDate.value != null) {
      console.log('this is filter')
      this.publications = this.Allpublications.filter((item: any) => {
        return new Date(item.pubYear).getTime() >= this.startDate.getTime() &&
          new Date(item.pubYear).getTime() <= this.endDate.getTime();
      });
    } else if (this.startPubDate.value == null && this.endPubDate.value != '') {
      this.publications = this.Allpublications.filter((item: any) => {
        return new Date(item.pubYear).getTime() <= this.endDate.getTime();
      });
    } else {
      console.log('I am here');
      this.publications = this.Allpublications;
    }
    console.log(this.endDate.getTime());
    console.log(this.endPubDate.value);
    console.log(this.startPubDate.value);
    console.log(this.startPubDate.value == "");
    console.log(this.endPubDate.value == "");
  }
  createDisSovet() {
    this._api.uploadDisSovet(this.disForm.value).subscribe(
      res => {
        console.log(res);
        this.disId = res;
      },
      err => {
        console.log(err);
      });

    for (var i = 0; i < this.disForm.get('membersNum').value; i++) {
      // this.disFullName.push((this.fb.control('')));
      // this.disFirstName.push(this.fb.control(''));
      // this.disLastName.push(this.fb.control(''));
      // this.disMemberType.push(this.fb.control(''));
      // this.disAcademDegree.push(this.fb.control(''));
      // this.disSpecCode.push(this.fb.control(''));
      // this.disDisSpecCode.push(this.fb.control(''));
      // this.disWorkPlace.push(this.fb.control(''));
      // this.disPosition.push(this.fb.control(''));
      this.addRow();
    }
    this._api.getOwnUsers().subscribe(
      res => {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
          if(res[i].userId != this.user.userId) {
            this.names.push(res[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );

    this._api.getExUsers().subscribe(
      res => {
        console.log(res);
        for(var i = 0; i < res.length; i++) {
          if(res[i].userId != this.user.userId) {
            this.exNames.push(res[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.names);
    console.log(this.exNames);
  }

  sendDisMembers() {
    for(var i = 0; i < this.disForm.get('membersNum').value; i++) {
      if(this.disMemForm.get('disMember').value[i].memberType == 'Внутренний сотрудник') {
        let tempDisMem = {
          // firstName: this.disMemForm.get('disMember').value[i].firstName,
          // lastName: this.disMemForm.get('disMember').value[i].lastName,
          memberType: this.disMemForm.get('disMember').value[i].memberType,
          academicDegree: this.disMemForm.get('disMember').value[i].academicDegree,
          specCode: this.disMemForm.get('disMember').value[i].specCode,
          disSpecCode: this.disMemForm.get('disMember').value[i].disSpecCode,
          workPlace: this.disMemForm.get('disMember').value[i].workPlace,
          disPosition: this.disMemForm.get('disMember').value[i].disPosition,
          disId: this.disId,
          userId: this.disMemForm.get('disMember').value[i].userId
        };

        console.log(tempDisMem);
        this._api.uploadDisMember(this.disId, tempDisMem).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
      else {
        let tempDisMem = {
          // firstName: this.disMemForm.get('disMember').value[i].firstName,
          // lastName: this.disMemForm.get('disMember').value[i].lastName,
          memberType: this.disMemForm.get('disMember').value[i].memberType,
          academicDegree: this.disMemForm.get('disMember').value[i].academicDegree,
          specCode: this.disMemForm.get('disMember').value[i].specCode,
          disSpecCode: this.disMemForm.get('disMember').value[i].disSpecCode,
          workPlace: this.disMemForm.get('disMember').value[i].workPlace,
          disPosition: this.disMemForm.get('disMember').value[i].disPosition,
          disId: this.disId,
          userId: this.disMemForm.get('disMember').value[i].userId
        };

        console.log(tempDisMem);
        this._api.uploadDisMember(this.disId, tempDisMem).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );

      }
    }
  }
  public names = [ ];
  public exNames = [ ];
  onSubmit() {

  }
  addRow(){

    const control = <FormArray>this.disMemForm.controls['disMember'];

    // instantiate a new day FormGroup;
    const newDisMember: FormGroup = this.initItems();

    // Add it to our formArray
    control.push(newDisMember);
  }

  initItems(): FormGroup {
    return this.fb.group({
      firstName: [null, Validators.required],
      lastName : [null, Validators.required],
      memberType: [null, Validators.required],
      academicDegree: [null, Validators.required],
      specCode: [null, Validators.required],
      disSpecCode: [null, Validators.required],
      workPlace: [null, Validators.required],
      disPosition: [null, Validators.required],
      disId: [null, Validators.required],
      userId: [null]
    });
  }
}
