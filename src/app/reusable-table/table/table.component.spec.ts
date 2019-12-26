import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { TranslatorModule } from 'src/app/translator/translator.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectorRef, SimpleChange, SimpleChanges, DebugElement, Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonsService } from '../../services/commons.service';
import { Globals } from 'src/app/translator/class/globals.service';
import { TranslatorService } from 'src/app/translator/service/translator.service';
import { By } from '@angular/platform-browser';
@Component({
  selector: 'app-parent',
  template: '<div style="height:10px;"><app-table [parent]="instance" [tableStructure]="tableStructure" [tableData]="tableData" [myStyle]="myStyle"></app-table></div><div style="height:10px;"> <app-table  [parent]="instance" [tableStructure]="tableStructure2" [tableData]="tableData2" [myStyle]="myStyle2" ></app-table></div>'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
class myParent2 implements OnInit,AfterViewInit{

  button=''
  instance:myParent2;
  cellButton='';
  row: any;
  tableData=[]
  tableStructure={}
  myStyle={}
  tableData2=[]
  tableStructure2={addEntry:true}
  myStyle2={}
  constructor(){
    this.instance = this;
  }
  ngOnInit(){
    this.tableStructure2=JSON.parse(JSON.stringify(this.tableStructure2))
  }
  ngAfterViewInit(){
    this.tableStructure2=JSON.parse(JSON.stringify(this.tableStructure2))
  }
  buttonClick(buttonName,row){
     this.button = buttonName
  }
  cellButtonClick(buttonName,row){
     this.cellButton = buttonName
  }
  defaultClick(row){
     this.row = row
  }
  handleEntry(newEntry){
      return 0
  }
  handleEntry2(newEntry){
      return 1
  }
  handleEntry3(newEntry){
      return 2
  }
  sortThis(header,direction){
    this.tableData.sort(function compare(a,b) {
      if(a[header] == undefined || a[header] == null){
        return -1;
      }else{
        if (a[header] < b[header])
        return -1;
        return 1;
      }
    })
  }
}
class myParent {
  button=''
  instance:myParent;
  cellButton='';
  row: any;
  tableData=[]
  tableStructure={}
  myStyle={}
  constructor(){
    this.instance = this;
  }
  buttonClick(buttonName,row){
     this.button = buttonName
  }
  cellButtonClick(buttonName,row){
     this.cellButton = buttonName
  }
  defaultClick(row){
     this.row = row
  }
  handleEntry(newEntry){
      return 0
  }
  handleEntry2(newEntry){
      return 1
  }
  handleEntry3(newEntry){
      return 2
  }
  sortThis(header,direction){
    this.tableData.sort(function compare(a,b) {
      if(a[header] == undefined || a[header] == null){
        return -1;
      }else{
        if (a[header] < b[header])
        return -1;
        return 1;
      }
    })
  }
}

describe('TableComponent', () => {
  let tableEl: TableComponent;
  let fixture : ComponentFixture<TableComponent>;
  let fixture2 : ComponentFixture<myParent2>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslatorModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        TableComponent,myParent2
      ],
      providers: [
        ChangeDetectorRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
    tableEl = new TableComponent(cservice,gservice,tservice,dservice);
  }));
  afterEach(()=>{
    tableEl = null;
  });
  it('should create',() => {
      tableEl.myStyle =  {};
      tableEl.tableStructure = {};
      tableEl.tableData = [];
      tableEl.tableStructure['tablen']=1;
      expect(tableEl).toBeTruthy();
  });
  it('should detectChanges if language changed',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
      fixture = TestBed.createComponent(TableComponent);
      tableEl = fixture.componentInstance;
      tableEl.myStyle =  {};
      tableEl.tableStructure = {
        buttons:{
          'Edit':true
        }
      };
      tableEl.tableData = [];
      tableEl.ngOnInit();
      tservice.changeLanguage('French');
      tick(100);
      expect(tableEl.language).toMatch('French');
      tservice.changeLanguage('French');
      tick(100);
      expect(tableEl.language).toMatch('French');
  })));
  it('should fire onScroll() Funsction if table scrolled',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
      fixture = TestBed.createComponent(TableComponent);
      tableEl = fixture.componentInstance;
      tableEl.myStyle =  {};
      tableEl.tableStructure = {
        addEntry:true,
        editable:[
          'account_id'
        ],
        buttons:{
          // 'Edit':true
        },
        aliaces: {
          'account_id': "ID",
          'account_type': "Account Type",
          'first_name':'Name',
          'create_date_time': "Create Date",
          'verification_level': "Verification Level",
          'status': "Status"
          //'source_of_funds': "Source of Funds"
        },
        headers: [
            'account_id',
            'first_name',
            'account_type',
            'status',
            'verification_level',
            'create_date_time',
            //'source_of_funds',
  
          ]
      };
      tableEl.tableData = [
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
        { account_id:'123',
          first_name:'123',
          account_type:'123',
          status:'123',
          verification_level:'123',
          create_date_time:'123'},
    
      ];
      tableEl.rowsPerPage = 2;
      tableEl.ngOnInit();
      const container = fixture.debugElement.query(By.css('.myTable'));
      tableEl.page = 0;
      container.triggerEventHandler('wheel', {deltaY:100});
       tableEl.page = 2;
      container.triggerEventHandler('wheel', {deltaY:-100});
      tick(200);
      expect(tableEl.page == 1).toBeTruthy();
      tableEl.page = 1;
      container.triggerEventHandler('wheel', {deltaY:-100});
      tick(200);
      expect(tableEl.page == 1).toBeTruthy();
  })));
  it('should trigger changes on Input change',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
    fixture = TestBed.createComponent(TableComponent);
    tableEl = fixture.componentInstance;
    tableEl.myStyle =  {};
    tableEl.tableStructure = {
      addEntry:true,
      editable:[
        'account_id'
      ],
     
      buttons:{
        // 'Edit':true
      },
      aliaces: {
        'account_id': "ID",
        'account_type': "Account Type",
        'first_name':'Name',
        'create_date_time': "Create Date",
        'verification_level': "Verification Level",
        'status': "Status"
        //'source_of_funds': "Source of Funds"
      },
      headers: [
          'account_id',
          'first_name',
          'account_type',
          'status',
          'verification_level',
          'create_date_time',
          //'source_of_funds',

        ]
    };
    tableEl.tableData = [
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
  
    ];
    tableEl.rowsPerPage = 2;
    tableEl.ngOnInit();
    tableEl.tableData=[
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'},
      { account_id:'123',
        first_name:'123',
        account_type:'123',
        status:'123',
        verification_level:'123',
        create_date_time:'123'}
  
    ]
    tableEl.tableStructure = {
      addEntry:true,
      editable:[
        'account_id'
      ],
      searchable:[
        'account_id',
        'account_type',
        'first_name',
      ],
      rowsPerPage:1,
      buttons:{
        // 'Edit':true
      },
      aliaces: {
        'account_id': "ID",
        'account_type': "Account Type",
        'first_name':'Name',
        'create_date_time': "Create Date",
        'verification_level': "Verification Level",
        'status': "Status"
        //'source_of_funds': "Source of Funds"
      },
      headers: [
          'account_id',
          'first_name',
          'account_type',
          'status',
          'verification_level',
          'create_date_time',
          //'source_of_funds',

        ]
    };
    tableEl.myStyle = {
      colHeight:50
    }
    let k=new SimpleChange([],tableEl.tableData,true)
    let k2=new SimpleChange([],tableEl.tableStructure,true)
    let k3=new SimpleChange([],tableEl.myStyle,true)
    tableEl.ngOnChanges({
      'tableData' :({'tableData': k}) as SimpleChanges,
      'tableStructure' :({'tableStructure': k2}) as SimpleChanges,
      'myStyle' :({'myStyle': k3}) as SimpleChanges,
    })
    fixture.detectChanges();
    tick(300);
    expect(tableEl.rowsPerPage == 1).toBeTruthy();
})));
it('should trigger parent Function on Button click',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  let parent = new myParent()
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    buttonIcon:{
      FakeClick:true
    },
    buttons:{
       'FakeClick':'buttonClick'
    },
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},

  ];
  tableEl.parent = parent.instance
  tableEl.rowsPerPage = 2;
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.buttonAction('FakeClick','',{})
  tick(300);
  expect(parent.button == 'FakeClick').toBeTruthy();
})));
it('should trigger parent Function on cellButton click',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  let parent = new myParent()
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},

  ];
  tableEl.parent = parent.instance
  tableEl.rowsPerPage = 2;
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.cellButtonAction('account_id','',{})
  tick(300);
  expect(parent.cellButton == 'account_id').toBeTruthy();
  delete(tableEl.tableStructure.cellButtons)
  tableEl.ngOnInit()
  tableEl.cellButtonAction('account_id','',{})
})));
it('should update hover and hoverf object on hoverOnIcon or hoverOnField called',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    {account_id:122}
  ];
  
  tableEl.rowsPerPage = 2;
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.hoverOnIcon(true,0,'FakeClick')
  tableEl.hoverOnField(true,0,'account_id')
  tick(300);
  expect(tableEl.hover['FakeClick'][0] == true).toBeTruthy();
  expect(tableEl.hoverf['account_id'][0] == true).toBeTruthy();
})));
it('should update top and left on pageNav(e)',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    {account_id:122}
  ];
  
  tableEl.rowsPerPage = 2;
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.pageNav({clientX : 160,clientY : 50})
  tick(100);
  expect(tableEl.top == 60).toBeTruthy();
  expect(tableEl.left == 60).toBeTruthy();
})));
it('should update hover and hoverf object on hoverOnIcon or hoverOnField called',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'}

  ];
  
  tableEl.rowsPerPage = 2;
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.hoverOnIcon(true,0,'FakeClick')
  tableEl.hoverOnField(true,0,'account_id')
  tick(300);
  expect(tableEl.hover['FakeClick'][0] == true).toBeTruthy();
  expect(tableEl.hoverf['account_id'][0] == true).toBeTruthy();
})));
it('should update top and left on pageNav()',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    {account_id:122}
  ];
  tableEl.ngOnInit();
  fixture.detectChanges();
  tableEl.pageNav({clientX : 160,clientY : 50})
  tick(100);
  expect(tableEl.top == 60).toBeTruthy();
  expect(tableEl.left == 60).toBeTruthy();
})));
it('should update page on goToPage(p)',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'},
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'}
  ];
  
  // tableEl.rowsPerPage = 2;
  fixture.detectChanges();
  let k=new SimpleChange([],tableEl.tableData,true)
  let k2=new SimpleChange([],tableEl.tableStructure,true)
  let k3=new SimpleChange([],tableEl.myStyle,true)
  tableEl.ngOnChanges({
    'tableData' :({'tableData': k}) as SimpleChanges,
    'tableStructure' :({'tableStructure': k2}) as SimpleChanges,
    'myStyle' :({'myStyle': k3}) as SimpleChanges,
  })
  fixture.detectChanges();
  tick(400)
  tableEl.goToPage(0);
  expect(tableEl.page == 1).toBeTruthy();
  tableEl.goToThisPage = '2';
  tableEl.goToPage(-1);
  expect(tableEl.page == 2).toBeTruthy();
  tableEl.goToPage(-1);
  expect(tableEl.page == 2).toBeTruthy();
  tableEl.goToPage(4);
  expect(tableEl.page == 3).toBeTruthy();
  tableEl.tableData =  tableEl.tableData = [
    { account_id:'123',
      first_name:'123',
      account_type:'123',
      status:'123',
      verification_level:'123',
      create_date_time:'123'}]
      k=new SimpleChange([],tableEl.tableData,true)
      tableEl.ngOnChanges({
        'tableData' :({'tableData': k}) as SimpleChanges,
        'tableStructure' :({'tableStructure': k2}) as SimpleChanges,
        'myStyle' :({'myStyle': k3}) as SimpleChanges,
      })
      fixture.detectChanges();
      
})));
it('should emit new Entry to Parent and act on instructions from parent, or by itself if parent handler does not mentioned',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  let parent = new myParent()
  tableEl.parent = parent.instance
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    addEntry:true,
    editable:[
      'account_id'
    ],
    addEntryHandler:'handleEntry',
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        // 'first_name',
        // 'account_type',
        'status',
        // 'verification_level',
        // 'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
  ];
  tableEl.inputForm = true;
  fixture.detectChanges();

  //parent return 0, so nothing changes
  tableEl.newEntryUpdate(123,'account_id')
  tableEl.newEntryUpdate(2,'status')
  expect(tableEl.myNewEntry['account_id'] == '123').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '2').toBeTruthy();
  tableEl.addEntry();
  expect(tableEl.tableData.length == 0).toBeTruthy();
  expect(tableEl.myNewEntry['account_id'] == '123').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '2').toBeTruthy();

  //parent return 1, so form clears, and entry added
  tableEl.tableStructure.addEntryHandler='handleEntry2';
  tableEl.newEntryUpdate(123,'account_id')
  tableEl.newEntryUpdate(2,'status')
  expect(tableEl.myNewEntry['account_id'] == '123').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '2').toBeTruthy();
  tableEl.addEntry();
  expect(tableEl.tableData.length == 1).toBeTruthy();
  expect(tableEl.myNewEntry['account_id'] == '').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '').toBeTruthy();

  //parent return 2, so form clears, but entry not added
  tableEl.tableStructure.addEntryHandler='handleEntry3';
  tableEl.newEntryUpdate(123,'account_id')
  tableEl.newEntryUpdate(2,'status')
  expect(tableEl.myNewEntry['account_id'] == '123').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '2').toBeTruthy();
  tableEl.addEntry();
  expect(tableEl.tableData.length == 1).toBeTruthy();
  expect(tableEl.myNewEntry['account_id'] == '').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '').toBeTruthy();
  
  //table handle it, so form clears, and entry added
  tableEl.tableStructure.addEntryHandler='';
  tableEl.newEntryUpdate(123,'account_id')
  tableEl.newEntryUpdate(2,'status')
  expect(tableEl.myNewEntry['account_id'] == '123').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '2').toBeTruthy();
  tableEl.addEntry();
  expect(tableEl.tableData.length == 2).toBeTruthy();
  expect(tableEl.myNewEntry['account_id'] == '').toBeTruthy();
  expect(tableEl.myNewEntry['status'] == '').toBeTruthy();

  // tick(100)
})));
it('should update searchvalue on searchUpdate(value,header)',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    // addEntry:true,
    searchable:[
      'account_id',
      'verification_level',
      'account_type'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    searchType:{
      'account_type':'greaterThen',
      'verification_level':'lessThen',
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'133',
      first_name:'123',
      account_type:'1',
      status:'123',
      verification_level:'10',
      create_date_time:'123'},
    { account_id:'122',
      first_name:'123',
      account_type:'2',
      status:'123',
      verification_level:'20',
      create_date_time:'123'},
    { account_id:'125',
      first_name:'123',
      account_type:'3',
      status:'123',
      verification_level:'123',
      create_date_time:'123'}
  ];
  
  // tableEl.rowsPerPage = 2;
  // fixture.detectChanges();
  let k=new SimpleChange([],tableEl.tableData,true)
  let k2=new SimpleChange([],tableEl.tableStructure,true)
  let k3=new SimpleChange([],tableEl.myStyle,true)
  tableEl.ngOnChanges({
    'tableData' :({'tableData': k}) as SimpleChanges,
    'tableStructure' :({'tableStructure': k2}) as SimpleChanges,
    'myStyle' :({'myStyle': k3}) as SimpleChanges,
  })
  fixture.detectChanges();
  //tick(400)
  expect(tableEl.tableShowData.length == 3).toBeTruthy();
  tableEl.searchUpdate(12,'account_id');
  expect(tableEl.mysearch['account_id'] == '12').toBeTruthy();
  expect(tableEl.tableShowData.length == 2).toBeTruthy();
  tableEl.searchUpdate(122,'account_id');
  expect(tableEl.mysearch['account_id'] == '122').toBeTruthy();
  expect(tableEl.tableShowData.length == 1).toBeTruthy();
  tableEl.searchUpdate('','account_id');
  
  expect(tableEl.tableShowData.length == 3).toBeTruthy();
  tableEl.searchUpdate(2,'account_type');
  expect(tableEl.mysearch['account_type'] == '2').toBeTruthy();
  expect(tableEl.tableShowData.length == 2).toBeTruthy();
  tableEl.searchUpdate(1,'account_type');
  expect(tableEl.mysearch['account_type'] == '1').toBeTruthy();
  expect(tableEl.tableShowData.length == 3).toBeTruthy();
  tableEl.searchUpdate('','account_type');

  expect(tableEl.tableShowData.length == 3).toBeTruthy();
  tableEl.searchUpdate(122,'verification_level');
  expect(tableEl.mysearch['verification_level'] == '122').toBeTruthy();
  expect(tableEl.tableShowData.length == 2).toBeTruthy();
  tableEl.searchUpdate(1,'verification_level');
  expect(tableEl.mysearch['verification_level'] == '1').toBeTruthy();
  expect(tableEl.tableShowData.length == 0).toBeTruthy();
  delete(tableEl.mysearch['verification_level'])
  tableEl.searchUpdate('ad','verification_level');
  expect(tableEl.tableShowData.length == 3).toBeTruthy();
  delete(tableEl.tableStructure.searchable);
  tableEl.searchUpdate(1,'verification_level');
  expect(tableEl.tableShowData.length == 3).toBeTruthy();

})));
it('should makeClick on parent defaultClick when clickOnRow(row)',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  let parent = new myParent()
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    // addEntry:true,
    searchable:[
      'account_id',
      'verification_level',
      'account_type'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    searchType:{
      'account_type':'greaterThen',
      'verification_level':'lessThen',
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:'133',
      first_name:'123',
      account_type:'1',
      status:'123',
      verification_level:'10',
      create_date_time:'123'},
    { account_id:'122',
      first_name:'123',
      account_type:'2',
      status:'123',
      verification_level:'20',
      create_date_time:'123'},
    { account_id:'125',
      first_name:'123',
      account_type:'3',
      status:'123',
      verification_level:'123',
      create_date_time:'123'}
  ];
  
  tableEl.parent = parent.instance;
  tableEl.tableStructure['defaultClick'] = 'defaultClick';
  tableEl.clickOnRow({account_id:123})
  expect(parent.row['account_id'] == 123).toBeTruthy();

  delete(tableEl.tableStructure['defaultClick'])
  tableEl.tableStructure['cancelClick'] = false;
  parent.button=''
  tableEl.clickOnRow({account_id:123})
  expect(parent.button == 'FakeClick').toBeTruthy();

  tableEl.tableStructure['cancelClick'] = true;
  parent.button=''
  tableEl.clickOnRow({account_id:123})
  expect(parent.button == '').toBeTruthy();
  
  tableEl.tableStructure['cancelClick'] = false;
  tableEl.tableStructure.buttons={};
  tableEl.clickOnRow({account_id:123})
  expect(parent.button == '').toBeTruthy();
})));
it('should sort tableData when sortThisForMe(header,direction) called',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture = TestBed.createComponent(TableComponent);
  tableEl = fixture.componentInstance;
  let parent = new myParent()
  tableEl.myStyle =  {};
  tableEl.tableStructure = {
    // addEntry:true,
    searchable:[
      'account_id',
      'verification_level',
      'account_type'
    ],
    cellButtons:{
      'account_id':'cellButtonClick'
    },
    searchType:{
      'account_type':'greaterThen',
      'verification_level':'lessThen',
    },
    buttons:{
      'FakeClick':'buttonClick'
   },
   rowsPerPage:1,
    aliaces: {
      'account_id': "ID",
      'account_type': "Account Type",
      'first_name':'Name',
      'create_date_time': "Create Date",
      'verification_level': "Verification Level",
      'status': "Status"
      //'source_of_funds': "Source of Funds"
    },
    headers: [
        'account_id',
        'first_name',
        'account_type',
        'status',
        'verification_level',
        'create_date_time',
        //'source_of_funds',

      ]
  };
  tableEl.tableData = [
    { account_id:123,
      first_name:'Ar',
      account_type:'1',
      status:false,
      verification_level:'10',
      create_date_time:'02/18/2018 11:06:12'},
    { account_id:3,
      first_name:'Cr',
      account_type:'2',
      status:false,
      verification_level:'20',
      create_date_time:'06/17/2018 12:06:12'},
    { account_id:3,
      first_name:'Cr',
      account_type:'2',
      status:undefined,
      verification_level:'20',
      create_date_time:'06/19/2018 12:06:12'},
    { account_id:1,
      first_name:'Br',
      account_type:'2',
      status:true,
      verification_level:'20',
      create_date_time:undefined},
    { account_id:1,
      first_name:undefined,
      account_type:'2',
      status:true,
      verification_level:'20',
      create_date_time:'Immediate'},
  ];
  tableEl.parent = parent.instance;
  tableEl.ngOnInit()
  let k=new SimpleChange([],tableEl.tableData,true)
  let k2=new SimpleChange([],tableEl.tableStructure,true)
  let k3=new SimpleChange([],tableEl.myStyle,true)
  tableEl.ngOnChanges({
    'tableData' :({'tableData': k}) as SimpleChanges,
    'tableStructure' :({'tableStructure': k2}) as SimpleChanges,
    'myStyle' :({'myStyle': k3}) as SimpleChanges,
  })
  fixture.detectChanges();
  tableEl.searchUpdate('','verification_level');
  tableEl.tableStructure['sort'] = 'sortThis';
  tableEl.tableStructure['sortAs'] ={
    'create_date_time':'date'
  };

  parent.tableData=JSON.parse(JSON.stringify(tableEl.tableData))
  tableEl.sortThisForMe('account_id',1);
  expect(parent.tableData[0]['account_id'] == 1).toBeTruthy();

  delete(tableEl.tableStructure['sort'])
  tableEl.sortThisForMe('account_id',1);
  expect(tableEl.tableShowData[0]['account_id'] == 1).toBeTruthy();
  tableEl.sortThisForMe('account_id',-1);
  expect(tableEl.tableShowData[0]['account_id'] == 123).toBeTruthy();
  tableEl.sortThisForMe('create_date_time',-1);
  expect(tableEl.tableShowData[0]['create_date_time'] == 'Immediate').toBeTruthy();
  expect(tableEl.tableShowData[1]['create_date_time'] == '06/19/2018 12:06:12').toBeTruthy();
  tableEl.sortThisForMe('create_date_time',1);
  expect(tableEl.tableShowData[0]['create_date_time'] == undefined).toBeTruthy();
  expect(tableEl.tableShowData[1]['create_date_time'] == '02/18/2018 11:06:12').toBeTruthy();
  tableEl.sortThisForMe('first_name',1);
  expect(tableEl.tableShowData[0]['first_name'] == undefined).toBeTruthy();
  expect(tableEl.tableShowData[1]['first_name'] == 'Ar').toBeTruthy();
  tableEl.sortThisForMe('status',1);
  expect(tableEl.tableShowData[0]['status'] == undefined).toBeTruthy();
  expect(tableEl.tableShowData[1]['status'] == false).toBeTruthy();
})));
it('should sort tableData when sortThisForMe(header,direction) called',inject([CommonsService,TranslatorService,Globals,ChangeDetectorRef], fakeAsync( (cservice: CommonsService,tservice: TranslatorService,gservice: Globals,dservice: ChangeDetectorRef) => {
  fixture2 = TestBed.createComponent(myParent2);
  let pareEl = fixture2.componentInstance;
  fixture2.detectChanges()
  pareEl.ngOnInit()
  fixture2.detectChanges()
  pareEl.ngAfterViewInit()
  fixture2.detectChanges()
})));
});
