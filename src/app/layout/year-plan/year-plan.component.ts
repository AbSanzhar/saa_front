import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../api/api.service';
import {LayoutComponent} from '../layout.component';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-year-plan',
  templateUrl: './year-plan.component.html',
  styleUrls: ['./year-plan.component.css']
})
export class YearPlanComponent implements OnInit {
  constructor(private api: ApiService, private layout: LayoutComponent, private fb: FormBuilder) {
  }

  get act_id() {
    return this.activities.get('act_id') as FormArray;
  }
  get activity() {
    return this.activities.get('activity') as FormArray;
  }
  get time_frame() {
    return this.activities.get('time_frame') as FormArray;
  }
  get impl() {
    return this.activities.get('impl') as FormArray;
  }

  get budId() {
    return this.budgets.get('budId') as FormArray;
  }

  get activitiess() {
    return this.budgets.get('activitiess') as FormArray;
  }

  get plan() {
    return this.budgets.get('plan') as FormArray;
  }

  get implmentation() {
    return this.budgets.get('implementation') as FormArray;
  }

  get orgId() {
    return this.orgs.get('orgId') as FormArray;
  }
  get acts() {
    return this.orgs.get('acts') as FormArray;
  }

  get orgPlan() {
    return this.orgs.get('plan') as FormArray;
  }
  get orgImpl() {
    return this.orgs.get('implementation') as FormArray;
  }
  get eduId() {
    return this.edus.get('eduId') as FormArray;
  }
  get eduAct() {
    return this.edus.get('activities') as FormArray;
  }
  get eduImpl() {
    return this.edus.get('implementation') as FormArray;
  }
  //Plan Perfomance
  get PlanPerId() {
    return this.planPerfom.get('id') as FormArray;
  }
  get PlanPerAct() {
    return this.planPerfom.get('activities') as FormArray;
  }
  get PlanPerImpl() {
    return this.planPerfom.get('implementation') as FormArray;
  }

  get comId() {
    return this.Research.get('comId') as FormArray;
  }
  get resAct() {
    return this.Research.get('activities') as FormArray;
  }
  get output() {
    return this.Research.get('output') as FormArray;
  }
  get resPlan() {
    return this.Research.get('plan') as FormArray;
  }
  get resImpl() {
    return this.Research.get('implementation') as FormArray;
  }
  public activities: FormGroup;
  public budgetLength;
  public budgets: FormGroup;
  public orgs: FormGroup;
  public edusLength;
  public edus: FormGroup;
  public planPerfomLength;
  public planPerfom: FormGroup;
  public Research: FormGroup;

  lectures: FormControl;
  practiceStudies: FormControl;
  labs: FormControl;
  practicesMasters: FormControl;
  supervisDiplomas: FormControl;
  stateAttestComm: FormControl;
  tsis: FormControl;
  midEndTerm: FormControl;
  writtenPaper: FormControl;
  umkd: FormControl;
  translations: FormControl;
  advisor: FormControl;
  created: Date;
  updated: Date;

  lectures2: FormControl;
  practiceStudies2: FormControl;
  labs2: FormControl;
  practicesMasters2: FormControl;
  supervisDiplomas2: FormControl;
  stateAttestComm2: FormControl;
  tsis2: FormControl;
  midEndTerm2: FormControl;
  writtenPaper2: FormControl;
  umkd2: FormControl;
  translations2: FormControl;
  advisor2: FormControl;

  lectures3: FormControl;
  practiceStudies3: FormControl;
  labs3: FormControl;
  practicesMasters3: FormControl;
  supervisDiplomas3: FormControl;
  stateAttestComm3: FormControl;
  tsis3: FormControl;
  midEndTerm3: FormControl;
  writtenPaper3: FormControl;
  umkd3: FormControl;
  translations3: FormControl;
  advisor3: FormControl;


  plan1 = { };

  plan2 = { };

  plan3 = { };
  selectPlan: number = 4;
  private url: string;

  // Объект для сообщения пользователя, type error, success
  message = {
    type: '',
    text: '',
    hide: false
  };
  private planId1: number;
  private planId2: number;
  private planId3: number;

  gettedActs = [];

  gettedResearch = [ ];

