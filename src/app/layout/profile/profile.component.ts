import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ApiService } from '../../api/api.service';
import * as jwt_decode from 'jwt-decode';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StartEndDateValidator} from '../../shared/start-end-date.validator';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import { experiences, education, skills, achievements } from './cv-data';
import { DocumentCreator } from './rateList-generator';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Update Project
  get ProjectScId() {
    return this.updateProjForm.get('scId') as FormArray;
  }

  get ProjectScName() {
    return this.updateProjForm.get('scName') as FormArray;
  }

  get ProjectScType() {
    return this.updateProjForm.get('scType') as FormArray;
  }

  get ProjectScPriority() {
    return this.updateProjForm.get('scPriority') as FormArray;
  }

  get ProjectScExecutor() {
    return this.updateProjForm.get('scExecutor') as FormArray;
  }

  get ProjectScCustomer() {
    return this.updateProjForm.get('scCustomer') as FormArray;
  }

  get ProjectScAgrDate() {
    return this.updateProjForm.get('scAgrDate') as FormArray;
  }

  get ProjectScNum() {
    return this.updateProjForm.get('scNum') as FormArray;
  }

  get ProjectScStDate() {
    return this.updateProjForm.get('scStDate') as FormArray;
  }

  get ProjectScEndDate() {
    return this.updateProjForm.get('scEndDate') as FormArray;
  }

  get ProjectScTotalSum() {
    return this.updateProjForm.get('scTotalSum') as FormArray;
  }

  get ProjectScFirstName() {
    return this.updateProjForm.get('scFirstName') as FormArray;
  }

  get ProjectScDept() {
    return this.updateProjForm.get('scDept') as FormArray;
  }

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

  // get disFirstName() {
  //   return this.disMemForm.get('firstName') as FormArray;
  // }
  // get disLastName() {
  //   return this.disMemForm.get('lastName') as FormArray;
  // }
  // tslint:disable-next-line:variable-name
  constructor(private _api: ApiService, private fb: FormBuilder, private router: Router) {
    this.disMemForm = this.fb.group({
      disMember: this.fb.array([])
    });

    this.newUserForm = this.fb.group({
      iin: ['', Validators.required],
      placeOfWork: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      description: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
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

  public updatePubForm: FormGroup;
  public updateEventForm: FormGroup;
  public updateProjForm: FormGroup;
  public newProjForm: FormGroup;
  public newProjMemForm: FormGroup;
  public updateProf = false;
  public updateProfForm: FormGroup;
  public updatePub = false;
  public updateProj = false;
  public PmNextPage = false;
  public DisNextMemPage = false;
  public NewUserPage = false;
  public array1 = ['1.1. Тепло- и электроэнергетика и влияние энергетического сектора на окружающую среду, энергосбережение', '1.2. Альтернативная энергетика и технологии: возобновляемые источники энергии, ядерная и водородная энергетика другие источники энергии', '1.3.Транспортное, сельскохозяйственное, нефтегазовое и горно-металлургическое машиностроение'];
  public array2 = ['2.1. Фундаментальные и прикладные исследования в области химической науки', '2.2. Фундаментальные и прикладные научные исследования в области почвенной науки', '2.3. Геология и разработка месторождений полезных ископаемых', '2.4. Комплексное использование минерального сырья', '2.5. Управление водными, почвенными и биологическими ресурсами', '2.6. Мониторинг объектов окружающей среды и «зеленые» технологии', '2.7. Комплексная переработка углеводородного сырья', '2.8. Композиционные материалы', '2.9. Наноматериалы и нанотехнологии', '2.10. Биомедицинские материалы и биологически активные вещества', '2.11.Новые материалы многоцелевого назначения на основе природного сырья и техногенных отходов', '2.12. Промышленная биотехнология', '2.13.Технологии получения штаммов продуцентов биопрепаратов', '2.14.Системы поиска, разведки и разработки МПИ', '2.15.Системы обогащения, комплексного извлечения, переработки природного и техногенного рудного сырья', '2.16. Добыча и использование нерудных полезных ископаемых',
    '2.17. Производство и обработка металлов и материалов', '2.18. Системы эффективного водопользования', '2.19. Системы очистки сточных вод, газоочистки и пылеулавливания', '2.20. Системы по переработке промышленных и бытовых отходов', '2.21. Системы поддержания биологического разнообразия', '2.22.Системы снижения уровня выбросов парниковых газов и применения альтернативных источников энергии', '2.23. Системы по предотвращению опустынивания и деградации земель', '2.24. Информационные системы и база данных', '2.25. Каталитические системы и технологии', '2.26. Полимерные материалы со специальными свойствам', '2.27. Функциональные материалы для текстильной и легкой промышленности', '2.28. Новые строительные конструкции зданий и сооружений, технологии производства строительных материалов и изделий, сейсмостойкое строительство и безопасность сооружений, новейшие архитектурные формы'];
  public array3 = ['3.1. Интеллектуальные информационные технологии', '3.2. Телекоммуникационные технологии', '3.3. Космические технологии', '3.4. Высокопроизводительные вычислительные технологии', '3.5. Методы и системы информационной безопасности и защиты данных', '3.6. Научные исследования в области естественных наук'];
  public arr31 = ['3.1.1. Интеллектуальные системы управления и принятия решений (в том числе в режиме реального времени)', '3.1.2. Речевые технологии и компьютерная лингвистика', '3.1.3. Распознавание образов и обработка изображений', '3.1.4. Машинное обучение (machine learning)', '3.1.5. Интеллектуальные робототехнические системы', '3.1.6. Смарт технологии в науке и образовании', '3.1.7. Основы новых технологий для индустрии: системы дополненной и виртуальной реальности, 3D-принтинг и другое аддитивное производство. Интернет вещей'];
  public arr32 = ['3.2.1. Управление и оптимизация в системах связи, сетях передачи данных (в том числе мультисервисных платформах: мобильных и игровых интернет технологиях)', '3.2.2. Информационно-коммуникационные системы для онлайн-торговли, цифрового банкинга и других цифровых сервисов'];
  public arr33 = ['3.3.1. Технологии разработки аппаратно-программных средств и приборов для космической техники и наземно-космической инфраструктуры', '3.3.2. Развитие научной и экспериментальной базы исследований дальнего и ближнего космоса'];
  public arr34 = ['3.4.1. Облачные, параллельные и распределенные вычисления', '3.4.2. Bid-data и data mining технологии', '3.4.3.Архитектура и технологии проектирования технического обеспечения вычислительных систем', '3.4.4. Информационно-поисковые системы'];
  public arr35 = ['3.5.1. Методы и алгоритмы обеспечения информационной безопасности сложных систем и данных', '3.5.2. Технологии и программно-технические средства защиты информации'];
  public arr36 = ['3.6.1. Фундаментальные и прикладные исследования в области математики', '3.6.2.Фундаментальные и прикладные исследования в области физики и астрономии', '3.6.3. Фундаментальные и прикладные исследования в области информатики', '3.6.4. Математическое и компьютерное моделирования в области механики'];
  public array4 = ['4.1. Развитие интенсивного животноводства', '4.2. Обеспечение ветеринарной безопасности', '4.3. Интенсивное земледелие и растениеводство', '4.4. Обеспечение фитосанитарной безопасности', '4.5. Переработка и хранение сельскохозяйственной продукции и сырья', '4.6. Техническое обеспечение модернизации агропромышленного комплекса', '4.7. Устойчивое развитие сельских территорий'];
  public array5 = ['5.1. Биотехнологии в сельском хозяйстве и охране окружающей среды', '5.2. Биотехнологии в медицине', '5.3. Развитие отечественной фармацевтической науки и промышленной биотехнологии'];
  public arr51 = ['5.1.1. Технология геномного редактирования, маркер-сопутствующая и геномная  селекция для улучшения хозяйственно-ценных признаков растений и животных', '5.1.2. Биотехнология для создания биоудобрений и биологических препаратов для борьбы с болезнями сельскохозяйственных растений', ' 5.1.3. Молекулярно-генетические и клеточные технологии для создания вакцин, био- и лекарственных препаратов и диагностических тест-систем нового поколения', '5.1.4. Биотехнологии для сохранения и воспроизводства биоразнобразия естественных экосистем', '5.1.1. Технология геномного редактирования, маркер-сопутствующая и геномная  селекция для улучшения хозяйственно-ценных признаков растений и животных',
    '5.1.5. Биотехнологии для реабилитации техногенно-нарушенных экосистем, очистки сточных вод и почв от промышленных и агропромышленных загрязнений', '5.1.6. Инновационные биотехнологии получения альтернативных источников энергии', '5.1.7. Информационные технологии в биологии, сельском хозяйстве и экологии'];
  public arr52 = ['5.2.1.  Развитие клеточных технологий и тканевой инженерии для медицины', '5.2.2. Молекулярно-генетические, геномные технологии и биоинформатика для развития персонализированной медицины', '5.2.3. Мультиомные и молекулярные технологии для досимптомной диагностики, профилактики и лечения заболеваний',
    '5.2.4. Новые технологии и биологически активные субстанции для решения проблем анте- и постнатального развития, старения, продления жизни человека', '5.2.5. Новые биотехнологии получения био- и лекарственных препаратов для превентивной медицины'];
  public arr53 = ['5.3.1. Разработка оригинальных лекарственных и профилактических препаратов, изделий медицинского назначения, оборудований и приборов для медицины и ветеринарии, технологии их производства, доклинические и клинические исследования', '5.3.2.Технологии получения ценных компонентов из растительного, животного и минерального сырья биотехнологическими методами', '5.3.3.Технология получения штаммов-продуцентов биопрепаратов, ферментов белков и аминокислот для сельского хозяйства, пищевой и перерабатывающей промышленности', '5.3.4.Технологии глубокой переработки сырья с использованием микроорганизмов и/или ферментов, биологически активных субстанций'];
  public array6 = ['6.1.Фундаментальные и прикладные исследования в области социально-экономических и гуманитарных наук', '6.2. Фундаментальные и прикладные исследования проблем образования ХХІ века', '6.3. Фундаментальные и прикладные исследования проблем модернизации общественного сознания'];
  public arr61 = ['6.1.1. Исследование социально-экономических условий развития наукоемких конкурентоспособных производств (экономик)', '6.1.2. Исследование в области реализации социальной и экономической политики государства в современных условиях', '6.1.3. Актуальные проблемы социальных и общественно-гуманитарных наук и междисциплинарные исследования', '6.1.4. Исследования в области культуры, традиций, ценностей в условиях модернизации общества и государства', '6.1.5. ІІІ-я технологическая модернизация экономики, Индустрия 4.0, промышленная и технологическая политика, инновационная экономика, научное, креативное и социальное предпринимательство'];
  public arr63 = ['6.3.1. Новое гуманитарное знание', '6.3.2. Туған жер. Общенациональное единство, мир и согласие', '6.3.3. Духовные святыни Казахстана. Сакральная география Казахстана', '6.3.4.Общность истории, культуры и языка. Современная Казахстанская культура в глобальном мире', '6.3.5. Рухани жаңғыру және Ұлы даланың жеті қыры'];
  message = {
    type: '',
    text: '',
    hide: false
  };

  // public currentPage = 1;
  public DecodedToken = this.getDecodedAccessToken(localStorage.getItem('token'));
  public IdToken = this.DecodedToken.jti;
  public roles = this.DecodedToken.roles;
  public depUsers = [];

  // Profile user
  public user: any = {};

  // Documents list
  public documents = [];

  public publications = [];
  public Allpublications = [];
  public events;
  public AllProjects = [];
  public AllTeachers = [];
  public publicationForm: FormGroup;
  public eventForm: FormGroup;
  public patentForm: FormGroup;
  public patents;
  public AllPatens;
  public updateStatusPatent = false;
  public PatentFileRu = null;
  public PatentFileKz = null;
  public PatentFileEn = null;
  public PatentLinkRu = null;
  public PatentLinkKz = null;
  public PatentLinkEn;
  public uploadForm: FormGroup;

  public selectTable = 1;

  public reloadPublications = true;
  public reloadEvenet = true;
  public reloadProject = true;
  public reloadScPrRole = true;
  public one_time = 0;
  public one_time_event = 0;
  public startPubDate: FormControl;
  public endPubDate: FormControl;
  public startDate;
  public endDate;

  public headDep = false;
  public disRole = false;
  public disMemRole = false;
  public Science_DeptRole = false;
  public Teacher_Role = false;
  public ScProjectManager = false;
  public ScLeadingRes = false;
  public ScSeniorRes = false;
  public ScJunRes = false;
  public science_projects = [];
  public disForm: FormGroup;
  public disCreate = false;
  public disMemForm: FormGroup;
  public disId;
  public ourMem = false;
  public newUserForm: FormGroup;
  public MyDissovets: any;
  public MySecDissovets: any;

  selectedFile: File = null;
  selectedEventFile: File = null;
  private temPub: {};
  private temEvent: {};
  public names = [];
  public exNames = [];
  public PubTypeCounts;
  public UserDegreeCounts;
  public publishCount;
  generatePdf() {
    const documentDefinition = {  info: {
        title: 'ИПП(' + this.user.firstName[0] + '.' + this.user.lastName + ')',
        author: this.user.firstName + ' ' + this.user.lastName,
        subject: 'ИПП',
        keywords: 'keywords for document',
      },
      content: [
        { text: '1. Оқу- әдістеме жұмысы / Учебно-методическая работа/Academic and methodological activities', bold: true},

        {
          table: {
            widths: ['auto', 'auto', 'auto', 'auto'],

            body: [
              [ {text: 'Рет саны №п.п№', rowSpan: 2, bold: true},
                {text: 'Жұмыс аталуы, орындалу мерзімі\n' +
                  'Наименование работ, срок выполнения\n' +
                  'Activities, time frame\n', bold: true, rowSpan: 2},
                {text: 'Жұмыс көлемі\n' +
                    'Объем работы\n' +
                    '(сағат / часы)\n' +
                    'Workload \n' +
                    '(hrs)\n', colSpan: 2, bold: true, align: 'center'}, ''],
              ['' , '', {text: 'Жоспардың орындалу уақыты\n' +
              'Срок  выполения плана\n' +
              'Time frame\n', bold: true}, {text: 'Жоспардың орындалуы\n' +
              'Фактическое\n' +
              'выполнение плана\n' +
              'Implementation\n', bold: true }],
              [{text: '1', bold: true}, 'Вторая', 'Третья', 'sdfsdf']
            ],
            headerRows: 2
          }
        },
      ],
      };
    pdfMake.createPdf(documentDefinition).open();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = DocumentCreator.create(this.PubTypeCounts, this.UserDegreeCounts, this.publishCount);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "Рейтинг лист.docx");
      console.log("Document created successfully");
    });
  }

  ngOnInit() {
    this._api.getPubTypeCount().subscribe(
      res => {
        console.log(res);
        this.PubTypeCounts = res;
      },
      err => {
        console.log(err);
      }
    );

    this._api.getUserDegreeCount().subscribe(
      res => {
        console.log(res);
        this.UserDegreeCounts = res;
      },
      err => {
        console.log(err);
      }
    );
    this._api.getPublishCount().subscribe(
      res => {
        console.log(res);
        this.publishCount = res;
      },
      err => {
        console.log(err);
      }
    );

    this.uploadForm = this.fb.group({
      profile: ['']
    });
    setInterval(() => this.checkScProjManager(), 1000);
    this.newProjMemForm = this.fb.group({
      ScienceMember: this.fb.array([])
    });
    this.addProjectMemberRow(9);
    this.patentForm = this.fb.group({
      ptnt_number: ['', Validators.required],
      ptnt_issue_date: ['', Validators.required],
      ptnt_country_id: ['', Validators.required],
      ptnt_type_id: ['', Validators.required],
      ptnt_published_TR: ['', Validators.required],
      ptnt_user_id: [this.IdToken],
      ptnt_status_id: ['1'],
      ptnt_inserted_date: [new Date()],
      ptnt_file_kz: '',
      ptnt_file_en: '',
      ptnt_file_ru: '',
      ptnt_file_name_ru: '',
      ptnt_file_name_kz: '',
      ptnt_file_name_en: '',
    });

    this.newProjForm = this.fb.group({
      scId: ['', Validators.required],
      scName: ['', Validators.required],
      scType: ['', Validators.required],
      scPriority: ['', Validators.required],
      scSubPriority: ['', Validators.required],
      scSubSubPriority: [''],
      scExecutor: ['', Validators.required],
      scCustomer: ['', Validators.required],
      scAgrDate: ['', Validators.required],
      scNum: ['', Validators.required],
      scStDate: ['', Validators.required],
      scEndDate: ['', Validators.required],
      scTotalSum: ['', Validators.required],
      scFirstName: ['Вы научный руководитель'],
      scDept: ['', Validators.required],
      scDirector: this.IdToken
    }, {validator: StartEndDateValidator});
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i] == 'Head_Of_Dept') {
        this.headDep = true;
      } else if (this.roles[i] == 'Science_Secretary_Dissovet') {
        this.disRole = true;
      } else if (this.roles[i] == 'Dissovet_Member') {
        this.disMemRole = true;
      } else if (this.roles[i] == 'Science_Dept') {
        this.Science_DeptRole = true;
      } else if (this.roles[i] == 'Teacher') {
        this.Teacher_Role = true;
      } else if (this.roles[i] == 'Science_Project_Manager') {
        this.ScProjectManager = true;
      } else if (this.roles[i] == 'Leading_Researcher') {
        this.ScLeadingRes = true;
      } else if (this.roles[i] == 'Senior_Researcher') {
        this.ScSeniorRes = true;
      } else if (this.roles[i] == 'Junior_Researcher') {
        this.ScJunRes = true;
      }
    }
    if (this.Teacher_Role == false && this.Science_DeptRole == true) {
      this.selectTable = 6;
      const science_id = {
        ptnt_user_id: this.IdToken
      };
      this._api.getAllPatents(science_id).subscribe(
        res => {
          console.log(res);
          this.AllPatens = res;
        },
        err => {
          console.log(err);
        }
      );
    }
    this._api.getUserById(this.IdToken).subscribe(
      res => {
        console.log(res);
        this.newProjForm.patchValue({scFirstName: res.firstName + ' ' + res.lastName});
        this.user = res;
        this.updateProfForm = this.fb.group({
          firstName: [res.firstName, Validators.required],
          lastName: [res.lastName, Validators.required],
          patronomyc: [res.patronomyc, Validators.required],
          email: [res.email, Validators.required]
        });
        this.documents = res.documentEntities;
      },
      err => {
        console.log(err);
      }
    );
    if (this.ScProjectManager == true) {
      this._api.getAllTeachers().subscribe(
        res => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            if (res[i].userId != this.IdToken) {
              console.log(res[i]);
              this.AllTeachers.push(res[i]);
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.Science_DeptRole == true) {
      this._api.getAllScienceProjects().subscribe(
        res => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            res[i].scAgrDate = new Date(res[i].scAgrDate).getFullYear() + '-' + (new Date(res[i].scAgrDate).getMonth() + 1) + '-' + new Date(res[i].scAgrDate).getDate();
            res[i].scStDate = new Date(res[i].scStDate).getFullYear() + '-' + (new Date(res[i].scStDate).getMonth() + 1) + '-' + new Date(res[i].scStDate).getDate();
            res[i].scEndDate = new Date(res[i].scEndDate).getFullYear() + '-' + (new Date(res[i].scEndDate).getMonth() + 1) + '-' + new Date(res[i].scEndDate).getDate();
          }
          this.AllProjects = res;
          console.log(new Date(res[0].scAgrDate).getDate());
        },
        err => {
          console.log(err);
        }
      );
      this._api.getAllTeachers().subscribe(
        res => {
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].roles.length; j++) {
              if (res[i].roles[j].roleName == 'Science_Project_Manager') {
                res[i].scRole = true;
              }
            }
          }
          console.log(res);
          this.AllTeachers = res;
        },
        err => {
          console.log(err);
        }
      );
    }
    this.startPubDate = new FormControl();
    this.endPubDate = new FormControl();
    if (this.disMemRole == true) {
      this._api.getAllMyDisSovets().subscribe(
        res => {
          this.MyDissovets = res;
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            this.MyDissovets[i].disStopDate = new Date(this.MyDissovets[i].disStopDate).toDateString();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.disRole == true) {
      this._api.getSecDisSovet().subscribe(
        res => {
          console.log(res);
          this.MySecDissovets = res;
          for (let i = 0; i < res.length; i++) {
            this.MySecDissovets[i].disStopDate = new Date(this.MySecDissovets[i].disStopDate).getFullYear();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.Teacher_Role == true) {
      const userId = {
        ptnt_user_id: this.IdToken
      };
      this._api.getPatent(userId).subscribe(
        res => {
          console.log(res);
          this.patents = res;
        },
        err => {
          console.log(err);
        }
      );

      this._api.getScienceProject().subscribe(
        res => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            res[i].scAgrDate = new Date(res[i].scAgrDate).getFullYear() + '-' + (new Date(res[i].scAgrDate).getMonth() + 1) + '-' + new Date(res[i].scAgrDate).getDate();
            res[i].scStDate = new Date(res[i].scStDate).getFullYear() + '-' + (new Date(res[i].scStDate).getMonth() + 1) + '-' + new Date(res[i].scStDate).getDate();
            res[i].scEndDate = new Date(res[i].scEndDate).getFullYear() + '-' + (new Date(res[i].scEndDate).getMonth() + 1) + '-' + new Date(res[i].scEndDate).getDate();
          }
          this.science_projects = res;
        },
        err => {
          console.log(err);
          this.Teacher_Role = false;
        }
      );
    }
    if (this.headDep == true) {
      this._api.getDepUsers(this.IdToken).subscribe(
        res => {
          console.log(res);
          for (let i = 0; i < res.usersDeptsEntities.length; i++) {
            const tempUser = {
              userId: res.usersDeptsEntities[i].primaryKey.userEntity.userId,
              firstName: res.usersDeptsEntities[i].primaryKey.userEntity.firstName,
              lastName: res.usersDeptsEntities[i].primaryKey.userEntity.lastName,
              email: res.usersDeptsEntities[i].primaryKey.userEntity.email,
              description: res.usersDeptsEntities[i].primaryKey.userEntity.description,
              userType: res.usersDeptsEntities[i].userType
            };
            this.depUsers.push(tempUser);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    this.newUserForm = this.fb.group({
      iin: ['', Validators.required],
      placeOfWork: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      description: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
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
      pubFile: '',
      pubPublished: ['', Validators.required]
    });
    this.eventForm = this.fb.group({
      event_type: [''],
      event_role: [''],
      event_name: ['', Validators.required],
      event_city: ['', Validators.required],
      event_url: ['', Validators.required],
      event_date: ['', Validators.required],
      event_file: '',
      event_user_id: this.IdToken,
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
      event_type: this.fb.array([]),
      event_role: this.fb.array([]),
      event_name: this.fb.array([]),
      event_city: this.fb.array([]),
      event_url: this.fb.array([]),
      event_date: this.fb.array([])
    });
    this.updateProjForm = this.fb.group({
      scId: this.fb.array([]),
      scName: this.fb.array([]),
      scType: this.fb.array([]),
      scPriority: this.fb.array([]),
      scExecutor: this.fb.array([]),
      scCustomer: this.fb.array([]),
      scAgrDate: this.fb.array([]),
      scNum: this.fb.array([]),
      scStDate: this.fb.array([]),
      scEndDate: this.fb.array([]),
      scTotalSum: this.fb.array([]),
      scFirstName: this.fb.array([]),
      scDept: this.fb.array([])
    });

    this._api.getAllScienceProjects().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          this.ProjectScId.push(this.fb.control(res[i].scId));
          this.ProjectScName.push(this.fb.control(res[i].scName));
          this.ProjectScType.push(this.fb.control(res[i].scType));
          this.ProjectScPriority.push(this.fb.control(res[i].scPriority));
          this.ProjectScExecutor.push(this.fb.control(res[i].scExecutor));
          this.ProjectScCustomer.push(this.fb.control(res[i].scCustomer));
          this.ProjectScFirstName.push(this.fb.control(res[i].scFirstName));
          this.ProjectScDept.push(this.fb.control(res[i].scDept));
          this.ProjectScAgrDate.push(this.fb.control(res[i].scAgrDate));
          this.ProjectScNum.push(this.fb.control(res[i].scNum));
          this.ProjectScEndDate.push(this.fb.control(res[i].scStDate));
          this.ProjectScStDate.push(this.fb.control(res[i].scEndDate));
          this.ProjectScTotalSum.push(this.fb.control(res[i].scTotalSum));
        }
      },
      error1 => {
        console.log(error1);
      }
    );

    if (this.Teacher_Role == true) {
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
          let i = 0;
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
          this.events = res;
        },
        error1 => {
          console.log(error1);
        }
      );
      this._api.getEvent().subscribe(
        res => {
          console.log(res);
          // var i = 0;
          // for (; i < res.length; i++) {
          //   this.evId.push(this.fb.control(res[i].evId));
          //   this.event_type.push(this.fb.control(res[i].event_type));
          //   this.event_role.push(this.fb.control(res[i].event_role));
          //   this.event_name.push(this.fb.control(res[i].event_name));
          //   this.event_date.push(this.fb.control(res[i].event_date));
          //   this.event_city.push(this.fb.control(res[i].event_city));
          //   this.event_url.push(this.fb.control(res[i].event_url));
          // }
        },
        error1 => {
          console.log(error1);
        }
      );
    }
  }

  uploadPublicationFile() {
    const formData = new FormData();
    let pubLink;
    formData.append('file', this.selectedFile);
    $.ajax({
      url: 'https://nir.iitu.kz:8443/saa-uploader/uploadPublicationFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      async: false,
    }).done(function(data) {
      const obj = JSON.parse(data);
      console.log(obj);
      pubLink = obj.filePath;
    });
    this.publicationForm.patchValue({
      pubFile: pubLink
    });
    console.log(pubLink);
  }

  uploadEventFile() {
    const formData = new FormData();
    let EventLink;
    formData.append('file', this.selectedEventFile);
    $.ajax({
      url: 'https://nir.iitu.kz:8443/saa-uploader/uploadEventFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      async: false,
    }).done(function(data) {
      const obj = JSON.parse(data);
      console.log(obj);
      EventLink = obj.filePath;
    });
    this.eventForm.patchValue({
      event_file: EventLink
    });
    console.log(EventLink);
  }

  sendPublication($event) {
    const publicationType1 = (document.getElementById('publicationType') as HTMLInputElement).value;
    const publicationPub = (document.getElementById('pubPublished') as HTMLInputElement).value;
    this.publicationForm.patchValue({
      pubType: publicationType1,
      pubPublished: publicationPub
    });
    console.log(this.publicationForm.value);
    this._api.uploadPub(this.publicationForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    this.reloadPublications = false;
    setTimeout(() => {
      this.reloadPublications = true;
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

  updateProject() {
    if (this.updateProj == false) {
      this.updateProj = true;

    } else {
      for (let i = 0; i < this.AllProjects.length; i++) {
        const tempProject = {
          scId: this.updateProjForm.get('scId').value[i],
          scName: this.updateProjForm.get('scName').value[i],
          scType: this.updateProjForm.get('scType').value[i],
          scPriority: this.updateProjForm.get('scPriority').value[i],
          scExecutor: this.updateProjForm.get('scExecutor').value[i],
          scCustomer: this.updateProjForm.get('scCustomer').value[i],
          scAgrDate: this.updateProjForm.get('scAgrDate').value[i],
          scNum: this.updateProjForm.get('scNum').value[i],
          scStDate: this.updateProjForm.get('scStDate').value[i],
          scEndDate: this.updateProjForm.get('scEndDate').value[i],
          scTotalSum: this.updateProjForm.get('scTotalSum').value[i],
          scFirstName: this.updateProjForm.get('scFirstName').value[i]
        };
        console.log(tempProject);
        this._api.updateScienceProject(tempProject.scId, tempProject).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }

      setTimeout(() => {
        this.reloadProject = true;
        this._api.getAllScienceProjects().subscribe(
          res => {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
              res[i].scAgrDate = new Date(res[i].scAgrDate).getFullYear() + '-' + (new Date(res[i].scAgrDate).getMonth() + 1) + '-' + new Date(res[i].scAgrDate).getDate();
              res[i].scStDate = new Date(res[i].scStDate).getFullYear() + '-' + (new Date(res[i].scStDate).getMonth() + 1) + '-' + new Date(res[i].scStDate).getDate();
              res[i].scEndDate = new Date(res[i].scEndDate).getFullYear() + '-' + (new Date(res[i].scEndDate).getMonth() + 1) + '-' + new Date(res[i].scEndDate).getDate();
            }
            this.AllProjects = res;
            console.log(new Date(res[0].scAgrDate).getDate());
          },
          err => {
            console.log(err);
          }
        );
      }, 1000);

      setTimeout(() => {
        this.message.type = 'success';
        this.message.text = 'Изменения успешно сохранены';
        this.message.hide = false;
        setTimeout(() => {
          this.message.hide = true;
        }, 2000);
      }, 200);
      this.updateProj = false;
    }
    console.log(this.updateProj);
  }

  sendEvent() {
    const evType1 = (document.getElementById('event_type') as HTMLInputElement).value;
    const evRole1 = (document.getElementById('event_role') as HTMLInputElement).value;
    this.eventForm.patchValue({
      event_type: evType1,
      event_role: evRole1
    });
    console.log(this.eventForm.value);
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

    // if (this.events.length != 0) {
    //   // this.evId.push(this.fb.control(this.events[this.events.length - 1].evId + 1));
    //   // this.event_type.push(this.fb.control(this.eventForm.value.event_type));
    //   // this.event_role.push(this.fb.control(this.eventForm.value.event_role));
    //   // this.event_name.push(this.fb.control(this.eventForm.value.event_name));
    //   // this.event_date.push(this.fb.control(this.eventForm.value.event_date));
    //   // this.event_city.push(this.fb.control(this.eventForm.value.event_city));
    //   // this.event_url.push(this.fb.control(this.eventForm.value.event_url));
    // }
  }

  onPubFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }
  onEventFileSelected(event) {
    this.selectedEventFile = event.target.files[0] as File;
  }
  downloadPublicationFile(filePath) {
    this._api.downloadPubFile(filePath).subscribe(
      res => {
        console.log(res);
        const newBlob = new Blob([res], {type: 'application/octet-stream'});
        window.open(window.URL.createObjectURL(newBlob));
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  updateProfile() {
    this.message.type = 'error';
    this.message.text = 'Что бы сохранить все изменения нажмите повторно Edit';
    this.message.hide = false;
    if (this.updateProf === false) {
      this.updateProf = true;
    } else {
      this._api.updateProfile(this.updateProfForm.value).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
      this._api.getUserById(this.IdToken).subscribe(
        res => {
          console.log(res);
          this.newProjForm.patchValue({scFirstName: res.firstName + ' ' + res.lastName});
          this.user = res;
          this.updateProfForm = this.fb.group({
            firstName: [res.firstName, Validators.required],
            lastName: [res.lastName, Validators.required],
            patronomyc: [res.patronomyc, Validators.required],
            email: [res.email, Validators.required]
          });
          this.documents = res.documentEntities;
        },
        err => {
          console.log(err);
        }
      );
      this.updateProf = false;
      setTimeout(() => {
        this.message.type = 'success';
        this.message.text = 'Изменения успешно сохранены';
        this.message.hide = false;
        setTimeout(() => {
          this.message.hide = true;
        }, 2000);
      }, 200);
      console.log(this.updateProfForm.value);
    }
    // if (this.publications.length === 1 && this.one_time === 0) {
    //   console.log(this.one_time);
    //   this.updatePubId.push(this.fb.control(this.publications[this.publications.length - 1].pubId));
    //   this.pubType.push(this.fb.control(this.publicationForm.value.pubType));
    //   this.pubCoAuthor.push(this.fb.control(this.publicationForm.value.pubCoAuthor));
    //   this.pubName.push(this.fb.control(this.publicationForm.value.pubName));
    //   this.pubYear.push(this.fb.control(this.publicationForm.value.pubYear));
    //   this.pubCity.push(this.fb.control(this.publicationForm.value.pubCity));
    //   this.pubPubName.push(this.fb.control(this.publicationForm.value.pubPubName));
    //   this.pubPage.push(this.fb.control(this.publicationForm.value.pubPage));
    //   this.pubUrl.push(this.fb.control(this.publicationForm.value.pubUrl));
    //   this.pubDoi.push(this.fb.control(this.publicationForm.value.pubDoi));
    //   this.one_time++;
    // }
    // if (this.events.length === 1 && this.one_time_event === 0) {
    //   console.log(this.one_time_event);
    //   this.evId.push(this.fb.control(this.events[this.events.length - 1].evId));
    //   this.event_type.push(this.fb.control(this.eventForm.value.event_type));
    //   this.event_role.push(this.fb.control(this.eventForm.value.event_role));
    //   this.event_name.push(this.fb.control(this.eventForm.value.event_name));
    //   this.event_date.push(this.fb.control(this.eventForm.value.event_date));
    //   this.event_city.push(this.fb.control(this.eventForm.value.event_city));
    //   this.event_url.push(this.fb.control(this.eventForm.value.event_url));
    //   this.one_time_event++;
    // }
    // if (this.updatePub == false) {
    //   this.updatePub = true;
    // } else {
    //   for (var i = 0; i < this.publications.length; i++) {
    //     this.temPub = {
    //       pubName: this.pubName.value[i],
    //       pubType: this.pubType.value[i],
    //       pubCoAuthor: this.pubCoAuthor.value[i],
    //       pubYear: this.pubYear.value[i],
    //       pubPubName: this.pubPubName.value[i],
    //       pubCity: this.pubCity.value[i],
    //       pubPage: this.pubPage.value[i],
    //       pubUrl: this.pubUrl.value[i],
    //       pubDoi: this.pubDoi.value[i]
    //     };
    //     this._api.updatePub(this.publications[i].pubId, this.temPub).subscribe(
    //       res => {
    //         console.log(res);
    //       },
    //       error1 => {
    //         console.log(error1);
    //       }
    //     );
    //   }
    //   for (var j = 0; j < this.events.length; j++) {
    //     this.temEvent = {
    //       event_name: this.event_name.value[j],
    //       event_type: this.event_type.value[j],
    //       event_role: this.event_role.value[j],
    //       event_date: this.event_date.value[j],
    //       event_city: this.event_city.value[j],
    //       event_url: this.event_url.value[j],
    //     };
    //     this._api.updateEvent(this.events[j].evId, this.temEvent).subscribe(
    //       res => {
    //         console.log(res);
    //       },
    //       err => {
    //         console.log(err);
    //       }
    //     );
    //   }

    //   this.updatePub = false;
    // }
    // setTimeout(() => {
    //   this.reloadPublications = true
    //   this._api.getPublications().subscribe(
    //     res => {
    //       this.publications = res;
    //       this.Allpublications = res;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }, 1000);
    // setTimeout(() => {
    //   this.reloadEvenet = true;
    //   this._api.getEvent().subscribe(
    //     res => {
    //       this.events = res;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }, 1000);
  }

  genereatePubPDF() {
    console.log(this.depUsers);
    this._api.generatePubFile().subscribe(
      res => {
        const newBlob = new Blob([res], {type: 'application/pdf'});
        window.open(window.URL.createObjectURL(newBlob));
      },
      err => {
        console.log(err);
      }
    );
  }

  changeStartDate() {
    this.startDate = new Date(this.startPubDate.value);
    if (this.endPubDate.value != '' && this.startPubDate.value != '' && this.endPubDate.value != null) {
      console.log('this is filter');
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
    if (this.endPubDate.value != '' && this.startPubDate.value != '' && this.startPubDate.value != null) {
      console.log('this is filter');
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
    console.log(this.startPubDate.value == '');
    console.log(this.endPubDate.value == '');
  }

  goPreviousDis() {
    const control = this.disMemForm.controls.disMember as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
    if (this.DisNextMemPage == true) {
      this.DisNextMemPage = false;
    }
  }

  goPreviousDisMem() {
    if (this.NewUserPage == true) {
      this.NewUserPage = false;
      this.DisNextMemPage = true;
    }
  }

  createDisSovet() {
    // this._api.uploadDisSovet(this.disForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //     this.disId = res;
    //   },
    //   err => {
    //     console.log(err);
    //   });
    this.exNames = [];
    this.names = [];
    for (let i = 0; i < this.disForm.get('membersNum').value; i++) {
      this.addRow();
    }
    if (this.DisNextMemPage == false) {
      this.DisNextMemPage = true;
    }
    this._api.getOwnUsers().subscribe(
      res => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].userId != this.user.userId) {
            if (res[i].own == true) {
              this.names.push(res[i]);
            } else {
              this.exNames.push(res[i]);
            }
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
    this._api.uploadDisSovet(this.disForm.value).subscribe(
      res => {
        console.log(res);

        for (let i = 0; i < this.disForm.get('membersNum').value; i++) {
          if (this.disMemForm.get('disMember').value[i].memberType == 'Внутренний сотрудник') {
            const tempDisMem = {
              // firstName: this.disMemForm.get('disMember').value[i].firstName,
              // lastName: this.disMemForm.get('disMember').value[i].lastName,
              memberType: this.disMemForm.get('disMember').value[i].memberType,
              academicDegree: this.disMemForm.get('disMember').value[i].academicDegree,
              specCode: this.disMemForm.get('disMember').value[i].specCode,
              disSpecCode: this.disMemForm.get('disMember').value[i].disSpecCode,
              workPlace: this.disMemForm.get('disMember').value[i].workPlace,
              disPosition: this.disMemForm.get('disMember').value[i].disPosition,
              disId: res,
              userId: this.disMemForm.get('disMember').value[i].userId
            };

            console.log(tempDisMem);
            this._api.uploadDisMember(res, tempDisMem).subscribe(
              result => {
                console.log(result);
              },
              error => {
                console.log(error);
              }
            );
          } else {
            const tempDisMem = {
              // firstName: this.disMemForm.get('disMember').value[i].firstName,
              // lastName: this.disMemForm.get('disMember').value[i].lastName,
              memberType: this.disMemForm.get('disMember').value[i].memberType,
              academicDegree: this.disMemForm.get('disMember').value[i].academicDegree,
              specCode: this.disMemForm.get('disMember').value[i].specCode,
              disSpecCode: this.disMemForm.get('disMember').value[i].disSpecCode,
              workPlace: this.disMemForm.get('disMember').value[i].workPlace,
              disPosition: this.disMemForm.get('disMember').value[i].disPosition,
              disId: res,
              userId: this.disMemForm.get('disMember').value[i].userId
            };

            console.log(tempDisMem);
            this._api.uploadDisMember(res, tempDisMem).subscribe(
              result => {
                console.log(result);
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      },
      err => {
        console.log(err);
      });
    setTimeout(() => {
      this.message.type = 'success';
      this.message.text = 'Диссовет успешно создан';
      this.message.hide = false;
      setTimeout(() => {
        this.message.hide = true;
      }, 2000);
    }, 200);
  }

  onSubmit() {

  }

  addRow() {

    const control = this.disMemForm.controls.disMember as FormArray;

    // instantiate a new day FormGroup;
    const newDisMember: FormGroup = this.initItems();

    // Add it to our formArray
    control.push(newDisMember);
  }

  deleteDisMember() {
    const control = this.disMemForm.controls.disMember as FormArray;
    if (control.length > 1) {
      control.removeAt(control.length - 1);
    }
  }

  initItems(): FormGroup {
    return this.fb.group({
      // firstName: [null, Validators.required],
      // lastName : [null, Validators.required],
      memberType: [null, Validators.required],
      academicDegree: [null, Validators.required],
      specCode: [null, Validators.required],
      disSpecCode: [null, Validators.required],
      workPlace: [null, Validators.required],
      disPosition: [null, Validators.required],
      disId: [null],
      userId: [null]
    });
  }

  addProjectMemberRow(scId) {
    const control = this.newProjMemForm.controls.ScienceMember as FormArray;

    // instantiate a new day FormGroup;
    const newDisMember: FormGroup = this.initProjectMember(scId);

    // Add it to our formArray
    control.push(newDisMember);
  }

  initProjectMember(scId): FormGroup {
    return this.fb.group({
      scAddDate: [new Date()],
      scRole: [null, Validators.required],
      scId: [scId],
      userId: [null, Validators.required]
    });
  }

  deleteProjectMember() {
    const control = this.newProjMemForm.controls.ScienceMember as FormArray;
    if (control.length > 1) {
      control.removeAt(control.length - 1);
    }
  }

  addNewUser() {
    this._api.uploadNewUser(this.newUserForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    this.exNames = [];
    this.names = [];
    this._api.getOwnUsers().subscribe(
      res => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].userId != this.user.userId) {
            if (res[i].own = true) {
              this.names.push(res[i]);
            } else {
              this.exNames.push(res[i]);
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  sendNotification() {

  }

  makeScienceManager(id) {
    const role = {
      userId: id,
      roleName: 'Science_Project_Manager'
    };
    this._api.addRole(role).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.reloadScPrRole = false;
      for (let i = 0; i < this.AllTeachers.length; i++) {
        if (this.AllTeachers[i].userId == id) {
          this.AllTeachers[i].scRole = true;
        }
      }
      setTimeout(() => {
        this.reloadScPrRole = true;
      }, 100);
    }, 100);
    this.reloadScPrRole = true;
  }

  getScienceManaged(id) {
    this._api.deleteScPrRole(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.reloadScPrRole = false;
      for (let i = 0; i < this.AllTeachers.length; i++) {
        if (this.AllTeachers[i].userId == id) {
          this.AllTeachers[i].scRole = false;
        }
      }
      setTimeout(() => {
        this.reloadScPrRole = true;
      }, 100);
    }, 100);
  }

  sendProject() {
    console.log(this.newProjForm.value);
    this._api.addProject(this.newProjForm.value).subscribe(
      res => {
        console.log(res);
        const control = this.newProjMemForm.controls.ScienceMember as FormArray;
        const members = control.value;
        const mainMember = {
          scAddDate: new Date(),
          scRole: 'Научный руководитель',
          scId: res.scId,
          userId: this.IdToken
        };
        this._api.addMemberToProject(mainMember).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        for (let i = 0; i < control.length; i++) {
          if (members[i].scRole == 'Ведущий научный сотрудник') {
            const role = {
              userId: members[i].userId,
              roleName: 'Leading_Researcher'
            };
            this._api.addRole(role).subscribe(
              res1 => {
                console.log(res1);
              },
              err => {
                console.log(err);
              }
            );
          } else if (members[i].scRole == 'Старший научный сотрудник') {
            const role = {
              userId: members[i].userId,
              roleName: 'Senior_Researcher'
            };
            this._api.addRole(role).subscribe(
              res1 => {
                console.log(res1);
              },
              err => {
                console.log(err);
              }
            );
          } else if (members[i].scRole == 'Младший научный сотрудник') {
            const role = {
              userId: members[i].userId,
              roleName: 'Junior_Researcher'
            };
            this._api.addRole(role).subscribe(
              res1 => {
                console.log(res1);
              },
              err => {
                console.log(err);
              }
            );
          }
          members[i].scId = res.scId;
          this._api.addMemberToProject(members[i]).subscribe(
            result => {
              console.log(result);
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.reloadProject = false;
      this.newProjForm.reset();
      this.newProjMemForm.reset();
      if (this.Teacher_Role == true) {
        this._api.getScienceProject().subscribe(
          res => {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
              res[i].scAgrDate = new Date(res[i].scAgrDate).getFullYear() + '-' + (new Date(res[i].scAgrDate).getMonth() + 1) + '-' + new Date(res[i].scAgrDate).getDate();
              res[i].scStDate = new Date(res[i].scStDate).getFullYear() + '-' + (new Date(res[i].scStDate).getMonth() + 1) + '-' + new Date(res[i].scStDate).getDate();
              res[i].scEndDate = new Date(res[i].scEndDate).getFullYear() + '-' + (new Date(res[i].scEndDate).getMonth() + 1) + '-' + new Date(res[i].scEndDate).getDate();
            }
            this.science_projects = res;
          },
          err => {
            console.log(err);
            this.Teacher_Role = false;
          }
        );
      }
      setTimeout(() => {
        this.reloadProject = true;
      }, 2000);
    }, 2000);
  }

  checkScProjManager() {
    if (this.ScProjectManager == true) {
      const allDates = [];
      for (let i = 0; i < this.science_projects.length; i++) {
        allDates.push(new Date(this.science_projects[i].scEndDate));
      }
      // console.log(allDates);
      let latest = allDates[0];
      for (let i = 1; i < allDates.length; i++) {
        if (latest < allDates[i]) {
          latest = allDates[i];
        }
      }
      const today = new Date();
      // console.log(today);
      latest.setDate(latest.getDate() + 1);
      // console.log(latest);
      // latest = new Date("2020-1-15 00:10:39");
      // console.log(latest);
      // let today = new Date("2020-1-15 00:10:41");
      // console.log(today);
      // console.log(latest.getTime());
      // console.log(today.getTime());
      // console.log(latest.getTime() < today.getTime());
      // console.log(today.getTime() - latest.getTime());
      // console.log((today.getTime() - latest.getTime() > 1000) && (today.getTime() - latest.getTime() < 3000));
      if ((today.getTime() - latest.getTime() > 1000) && (today.getTime() - latest.getTime() < 3000)) {
        this.getScienceManaged(this.IdToken);
        this.ScProjectManager = false;
      }
    }
  }

  onDissovet() {
    this.router.navigate(['/dissovet']);
  }

  sendPatent() {
    this.patentForm.patchValue({
      ptnt_file_kz: this.PatentLinkKz,
      ptnt_file_en: this.PatentLinkEn,
      ptnt_file_ru: this.PatentLinkRu,
      ptnt_file_name_ru: this.PatentFileRu.name,
      ptnt_file_name_kz: this.PatentFileKz.name,
      ptnt_file_name_en: this.PatentFileEn.name,
    });
    console.log(this.patentForm.value);
    this._api.addPatent(this.patentForm.value).subscribe(res => {
      console.log(res);
    }, error1 => {
      console.log(error1);
    });
    // console.log(this.PatentFile);
    // this._api.uploadPatentFile(this.PatentFile).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  setPatentStatus(patId, statusId) {
    const status = {
      ptnt_id: patId,
      ptnt_user_id: this.IdToken,
      ptnt_status_id: statusId,
    };

    this._api.setPatentStatus(status).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    setTimeout(() => {
      this.updateStatusPatent = true;
      const science_id = {
        ptnt_user_id: this.IdToken
      };
      this._api.getAllPatents(science_id).subscribe(
        res => {
          console.log(res);
          this.AllPatens = res;
        },
        err => {
          console.log(err);
        }
      );
      setTimeout(() => {
        this.updateStatusPatent = false;
      }, 1000);
    }, 1000);
  }

  onRUPatentFileChange(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    this.PatentFileRu = event.target.files[0];
  }

  onKZPatentFileChange(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    this.PatentFileKz = event.target.files[0];
  }

  onENPatentFileChange(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    this.PatentFileEn = event.target.files[0];
  }

  uploadFileRu() {
    console.log('12345');
    console.log(this.PatentFileRu);
    console.log(this.PatentFileKz);
    console.log(this.PatentFileEn);
    const formData = new FormData();
    let linkRu;
    formData.append('file', this.PatentFileRu);
    $.ajax({
      url: 'https://nir.iitu.kz:8443/saa-uploader/uploadPatentFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      async: false,
    }).done(function(data) {
      const obj = JSON.parse(data);
      console.log(obj);
      linkRu = obj.filePath;
    });
    this.PatentLinkRu = linkRu;
    let linkKZ;
    const formDataKZ = new FormData();
    formDataKZ.append('file', this.PatentFileKz);
    $.ajax({
      url: 'https://nir.iitu.kz:8443/saa-uploader/uploadPatentFile',
      type: 'POST',
      data: formDataKZ,
      processData: false,
      contentType: false,
      async: false,
    }).done(function(data) {
      const obj = JSON.parse(data);
      console.log(obj);
      linkKZ = obj.filePath;
    });
    this.PatentLinkKz = linkKZ;
    let linkEN;
    const formDataEN = new FormData();
    formDataEN.append('file', this.PatentFileEn);
    $.ajax({
      url: 'https://nir.iitu.kz:8443/saa-uploader/uploadPatentFile',
      type: 'POST',
      data: formDataEN,
      processData: false,
      contentType: false,
      async: false,
    }).done(function(data) {
      const obj = JSON.parse(data);
      console.log(obj);
      linkEN = obj.filePath;
    });
    this.PatentLinkEn = linkEN;

    console.log(this.PatentLinkRu);
  }


  downloadPatentFile(filePath) {
    const newBlob = new Blob([filePath], {type: 'application/octet-stream'});
    window.open(window.URL.createObjectURL(newBlob));
  }
}

