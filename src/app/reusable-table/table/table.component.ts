import { Component, SimpleChange, ChangeDetectionStrategy, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Globals } from '../../translator/class/globals.service';
import { TranslatorService } from '../../translator/service/translator.service';
import { PrintTableToPdfService } from '../services/print-table-to-pdf.service';
import { myDate, myToNumber } from '../../shared/functions'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() myStyle: Object;
  @Input() tableStructure: any;
  @Input() tableData: Array<any>;
  @Input() parent: any;
  isAdminUse = false;
  public Object = Object
  public showDivS = {};
  myPicketStyle = {
    label: {
      'width': '100%',
      // 'margin-top':'5px',
      // 'margin-bottom':'10px',
      'display': 'inline-block',
      'min-height': 'fit-content',
    },
    i: {
      'margin': '2px 5px'
    }
  }
  public sorted = "";
  public showPageBox = false;
  top: number;
  left: number;
  instance: TableComponent
  public tableShowData = []
  private tablePageData = []
  private tableRawData = []
  //adding new entry row to table:
  public myNewEntry: any
  public inputForm = false
  //paging:  
  private subscribtion: Subscription
  public hover = {}
  public hoverf = {}
  public buttons = []
  public goToThisPage: string | number;
  public page = 1;
  public rowsPerPage: number
  public lastpage = 1;
  //search object:
  public mysearch = {}
  //drag&drop:
  public move = 0;
  public elementDragable = {};
  public myDragedObject = {};
  //hidden rows for search and paging arrays:
  public rowIsHiddenS = [];
  public rowIsHiddenP = [];
  //govern if input or simple text displayed in table cell:
  public isHidden = {}
  colHeight = 40;
  language: string;
  constructor(public glob: Globals, public lang: TranslatorService, private change: ChangeDetectorRef, public print: PrintTableToPdfService) {
    this.instance = this
  }
  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe()
    }
  }
  ngOnInit() {
    const user = sessionStorage.getItem('userPermission');
    this.isAdminUse = user === 'admin';
    console.log(this.isAdminUse);
    this.subscribtion = this.lang.newLang.subscribe(data => {
      if (this.language != data) {
        this.language = data
        this.change.detach();
        this.change.detectChanges();
        this.change.reattach();
      }
    })
    this.calcRowsPerPage()

    this.setData();
    this.setSearch();
  }
  calcRowsPerPage() {
    let arr = document.getElementsByClassName('tableContainer2');
    let el = <HTMLElement>arr[(this.tableStructure['tablen'] - 1) || 0]
    el.style.setProperty('--rowheight', this.colHeight + 'px');
    // this.rowsPerPage=Math.floor((el['offsetHeight']-176)/this.colHeight)
    this.rowsPerPage = Math.floor((el['offsetHeight'] - (window.innerWidth * 6 / 100)) / this.colHeight)
    //  // console.log(this.rowsPerPage)
    this.rowsPerPage = this.rowsPerPage - 1;
    if (this.tableStructure.addEntry) {
      this.rowsPerPage = this.rowsPerPage - 2;
      if (this.rowsPerPage <= 0) {
        this.rowsPerPage = 1;
      }
    }

    if (this.rowsPerPage <= 0) {
      this.rowsPerPage = 1;
    }
  }
  onScroll(e) {
    //  // console.log(e.deltaY)
    e.preventDefault()
    e.stopPropagation()
    let newPage
    if (e.deltaY > 0 && this.page != this.lastpage) {
      newPage = this.page + 1;
      this.goToPage(newPage)
    }
    else if (this.page != 1) {
      newPage = this.page - 1;
      this.goToPage(newPage)
    }
  }
  newDateInput(e, field, calcId, index) {
    for (let i = 0; i < this.parent.tableData.length; i++) {
      if (this.parent.tableData[i]['cal_id'] == calcId) {
        this.parent.tableData[i][field] = e['date_from'] + '_' + e['date_to'];
        this.parent.tableData[i]['num_d'] = e['num_d'];
        this.tableRawData[i][field] = e['date_from'] + '_' + e['date_to'];
        this.tableRawData[i]['num_d'] = e['num_d'];
        this.tablePageData[index]['num_d'] = e['num_d'];
      }
    }
    for (let i = 0; i < this.tableShowData.length; i++) {
      if (this.tableShowData[i]['cal_id'] == calcId) {
        this.tableShowData[index]['num_d'] = e['num_d'];
      }
    }

  }
  newInput(e, field, i, row) {
    row[field] = e.target.value;
    if (this.tableStructure['inputAction']) {
      //  row=JSON.parse(JSON.stringify(this.parent[this.tableStructure['inputAction']](field, row)));
      this.parent[this.tableStructure['inputAction']](field, row);
    }
  }
  // printTableToPdf(tableData: any = [], tableStructure: any = {}, tableName: string = '',myStyle: any = {}, pdfStructure: any = {})
  printTable() {
    let tableStructure = JSON.parse(JSON.stringify(this.tableStructure))
    let tableShowData = JSON.parse(JSON.stringify(this.tableShowData))
    if (this.glob.language == 'Hebrew') {
      for (let i = 0; i < this.tableStructure.headers.length; i++) {
        tableStructure['aliaces'][tableStructure.headers[i]] = this.lang.getValue(tableStructure['aliaces'][tableStructure.headers[i]], this.glob.language).split(' ').reverse().join('\t').split('/').reverse().join('\t' + '/');
      }
    }
    for (let i = 0; i < tableShowData.length; i++) {
      let arr = Object.keys(tableShowData[i])
      for (let k = 0; k < arr.length; k++) {
        if (typeof (tableShowData[i][arr[k]]) == 'string') {
          let arr2 = tableShowData[i][arr[k]].split(' ');
          for (let s = 0; s < arr2.length; s++) {
            let position = arr2[s].search(/[\u0590-\u05FF]/);
            if (position >= 0) {
              arr2.reverse();
              break;
            }
          }
          tableShowData[i][arr[k]] = arr2.join('\t');
        }
      }
    }
    console.log(tableStructure['aliaces'])
    this.print.printTableToPdf(tableShowData, tableStructure);
  }
  //initial settings to display/hide rows 
  setData() { 
    this.myStyle['cell'] = this.myStyle['cell'] || [];
    this.myStyle['row'] = this.myStyle['row'] || [];
    this.tableStructure['searchType'] = this.tableStructure.searchType || {};
    this.tableStructure['selectAdd'] = this.tableStructure.selectAdd || {};
    this.tableStructure['dateAdd'] = this.tableStructure.dateAdd || {};
    this.tableStructure['addable'] = this.tableStructure.addable || {};
    this.tableStructure['rowsperpage'] = this.tableStructure.rowsperpage || this.rowsPerPage;
    this.tableStructure['colHeight'] = this.tableStructure.colHeight || this.colHeight;
    this.tableStructure['editable'] = this.tableStructure.editable || {};
    this.tableStructure['searchable'] = this.tableStructure.searchable || [];
    this.tableStructure['addEntry'] = this.tableStructure.addEntry || false;
    this.tableStructure['print'] = this.tableStructure.print || false;
    this.tableStructure['email'] = this.tableStructure.email || '';
    this.tableStructure['addEntryHandler'] = this.tableStructure.addEntryHandler || false;
    this.tableStructure['buttons'] = this.tableStructure.buttons || {};
    this.tableStructure['cellButtons'] = this.tableStructure.cellButtons || {};
    this.tableStructure['aliaces'] = this.tableStructure.aliaces || {};
    this.tableStructure['icon'] = this.tableStructure.icon || {};
    this.tableStructure['scroll'] = this.tableStructure.scroll || '';
    this.tableStructure['total'] = this.tableStructure.total || '';
    this.tableStructure['buttonIcon'] = this.tableStructure.buttonIcon || {};
    this.tableStructure['iconStyle'] = this.tableStructure.iconStyle || {};
    this.tableStructure['disabled'] = this.tableStructure.disabled || [];
    this.tableStructure['hidden'] = this.tableStructure.hidden || false;
    this.tableStructure['eclipsis'] = this.tableStructure.eclipsis || {};
    this.tableStructure['sortAs'] = this.tableStructure.sortAs || {};
    this.tableStructure['accent'] = this.tableStructure['accent'] || '';
    this.tableStructure['tableName'] = this.tableStructure['tableName'] || '';
    this.tableStructure['sort'] = this.tableStructure['sort'] || '';
    this.tableStructure['defaultClick'] = this.tableStructure['defaultClick'] || false;
    this.tableStructure['cancelClick'] = this.tableStructure['cancelClick'] || false;
    // if((this.tableStructure['buttons']['Edit']==undefined) && !(this.tableStructure['editable'].length==0)){
    //   this.tableStructure['buttons']['Edit']=true;
    // }
    let myHeaders = [];
 

    if (!this.tableStructure['addEntry']) {
      this.inputForm = false;
    }
    try {
      myHeaders = Object.keys(this.tableData[0]);
    }
    catch{ }
    try {
      this.buttons = Object.keys(this.tableStructure.buttons)
      for (let i = 0; i < this.buttons.length; i++) {
      
        this.hover[this.buttons[i]] = {};
      }
    }
    catch{ }
    this.tableStructure['headers'] = this.tableStructure.headers || myHeaders;
    for (let i = 0; i < this.tableStructure['headers'].length; i++) {
      this.hoverf[this.tableStructure['headers'][i]] = {};
    }
    this.tableRawData = JSON.parse(JSON.stringify(this.tableData))
    // console.log(4)
    this.setRowIsHidden();
    this.setAddEntryFields();
    this.setIsHidden();
    this.setAllDragable();
    this.rowsPerPage = this.tableStructure.rowsperpage || this.rowsPerPage;
    // this.setSearch();
    // this.setPaging();
  }
  setRowIsHidden() {
    
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.tableStructure.buttonIcon[this.buttons[i]]) {
        this.hover[this.buttons[i]] = {};
      }
    }
    for (let i = 0; i < this.tableStructure['headers'].length; i++) {
      this.hoverf[this.tableStructure['headers'][i]] = {};
    }
    // this.rowIsHiddenS=Array(this.tableData.length).fill(false);  
    // this.rowIsHiddenP=Array(this.tableData.length).fill(false);  
  }
  setIsHidden() {
    
    for (let i = 0; i < this.tableStructure.headers.length; i++) {
      this.isHidden[this.tableStructure.headers[i]] = [];
      for (let k = 0; k < this.tableStructure.rowsperpage; k++) {
        this.isHidden[this.tableStructure.headers[i]][k] = false;
      }
    }
  }
  //function that fire on data object change(only if reference is changed as we talk about objects)
  ngOnChanges(changes: { [propKey: string]: SimpleChanges }) {

    for (let propName in changes) {
      // ;
      switch (propName) {
        case 'tableData': {
          // this.tableStructure=JSON.parse(JSON.stringify(this.tableStructure))
          // console.log(1)
          this.setData();
          this.setRowIsHidden();
          this.searchImplement();
          // this.setIsHidden();
          break;
        }
        case 'tableStructure': {
          this.rowsPerPage = this.tableStructure.rowsperpage || this.rowsPerPage;
          this.setData();
          this.setSearch();
          // this.setRowIsHidden();
          // this.setIsHidden();
          this.setAllDragable();
          this.setAddEntryFields();
          window.requestAnimationFrame(function () {
            let input = document.getElementsByClassName('myInputForResize');
            for (let i = 0; i < input.length; i++) {
              // console.log(input[i])
              input[i].setAttribute('size', '' + input[i].getAttribute('placeholder').length);
            }
          })
          break;
        }
        case 'myStyle': {
          this.colHeight = this.myStyle['colHeight'] || this.colHeight;
          this.calcRowsPerPage()
          // this.setData();
          // this.rowsPerPage=this.tableStructure.rowsperpage;
          // this.setSearch();
          // this.setAllDragable();
          // this.setAddEntryFields();
          break;
        }
      }
    }
  }
  //menu buttons.Action that transfer button name and row number to parent
  buttonAction(cbutton, myEvent, row) {
    this.parent[this.tableStructure.buttons[cbutton]](cbutton, row);
  }
  cellButtonAction(field, myEvent, row) {
    // console.log(field);
    // console.log(myEvent.target.getAttribute("row"));
    if (this.tableStructure.cellButtons[field]) {
      this.parent[this.tableStructure.cellButtons[field]](field, row);
    }
  }

  //drag&drop
  setAllDragable() {
    // try{
    for (let i = 0; i < this.tableStructure.headers.length; i++) {
      this.elementDragable[this.tableStructure.headers[i]] = true;
    }
    // }
    // catch{}
  }
  // onDragBegin(myEvent:any){
  //   // this.myDragedObject={};
  //   // this.myColumnPosition=[];
  //   // this.myDragedObject['self']=myEvent;
  //   // let tempUp=myEvent.previousElementSibling;
  //   // let tempDown=myEvent.nextElementSibling;
  //   // let i=0;
  //   // let k=0;
  //   // this.myColumnPosition[0]=0;
  //   // for(let key in this.elementDragable){
  //     //   if(tempUp){
  //       //     this.myDragedObject['next'+i]=tempUp;
  //   //     this.myColumnPosition.push(tempUp.offsetWidth+this.myColumnPosition[this.myColumnPosition.length]);
  //   //     i++;
  //   //     tempUp=tempUp.previousElementSibling;
  //   //   }
  //   //   if(tempDown){
  //     // console.log(tempDown.offsetWidth);
  //     //     this.myDragedObject['previous'+k]=tempDown;
  //     //     let temp=tempDown.offsetWidth+this.myColumnPosition[0]*1;
  //     //     this.myColumnPosition.splice(0,0,temp);
  //     //     k++;
  //     //     tempDown=tempDown.nextElementSibling;
  //     //   }
  //     //   if(key!=myEvent.getAttribute("header")){
  //       //     this.elementDragable[key]=false;
  //   //   }
  //   // }
  //   // console.log(this.myDragedObject);
  //   // console.log(this.myColumnPosition);
  // }
  hoverOnIcon(value, index, button) {
    this.hover[button][index] = value;
  }
  hoverOnField(value, index, field) {
    try {
      this.hoverf[field][index] = value;
    } catch (e) {

    }
  }
  // onMoving(myEvent:any){
  //   let myMove=myEvent.x;
  //   if(myMove>0){
  //     for(let key in this.myDragedObject){

  //     }
  //   }
  //   else{
  //     for(let key in this.myDragedObject){

  //     }

  //   }
  //   // if(myMove>this.myDragedObject['width']){
  //     //     let temp=this.myColumnOrder[this.myDragedObject['name']];
  //     //     for(let key in this.myColumnOrder){
  //       //       if(this.myColumnOrder[key]==temp+1){
  //         //         // transform: translate(-50%, 0);
  //         //       }
  //         //     }
  //         // }
  //       }
  //paging
  pageNav(myEvent) {
    // console.log(myEvent)
    this.top = myEvent.clientY + 10;
    this.left = myEvent.clientX - 100;
  }
  setPaging() {

    // console.log(rows.length)
    // console.log(this.rowsPerPage)

    if (this.tableStructure['scroll']) {
      this.lastpage = Math.ceil(Number(this.tableStructure['total']) / this.rowsPerPage);
    } else {
      if ((this.tableShowData.length / this.rowsPerPage) % 1 == 0) {
        this.lastpage = Math.ceil(this.tableShowData.length / this.rowsPerPage);
        if (this.lastpage > 1) {
          console.log(this.lastpage)
          this.lastpage = this.lastpage - 2;
        }
      } else {
        this.lastpage = Math.ceil(this.tableShowData.length / this.rowsPerPage);
      }
    }
    if (this.page > this.lastpage) {
      this.page = this.lastpage;
    }
    this.goToPage(this.page);
  }
  goToPage(pagenum) {
    if (pagenum == (-1)) {
      // console.log(this.goToThisPage)
      if (!this.goToThisPage) {
        pagenum = this.page;
      }
      else {
        pagenum = Number(this.goToThisPage);
      }
    }
    if (pagenum < 1) {
      pagenum = 1;
    }
    else if (pagenum > this.lastpage) {
      pagenum = this.lastpage;
    }
    this.page = pagenum;
    let index = this.page * this.rowsPerPage - this.rowsPerPage;
    // let count=0;
    if (this.tableStructure['scroll']) {
      this.parent[this.tableStructure['scroll']](index, index + this.rowsPerPage)
    } else {
      this.tablePageData = this.tableShowData.slice(index, index + this.rowsPerPage)
    }
    this.goToThisPage = "";
    this.top = -1000;
    this.left = -1000;
  }
  //add new row entry to tableData functions
  setAddEntryFields() {
    this.myNewEntry = {};
    try {
      for (let i = 0; i < this.tableStructure.headers.length; i++) {
        this.myNewEntry[this.tableStructure.headers[i]] = "";
      }
    }
    catch{ };
  }
  addEntry() {
    if (this.tableStructure.addEntryHandler) {
      let result = this.parent[this.tableStructure.addEntryHandler](this.myNewEntry);
      switch (result) {
        case 0: {

          break;
        }
        case 1: {
          this.tableData.push(JSON.parse(JSON.stringify(this.myNewEntry)));
          for (let key of Object.keys(this.myNewEntry)) {
            this.myNewEntry[key] = "";
          };
          this.inputForm = !this.inputForm;
          this.setRowIsHidden();
          this.setIsHidden();
          this.searchImplement();
          this.setPaging();
          this.goToPage(this.lastpage);
          break;
        }
        case 2: {
          for (let key of Object.keys(this.myNewEntry)) {
            this.myNewEntry[key] = "";
          };
          this.inputForm = !this.inputForm;
          // this.tableStructure=JSON.parse(JSON.stringify(this.tableStructure))
          break;
        }
      }
    }
    else {
      this.tableData.push(JSON.parse(JSON.stringify(this.myNewEntry)));
      for (let key of Object.keys(this.myNewEntry)) {
        this.myNewEntry[key] = "";
      };
      this.inputForm = !this.inputForm;
      this.setRowIsHidden();
      this.setIsHidden();
      this.searchImplement();
      this.setPaging();
      this.goToPage(this.lastpage);
    }
  }
  newEntryUpdate(value, header) {
    // console.log(value)
    // console.log(header)
    // console.log(this.myNewEntry)
    this.myNewEntry[header] = "" + value;
  }
  //search functions
  setSearch() {
    let i = 0;
    try {
      for (i = 0; i < this.tableStructure.headers.length; i++) {
        this.mysearch[this.tableStructure.headers[i]] = "";
      }
    }
    catch{ }
    // console.log(this.mysearch)
  }
  searchUpdate(value, header) {
    this.mysearch[header] = "" + value;
    //  console.log(this.mysearch);
    this.searchImplement();
  }
  searchImplement() {


    let tableShowData = JSON.parse(JSON.stringify(this.tableRawData))
    let IsHidden = Array(this.tableRawData.length).fill(false);
    let i = 0;
    let k = 0;
    try {

      for (i = 0; i < this.tableStructure.searchable.length; i++) {
        // console.log(this.tableStructure.searchable)
        // console.log(this.mysearch)
        for (k = tableShowData.length - 1; k >= 0; k--) {
          if (!this.tableStructure.searchType[this.tableStructure.searchable[i]] && this.mysearch[this.tableStructure.searchable[i]] != '') {
            let temp = "" + tableShowData[k][this.tableStructure.searchable[i]];
            if (temp.toLowerCase().indexOf(this.mysearch[this.tableStructure.searchable[i]].toLowerCase()) == -1) {
              //  this.rowIsHiddenS[k]=true;
              tableShowData.splice(k, 1)
              IsHidden[k] = true;
            }
          }
          else if (this.tableStructure.searchType[this.tableStructure.searchable[i]] == 'greaterThen' && this.mysearch[this.tableStructure.searchable[i]] != '') {
            let temp2 = myToNumber(tableShowData[k][this.tableStructure.searchable[i]]);
            if (temp2 * 1 < this.mysearch[this.tableStructure.searchable[i]] * 1) {
              //  this.rowIsHiddenS[k]=true;
              tableShowData.splice(k, 1)
              IsHidden[k] = true;
            }
          }
          else if (this.tableStructure.searchType[this.tableStructure.searchable[i]] == 'lessThen' && this.mysearch[this.tableStructure.searchable[i]] != '') {
            let temp2 = myToNumber(tableShowData[k][this.tableStructure.searchable[i]]);
            if (!isNaN(this.mysearch[this.tableStructure.searchable[i]] * 1)) {
              if (1 * temp2 > this.mysearch[this.tableStructure.searchable[i]] * 1) {
                //  this.rowIsHiddenS[k]=true;
                tableShowData.splice(k, 1)
                IsHidden[k] = true;
              }
            }
          }
          else if (this.tableStructure.searchType[this.tableStructure.searchable[i]] == 'date' && this.mysearch[this.tableStructure.searchable[i]] != '') {
            let temp = "" + tableShowData[k][this.tableStructure.searchable[i]];
            let arr = temp.split('/');
            let found = false;
            for (let z = 0; z < arr.length; z++) {
              if (arr[z].toLowerCase().indexOf(this.mysearch[this.tableStructure.searchable[i]].toLowerCase()) == 0) {
                found = true;
              }
            }
            if (!found && arr.join('').toLowerCase().indexOf(this.mysearch[this.tableStructure.searchable[i]].toLowerCase()) != 0 && temp.toLowerCase().indexOf(this.mysearch[this.tableStructure.searchable[i]].toLowerCase()) != 0) {
              tableShowData.splice(k, 1)
              IsHidden[k] = true;
            }
          }
        }
      }
      if (this.tableStructure['hidden']) {
        this.parent[this.tableStructure['hidden']](IsHidden);
      }

      this.tableShowData = []
      this.tableShowData = JSON.parse(JSON.stringify(tableShowData))
      // console.log(this.tableShowData)
    }
    catch{
      this.tableShowData = []
      this.tableShowData = JSON.parse(JSON.stringify(tableShowData))
      if (this.tableStructure['hidden']) {
        this.parent[this.tableStructure['hidden']](IsHidden);
      }
    }
    this.setPaging();
  }
  clickOnRow(row) {
    if (this.tableStructure['defaultClick']) {
      this.parent[this.tableStructure['defaultClick']](row)
    }
    else if (this.tableStructure['cancelClick'] == false) {
      if (Object.keys(this.tableStructure.buttons).length) {
        this.buttonAction(Object.keys(this.tableStructure.buttons)[0], null, row)
      }
    }
  }
  //sort functions
  sortThisForMe(header, direction) {
    if (this.tableStructure['sort']) {
      this.parent[this.tableStructure['sort']](header, direction);
      this.showDivS[header] = !this.showDivS[header];
    } else {
      this.sortThis(header, direction)
    }
  }
  sortThis(header, direction) {
    if (this.sorted == header) {
      this.tableShowData.reverse();
      this.goToPage(this.page);
    }
    else {
      let type;
      for (let i = 0; i < this.tableShowData.length; i++) {
        if (this.tableShowData[i][header] != null && this.tableShowData[i][header] != undefined) {
          type = typeof (this.tableShowData[i][header])
          break;
        }
      }
      switch (type) {
        case "number":
          this.tableShowData.sort(function compare(a, b) {
            return a[header] - b[header];
          })
          break;
        case "string": {
          switch (this.tableStructure['sortAs'][header]) {
            case 'date': {
              this.tableShowData.sort(function compare(a, b) {
                if (a[header] == undefined || a[header] == null) {
                  return -1;
                }
                if (a[header] == 'Immediate') {
                  return 1
                }
                let ad = a[header].split(' ')[0].split('/')
                let bd = b[header].split(' ')[0].split('/')
                let ads = ad[2] + ad[0] + ad[1]
                let bds = bd[2] + bd[0] + bd[1]
                if (ads < bds) {
                  return -1;
                }
                return 1;
              })
              break;
            }
            case 'number': {
              this.tableShowData.sort(function compare(a, b) {
                let first = parseFloat(a[header]);
                let second = parseFloat(b[header]);
                if (isNaN(first)) {
                  return -1;
                }
                if (isNaN(second)) {
                  return 1;
                }
                return first - second;
              })
              break;
            }
            default: {
              this.tableShowData.sort(function compare(a, b) {
                if (a[header] == undefined || a[header] == null) {
                  return -1;
                } else {
                  if (a[header] < b[header])
                    return -1;
                  return 1;
                }
              })
            }
          }
          break;
        }
        // case "object":
        // break;
        default:
          this.tableShowData.sort(function compare(a, b) {
            if (a[header] == undefined || a[header] == null) {
              return -1;
            } else {
              if (a[header] < b[header])
                return -1;
              return 1;
            }
          })
      }
      if (direction < 0) {
        this.tableShowData.reverse();
      }
    }
    this.sorted = header;
    this.showDivS[header] = !this.showDivS[header];
    // this.searchImplement();
    this.goToPage(this.page);
  }
}