  getTableSeceltion() {
    return this.layout.getTable();
  }
  addNewActId() {
    this.act_id.push(this.fb.control(''));
  }
  addNewActivity() {
    this.activity.push(this.fb.control(''));
  }
  addTimeFrame() {
    this.time_frame.push(this.fb.control(''));
  }
  addImpl() {
    this.impl.push(this.fb.control(''));
  }

  addNewBudId() {
    if(this.budgetLength == 0) {
      this.budId.push(this.fb.control(1));
    } else{
      this.budId.push(this.fb.control(this.budgetLength + 1));
    }
    this.budgetLength++;
  }

  addNewActivitiess() {
    return this.activitiess.push(this.fb.control(''));
  }
  addNewPlan() {
    return this.plan.push(this.fb.control(''));
  }
  addNewImplementation() {
    return this.implmentation.push(this.fb.control(''));
  }

  addNewOrgId() {
    this.orgId.push(this.fb.control(''));
  }
  addNewOrgAct() {
    this.acts.push(this.fb.control(''));
  }
  addNewOrgPlan() {
    this.orgPlan.push(this.fb.control(''));
  }
  addNewOrgImpl() {
    this.orgImpl.push(this.fb.control(''));
  }

  addNewEduId() {
    if(this.edusLength == 0) {
      this.eduId.push(this.fb.control(1));
    }
    else {
      this.eduId.push(this.fb.control(this.edusLength + 1));
    }
    this.edusLength++;
  }
  addNewEduAct() {
    this.eduAct.push(this.fb.control(''));
  }
  addNewEduImpl() {
    this.eduImpl.push(this.fb.control(''));
  }

  addNewPPid() {
    if(this.planPerfomLength == 0) {
      this.PlanPerId.push(this.fb.control(1));
    } else{
      this.PlanPerId.push(this.fb.control(this.planPerfomLength + 1));
    }
    this.planPerfomLength++;
  }
  // deleteNewPPId() {
  //   this.PlanPerId.removeAt(this.planPerfomLength - 1);
  //   this.planPerfomLength--;
  // }

  addNewPPAct() {
    this.PlanPerAct.push(this.fb.control(''));
  }
  // deleteNewPPAct() {
  //   this.PlanPerAct.removeAt(this.planPerfomLength - 1);
  // }
  addNewPPImpl() {
    this.PlanPerImpl.push(this.fb.control(''));
  }
  // deleteNewPPImpl() {
  //   this.PlanPerImpl.removeAt(this.planPerfomLength - 1);
  // }

  addResId(){
    this.comId.push(this.fb.control(''));
  }
  addResAct() {
    this.resAct.push(this.fb.control(''));
  }
  addResOutput() {
    this.output.push(this.fb.control(''));
  }
  addResPlan() {
    this.resPlan.push(this.fb.control(''));
  }
  addResImpl() {
    this.resImpl.push(this.fb.control(''));
  }
  ngOnInit() {
    this.message.hide=true;
    this.api.getYourPlan().subscribe(
      res => {
        if (res[0] !== undefined) {
          if (res[0].planName == 'План на первое полугодие') {
            console.log(res);
            this.planId1 = res[0].planId;
            this.lectures.setValue(res[0].lectures);
            this.practiceStudies.setValue(res[0].practiceStudies)
            this.labs.setValue(res[0].labs);
            this.practicesMasters.setValue(res[0].practicesMasters);
            this.supervisDiplomas.setValue(res[0].supervisDiplomas);
            this.stateAttestComm.setValue(res[0].stateAttestComm);
            this.tsis.setValue(res[0].tsis);
            this.midEndTerm.setValue(res[0].midEndTerm);
            this.writtenPaper.setValue(res[0].writtenPaper);
            this.umkd.setValue(res[0].umkd);
            this.translations.setValue(res[0].translations);
            this.advisor.setValue(res[0].advisor);
            this.created = res[0].created;
            this.updated = res[0].updated;
          } else
          if (res[0].planName == 'План на второе полугодие') {
            this.planId2 = res[0].planId;
            this.lectures2.setValue(res[0].lectures);
            this.practiceStudies2.setValue(res[0].practiceStudies)
            this.labs2.setValue(res[0].labs);
            this.practicesMasters2.setValue(res[0].practicesMasters);
            this.supervisDiplomas2.setValue(res[0].supervisDiplomas);
            this.stateAttestComm2.setValue(res[0].stateAttestComm);
            this.tsis2.setValue(res[0].tsis);
            this.midEndTerm2.setValue(res[0].midEndTerm);
            this.writtenPaper2.setValue(res[0].writtenPaper);
            this.umkd2.setValue(res[0].umkd);
            this.translations2.setValue(res[0].translations);
            this.advisor2.setValue(res[0].advisor);
          } else {
            this.planId3 = res[0].planId;
            this.plan3 = res[0].planId;
            this.lectures3.setValue(res[0].lectures);
            this.practiceStudies3.setValue(res[0].practiceStudies)
            this.labs3.setValue(res[0].labs);
            this.practicesMasters3.setValue(res[0].practicesMasters);
            this.supervisDiplomas3.setValue(res[0].supervisDiplomas);
            this.stateAttestComm3.setValue(res[0].stateAttestComm);
            this.tsis3.setValue(res[0].tsis);
            this.midEndTerm3.setValue(res[0].midEndTerm);
            this.writtenPaper3.setValue(res[0].writtenPaper);
            this.umkd3.setValue(res[0].umkd);
            this.translations3.setValue(res[0].translations);
            this.advisor3.setValue(res[0].advisor);
          }
        }
        if (res[1] !== undefined) {
          if (res[1].planName == 'План на второе полугодие') {
            this.planId2 = res[1].planId;
            this.lectures2.setValue(res[1].lectures);
            this.practiceStudies2.setValue(res[1].practiceStudies);
            this.labs2.setValue(res[1].labs);
            this.practicesMasters2.setValue(res[1].practicesMasters);
            this.supervisDiplomas2.setValue(res[1].supervisDiplomas);
            this.stateAttestComm2.setValue(res[1].stateAttestComm);
            this.tsis2.setValue(res[1].tsis);
            this.midEndTerm2.setValue(res[1].midEndTerm);
            this.writtenPaper2.setValue(res[1].writtenPaper);
            this.umkd2.setValue(res[1].umkd);
            this.translations2.setValue(res[1].translations);
            this.advisor2.setValue(res[1].advisor);
          } else if (res[1].planName == 'План на год') {
            this.planId3 = res[1].planId;
            this.plan3 = res[1].planId;
            this.lectures3.setValue(res[1].lectures);
            this.practiceStudies3.setValue(res[1].practiceStudies)
            this.labs3.setValue(res[1].labs);
            this.practicesMasters3.setValue(res[1].practicesMasters);
            this.supervisDiplomas3.setValue(res[1].supervisDiplomas);
            this.stateAttestComm3.setValue(res[1].stateAttestComm);
            this.tsis3.setValue(res[1].tsis);
            this.midEndTerm3.setValue(res[1].midEndTerm);
            this.writtenPaper3.setValue(res[1].writtenPaper);
            this.umkd3.setValue(res[1].umkd);
            this.translations3.setValue(res[1].translations);
            this.advisor3.setValue(res[1].advisor);
          } else {
            this.planId1 = res[1].planId;
            this.lectures.setValue(res[1].lectures);
            this.practiceStudies.setValue(res[1].practiceStudies)
            this.labs.setValue(res[1].labs);
            this.practicesMasters.setValue(res[1].practicesMasters);
            this.supervisDiplomas.setValue(res[1].supervisDiplomas);
            this.stateAttestComm.setValue(res[1].stateAttestComm);
            this.tsis.setValue(res[1].tsis);
            this.midEndTerm.setValue(res[1].midEndTerm);
            this.writtenPaper.setValue(res[1].writtenPaper);
            this.umkd.setValue(res[1].umkd);
            this.translations.setValue(res[1].translations);
            this.advisor.setValue(res[1].advisor);
          }
        }
        if (res[2] !== undefined) {
          if ( res[2].planName == 'План на год') {
            this.planId3 = res[2].planId;
            this.plan3 = res[2].planId;
            this.lectures3.setValue(res[2].lectures);
            this.practiceStudies3.setValue(res[2].practiceStudies)
            this.labs3.setValue(res[2].labs);
            this.practicesMasters3.setValue(res[2].practicesMasters);
            this.supervisDiplomas3.setValue(res[2].supervisDiplomas);
            this.stateAttestComm3.setValue(res[2].stateAttestComm);
            this.tsis3.setValue(res[2].tsis);
            this.midEndTerm3.setValue(res[2].midEndTerm);
            this.writtenPaper3.setValue(res[2].writtenPaper);
            this.umkd3.setValue(res[2].umkd);
            this.translations3.setValue(res[2].translations);
            this.advisor3.setValue(res[2].advisor);
          } else if (res[2].planName == 'План на второе полугодие') {
            this.planId2 = res[2].planId;
            this.lectures2.setValue(res[2].lectures);
            this.practiceStudies2.setValue(res[2].practiceStudies)
            this.labs2.setValue(res[2].labs);
            this.practicesMasters2.setValue(res[2].practicesMasters);
            this.supervisDiplomas2.setValue(res[2].supervisDiplomas);
            this.stateAttestComm2.setValue(res[2].stateAttestComm);
            this.tsis2.setValue(res[2].tsis);
            this.midEndTerm2.setValue(res[2].midEndTerm);
            this.writtenPaper2.setValue(res[2].writtenPaper);
            this.umkd2.setValue(res[2].umkd);
            this.translations2.setValue(res[2].translations);
            this.advisor2.setValue(res[2].advisor);
          } else {
            this.planId1 = res[2].planId;
            this.lectures.setValue(res[2].lectures);
            this.practiceStudies.setValue(res[2].practiceStudies)
            this.labs.setValue(res[2].labs);
            this.practicesMasters.setValue(res[2].practicesMasters);
            this.supervisDiplomas.setValue(res[2].supervisDiplomas);
            this.stateAttestComm.setValue(res[2].stateAttestComm);
            this.tsis.setValue(res[2].tsis);
            this.midEndTerm.setValue(res[2].midEndTerm);
            this.writtenPaper.setValue(res[2].writtenPaper);
            this.umkd.setValue(res[2].umkd);
            this.translations.setValue(res[2].translations);
            this.advisor.setValue(res[2].advisor);
          }
        }
    },
    err => {
        console.log(err);
    }
    );
    this.lectures = new FormControl(Validators.required);
    this.practiceStudies = new FormControl();
    this.labs = new FormControl(Validators.required);
    this.practicesMasters = new FormControl(Validators.required);
    this.supervisDiplomas = new FormControl(Validators.required);
    this.stateAttestComm  = new FormControl(Validators.required);
    this.tsis = new FormControl(Validators.required);
    this.midEndTerm = new FormControl(Validators.required);
    this.writtenPaper = new FormControl(Validators.required);
    this.umkd = new FormControl(Validators.required);
    this.translations = new FormControl(Validators.required);
    this.advisor = new FormControl(Validators.required);

    this.lectures2 = new FormControl();
    this.practiceStudies2 = new FormControl();
    this.labs2 = new FormControl();
    this.practicesMasters2 = new FormControl();
    this.supervisDiplomas2 = new FormControl();
    this.stateAttestComm2  = new FormControl();
    this.tsis2 = new FormControl();
    this.midEndTerm2 = new FormControl();
    this.writtenPaper2 = new FormControl();
    this.umkd2 = new FormControl();
    this.translations2 = new FormControl();
    this.advisor2 = new FormControl();

    this.lectures3 = new FormControl(this.lectures.value + this.lectures2.value);
    this.practiceStudies3 = new FormControl(this.practiceStudies.value + this.practiceStudies2.value);
    this.labs3 = new FormControl(this.labs.value + this.labs2.value);
    this.practicesMasters3 = new FormControl(this.practicesMasters.value + this.practicesMasters2.value);
    this.supervisDiplomas3 = new FormControl(this.supervisDiplomas.value + this.supervisDiplomas2.value);
    this.stateAttestComm3  = new FormControl(this.stateAttestComm.value + this.stateAttestComm2.value);
    this.tsis3 = new FormControl(this.tsis.value + this.tsis2.value);
    this.midEndTerm3 = new FormControl(this.midEndTerm.value + this.midEndTerm2.value);
    this.writtenPaper3 = new FormControl(this.writtenPaper.value + this.writtenPaper2.value);
    this.umkd3 = new FormControl(this.umkd.value + this.umkd2.value);
    this.translations3 = new FormControl(this.translations.value + this.translations2.value);
    this.advisor3 = new FormControl(this.advisor.value + this.advisor2.value);

    this.activities = this.fb.group({
      act_id : this.fb.array([]),
      activity: this.fb.array([]),
      time_frame: this.fb.array([]),
      impl: this.fb.array([])
    });
    this.budgets = this.fb.group({
      budId: this.fb.array([]),
      activitiess: this.fb.array([]),
      plan: this.fb.array([]),
      implementation: this.fb.array([])
    });

    this.orgs = this.fb.group({
      orgId: this.fb.array([]),
      acts: this.fb.array([]),
      plan: this.fb.array([]),
      implementation: this.fb.array([])
    });
    this.edus = this.fb.group( {
      eduId: this.fb.array([]),
      activities: this.fb.array([]),
      implementation: this.fb.array([])
    });
    this.planPerfom = this.fb.group({
      id: this.fb.array([]),
      activities: this.fb.array([]),
      implementation: this.fb.array([])
    });
    this.Research = this.fb.group({
      comId: this.fb.array([]),
      activities: this.fb.array([]),
      output: this.fb.array([]),
      plan: this.fb.array([]),
      implementation: this.fb.array([])
    });
    this.api.getActivity().subscribe(
      res => {
        console.log(res);
        this.gettedActs = res;
      },
      err => {
        console.log(err);
      }
    );
    this.api.getReasearch().subscribe(
      res => {
        this.gettedResearch = res;
      },
      error1 => {
        console.log(error1);
      }
    );
    this.api.getBudget().subscribe(
      res => {
        var i = 0;
        this.budgetLength = res.length;
        for(; i < res.length; i++) {
          this.budId.push(this.fb.control(res[i].budId));
          this.activitiess.push(this.fb.control(res[i].activities));
          this.plan.push(this.fb.control(res[i].plan));
          this.implmentation.push(this.fb.control(res[i].implementation));
        }
        console.log(res);
      },
      error1 => {
        console.log(error1);
      }
    );

    this.api.getOrg().subscribe(
      res => {
        var i = 0;
        for(; i < res.length; i++) {
          this.orgId.push(this.fb.control(res[i].orgId));
          this.acts.push(this.fb.control(res[i].activities));
          this.orgPlan.push(this.fb.control(res[i].plan));
          this.orgImpl.push(this.fb.control(res[i].implementation));
        }
      },
      err => {
        console.log(err);
      }
    );
    this.api.getEdu().subscribe(
      res => {
        var i = 0;
        this.edusLength = res.length;
        for(; i < res.length; i++) {
          this.eduId.push(this.fb.control(res[i].eduId));
          this.eduAct.push(this.fb.control(res[i].activities));
          this.eduImpl.push(this.fb.control(res[i].implementation));
        }
      },
      err => {
        console.log(err);
      }
    );
    this.api.getPlanPerfomance().subscribe(
      res => {
        var i =0;
        this.planPerfomLength = res.length;
          for (; i < res.length; i++) {
            this.PlanPerId.push(this.fb.control(res[i].id));
            this.PlanPerAct.push(this.fb.control(res[i].activities));
            this.PlanPerImpl.push(this.fb.control(res[i].implementation));
          }
      },
      err => {
        console.log(err);
      }
    );
  }

  sendPlan() {
    this.plan1 = {
      planName : 'План на первое полугодие',
      lectures : this.lectures.value,
      practiceStudies: this.practiceStudies.value,
      labs : this.labs.value,
      practicesMasters : this.practicesMasters.value,
      supervisDiplomas : this.supervisDiplomas.value,
      stateAttestComm : this.stateAttestComm.value,
      tsis : this.tsis.value,
      midEndTerm : this.midEndTerm.value,
      writtenPaper : this.writtenPaper.value,
      umkd : this.umkd.value,
      translations : this.translations.value,
      advisor : this.advisor.value,
      updated: new Date()
    };

    this.plan2 = {
      planName : 'План на второе полугодие',
      lectures : this.lectures2.value,
      practiceStudies: this.practiceStudies2.value,
      labs : this.labs2.value,
      practicesMasters : this.practicesMasters2.value,
      supervisDiplomas : this.supervisDiplomas2.value,
      stateAttestComm : this.stateAttestComm2.value,
      tsis : this.tsis2.value,
      midEndTerm : this.midEndTerm2.value,
      writtenPaper : this.writtenPaper2.value,
      umkd : this.umkd2.value,
      translations : this.translations2.value,
      advisor : this.advisor2.value
    };

    this.plan3 = {
      planName : 'План на год',
      lectures : this.lectures3.value,
      practiceStudies: this.practiceStudies3.value,
      labs : this.labs3.value,
      practicesMasters : this.practicesMasters3.value,
      supervisDiplomas : this.supervisDiplomas3.value,
      stateAttestComm : this.stateAttestComm3.value,
      tsis : this.tsis3.value,
      midEndTerm : this.midEndTerm3.value,
      writtenPaper : this.writtenPaper3.value,
      umkd : this.umkd3.value,
      translations : this.translations3.value,
      advisor : this.advisor3.value
    };
    if (this.selectPlan === 1) {
      if (this.plan1 !== undefined && this.planId1 !== undefined) {
        console.log(this.plan1);
        this.api.updateYourPlan(this.planId1, this.plan1).subscribe(
          res => {
            console.log(res);
          },
          error1 => {
            console.log(error1);
          }
        );
        console.log(this.plan3);
        this.api.updateYourPlan(this.planId3, this.plan3).subscribe(
          res => {
            console.log(res);
          },
          error1 => {
            console.log(error1);
          }
        );
      } else {
        this.plan1 = {
          planName : 'План на первое полугодие',
          lectures : this.lectures.value,
          labs : this.labs.value,
          practicesMasters : this.practicesMasters.value,
          supervisDiplomas : this.supervisDiplomas.value,
          stateAttestComm : this.stateAttestComm.value,
          tsis : this.tsis.value,
          midEndTerm : this.midEndTerm.value,
          writtenPaper : this.writtenPaper.value,
          umkd : this.umkd.value,
          translations : this.translations.value,
          advisor : this.advisor.value,
          created: new Date(),
          updated: new Date()
        };
        this.api.uploadYourPlan(this.plan1).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
    }

    if (this.selectPlan === 2) {
      if (this.plan2 !== undefined && this.planId2 !== undefined) {
        this.api.updateYourPlan(this.planId2, this.plan2).subscribe(
          res => {
            console.log(res);
          },
          error1 => {
            console.log(error1);
          }
        );
        this.api.updateYourPlan(this.planId3, this.plan3).subscribe(
          res => {
            console.log(res);
          },
          error1 => {
            console.log(error1);
          }
        );
      } else {
        this.api.uploadYourPlan(this.plan2).subscribe(
          res => {
            console.log('There is no error');
          },
          err => {
            console.log(err);
          }
        );
        this.api.uploadYourPlan(this.plan3).subscribe(
          res => {
            console.log('There is no error');
          },
          err => {
            console.log(err);
          }
        );
      }
    }
    // if (this.selectPlan === 4) {
    //   this.api.uploadYourPlan(this.plan1).subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    //
    //   this.api.uploadYourPlan(this.plan2).subscribe(
    //     res => {
    //       console.log('There is no error');
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    //
    //   this.api.uploadYourPlan(this.plan3).subscribe(
    //     res => {
    //       console.log('There is no error');
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }
    setTimeout(() => {
      this.message.type = 'success';
      this.message.text = 'План успешно сохранен';
      this.message.hide = false;
      setTimeout(() => {
        this.message.hide = true;
      }, 2000);
    }, 2000);
    var i = 0;
    for(; i < this.activities.get('act_id').value.length; i++) {
      var tempActivity = {
        activity: this.activities.get('act_id').value[i],
        time_frame: this.activities.get('activity').value[i],
        impl: this.activities.get('impl').value[i]
      };
      this.api.uploadActivity(tempActivity).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
    }
    var i = 0;
    for(; i < this.budgets.get('budId').value.length; i++) {
      // tslint:disable-next-line:prefer-const no-shadowed-variable
      let tempBudget = {
        budId: this.budgets.get('budId').value[i],
        activities: this.budgets.get('activitiess').value[i],
        plan: this.budgets.get('plan').value[i],
        implementation: this.budgets.get('implementation').value[i]
      };
      this.api.uploadBudget(tempBudget).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
    }

    var i = 0;
    for(; i < this.orgs.get('orgId').value.length; i++) {
      // tslint:disable-next-line:prefer-const no-shadowed-variable
      let tempBudget = {
        orgId: this.orgs.get('orgId').value[i],
        activities: this.orgs.get('acts').value[i],
        plan: this.orgs.get('plan').value[i],
        implementation: this.orgs.get('implementation').value[i]
      };
      console.log(tempBudget);
      this.api.uploadOrg(tempBudget).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
      console.log('Iteration ' + i);
    }
    console.log(this.orgs.get('orgId').value.length)

    var i = 0;
    for(; i < this.edus.get('eduId').value.length; i++) {
      // tslint:disable-next-line:prefer-const no-shadowed-variable
      let tempBudget = {
        eduId: this.edus.get('eduId').value[i],
        activities: this.edus.get('activities').value[i],
        implementation: this.edus.get('implementation').value[i]
      };
      console.log(tempBudget);
      this.api.uploadEdu(tempBudget).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
    }

    var i = 0;
    for(; i < this.planPerfom.get('id').value.length; i++) {
      // tslint:disable-next-line:prefer-const no-shadowed-variable
      let tempBudget = {
        id: this.planPerfom.get('id').value[i],
        activities: this.planPerfom.get('activities').value[i],
        implementation: this.planPerfom.get('implementation').value[i]
      };
      console.log(tempBudget);
      this.api.uploadPlanPerfomace(tempBudget).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
    }

    var i = 0;
    for(; i < this.Research.get('comId').value.length; i++) {
      // tslint:disable-next-line:prefer-const no-shadowed-variable
      let tempBudget = {
        comId: this.Research.get('comId').value[i],
        activities: this.Research.get('activities').value[i],
        output: this.Research.get('output').value[i],
        plan: this.Research.get('plan').value[i],
        implementation: this.Research.get('implementation').value[i]
      };
      console.log(tempBudget);
      this.api.uploadResearch(tempBudget).subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          console.log(error1);
        }
      );
    }
  }

  downloadPlan() {
    this.api.downloadYourPlan().subscribe(
      res => {
        this.url = window.URL.createObjectURL(res);
        window.open(this.url);
      },
      error1 => {
        console.log('Error was happend!');
        console.log(error1);
      }
    );
  }

  choosePlan(value) {
    this.selectPlan = value;
  }
  changePlan() {
    this.message.type = 'error';
    this.message.text = 'Нажмите "Отправить план", что бы сохранить изменения';
    this.message.hide = false;
    this.lectures3.setValue(this.lectures.value + this.lectures2.value);
    this.practiceStudies3.setValue(this.practiceStudies.value + this.practiceStudies2.value);
    this.labs3.setValue(this.labs.value + this.labs2.value);
    this.practicesMasters3.setValue(this.practicesMasters.value + this.practicesMasters2.value);
    this.supervisDiplomas3.setValue(this.supervisDiplomas.value + this.practicesMasters2.value);
    this.stateAttestComm3.setValue(this.stateAttestComm.value + this.stateAttestComm2.value);
    this.tsis3.setValue(this.tsis.value + this.tsis2.value);
    this.midEndTerm3.setValue(this.midEndTerm.value + this.midEndTerm2.value);
    this.writtenPaper3.setValue(this.writtenPaper.value + this.writtenPaper2.value);
    this.umkd3.setValue(this.umkd.value + this.umkd2.value);
    this.translations3.setValue(this.translations.value + this.translations2.value);
    this.advisor3.setValue(this.advisor.value + this.advisor2.value);
  }
  somethingChanged() {
    this.message.type = 'error';
    this.message.text = 'Нажмите "Отправить план", что бы сохранить изменения';
    this.message.hide = false;
  }
  onSubmit() {
  }
}
