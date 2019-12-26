import { Injectable } from '@angular/core';
import pdfFonts from '../../../assets/js/vfs_fonts.js';
import pdfMake from '../../../assets/js/pdfmake.min.js';
import {myDate} from '../../shared/functions'
// import { CommonsService } from '../shared/services/commons.service.js';
@Injectable({
  providedIn: 'root'
})
export class PrintTableToPdfService {
  table = [];
  fields = [];
  tableHeaderRows = 0;
  createdBy=' by Yosi';
  first = true;
  width: any;
  constructor(  
    // public cs: CommonsService
    ) { }
    // public tableStructure2 = {
    //   searchable:[
    //     'curr1',
    //     'curr2',
    //     'totalTurnover',
    //     'totalPL',
    //   ],
    //   eclipsis:{
    //     'curr1':true,
    //     'curr2':true,
    //     'totalTurnover':true,
    //     'totalPL':true,
    //   },
    //   aliaces: {
    //     'totalPL': 'Total P/L(USD)',
    //     'totalTurnover': 'Total Turnover(USD)',
    //     'curr1': 'Currency 1',
    //     'curr2': 'Currency 2',
    //     'total': 'Arbitrage Total Count',
    //     'oppositeExchanges': 'Opposite Exchanges',
    //     'buyExchenge': 'Buy Exchange',
    //     'sellExchenge': 'Sell Exchange',
    //   },
    //   headers: [
    //     'curr1',
    //     'curr2',
    //     'totalTurnover',
    //     'totalPL',
    //     'total',
    //     'oppositeExchanges',
    //     'buyExchenge',  
    //     'sellExchenge',  
    //   ]
    // };
  printTableToPdf(tableData: any = [], tableStructure: any = {}, tableName: string = '',myStyle: any = {}, pdfStructure: any = {}){
    // let fields = Object.keys(tableStructure.aliaces);
    this.buildHeaders(tableStructure, pdfStructure);
    this.buildBody(tableData, tableStructure, pdfStructure);
    this.buildPdfStyle(tableStructure, myStyle, pdfStructure)
    this.buildPdf(pdfStructure, tableName, myStyle);
    // build headers
    //   
    //   let d0=this.dateArray[0].split('-');
    //   let d1=this.dateArray[1].split('-');
    //   this.executions.push([{
    //     text: 'Period: ' + d0[1]+'-'+d0[2]+'-'+d0[0] + ' - ' + d1[1]+'-'+d1[2]+'-'+d1[0],
    //     style: 'anotherStyle',
    //     colSpan: 8,
    //     alignment: 'center'
    //   }, {}, {}, {}, {}, {}, {}, {}])
    //   this.executions.push([
    //     {
    //       text: 'Created At',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'B/S',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Symbol',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Description',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Amount',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Price',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Fee',
    //       style: 'anotherStyle'
    //     },
    //     {
    //       text: 'Net Value',
    //       style: 'anotherStyle'
    //     }
    //   ]);
 
  }
  buildHeaders(tableStructure: any = {}, pdfStructure: any = {}){
          // [{
      //     text: 'Period: ' + d0[1]+'-'+d0[2]+'-'+d0[0] + ' - ' + d1[1]+'-'+d1[2]+'-'+d1[0],
      //     style: 'anotherStyle',
      //     colSpan: 8,
      //     alignment: 'center'
      //   }, {}, {}, {}, {}, {}, {}, {}]

    //headers of table print  
    tableStructure['headers'] = tableStructure.headers || [];
    this.tableHeaderRows++;
    let arr =[]
    for(let i=0;i<tableStructure.headers.length;i++){
      let textEntry = tableStructure['aliaces'][tableStructure.headers[i]] || tableStructure.headers[i];
      arr.push({
              text: textEntry,
              style: 'anotherStyle'
      })
    }
    this.table.push(arr)
  }
  buildBody(tableData: any = [], tableStructure: any = {}, pdfStructure: any = {}){
    for(let i=0;i<tableData.length;i++){
        let arr = [];
        for(let k=0;k<tableStructure.headers.length;k++){
          if(tableData[i][tableStructure.headers[k]] != undefined && tableData[i][tableStructure.headers[k]] != null){
            arr.push({
              text: ""+tableData[i][tableStructure.headers[k]],
              style: 'anotherStyle'
            })
          }else{
            arr.push({
              text: "",
              style: 'anotherStyle'
            })
          }
        }
        this.table.push(arr)
    }
    let total = [];
    total.push({
    text: 'Total: ' + (this.table.length - this.tableHeaderRows),
    style: 'anotherStyle',
    colSpan: tableStructure.headers.length,
    alignment: 'center'
    });
    for(let i=1;i<tableStructure.headers.length;i++){
        total.push({})
    }
    this.table.push(total)
    if(this.table.length < this.tableHeaderRows + 1){
        total[0] = {};
        total[0] = {
          text: 'No Data Available',
          style: 'anotherStyle',
          colSpan: tableStructure.headers.length,
          alignment: 'center'
        }
        this.table.push(total)
    }
    console.log(this.table) 
  }
  buildPdfStyle(tableStructure: any = {}, myStyle: any = {}, pdfStructure: any = {}){
     // [80, 'auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto']
     pdfStructure['width'] =  pdfStructure['width'] || []
     this.width = [];
     if(pdfStructure['width'].length &&  pdfStructure['width'].length ==  tableStructure.headers.length){
        this.width = JSON.parse(JSON.stringify(pdfStructure['width']));
        return;
     }
     if(pdfStructure['widthAuto']){
        for(let i=0;i<tableStructure.headers.length;i++){
          this.width.push('auto');
        }
        return;
     }
    //  if(pdfStructure['widthStar']){
      for(let i=0;i<tableStructure.headers.length;i++){
        this.width.push('auto');
      }
        // return;
    //  }
    //  if(pdfStructure['widthSame']){
    //     for(let i=1;i<tableStructure.headers.length;i++){
    //       this.width.push('*');
    //     }
    //     return;
    //  }

  }
  buildPdf(pdfStructure, tableName, myStyle: any = {}){
  //   pdfMake.fonts = {
  //     Hebrew: {
  //         normal: 'HEBREW.TTF',
  //         bold: 'HEBREW.TTF',
  //         italics: 'HEBREW.TTF',
  //         bolditalics: 'HEBREW.TTF'
  //     }
  // }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      Roboto: {
              normal: 'Arimo-Regular.ttf',
              bold: 'Arimo-Bold.ttf',
              italics: 'Arimo-Italic.ttf',
              bolditalics: 'Arimo-BoldItalic.ttf'
      }
   };
    let myD = new Date();
    let d = myDate(myD.toISOString());
    let d2 = myD.toString();
    let dayOffset = myD.getTimezoneOffset() / -60;
    let dayOffset2 = (dayOffset < 10 ) ? 'GMT+0'+dayOffset+'00':'GMT+'+dayOffset+'00';
    // let helper = this.helperName
    // let dataURL = this.gs.myPNGdata.get('logo')
    // this.makePic();
    let createdBy = this.createdBy;
    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return [{
          text: currentPage.toString() + ' of ' + pageCount,
          alignment: 'center'
        }, {
          text: '' ,
          style: 'anotherStyle',
          margin: [35, 0, 0, 0],
        }]
      },
      header: function (currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element
        return [
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ['*', 200],
              heights: [40],
              body: [
                [ {
                   text: '',
                  // image: dataURL, // 
                  width: 100,
                  // text: 'Created by BitZonex',
                  // style: 'picStyle',
                  margin: [35, 10, 0, 0],
                  border: [false, false, false, false],
                },
                {
                  // text: 'Created by ' + helper + '   ',
                  // image: dataURL, // 
                  // width: 18,
                  // style: 'tableHeader2',
                  text: 'Created At: ' + d +' '+ dayOffset2 + createdBy,
                  style: 'anotherStyle2',
                  margin: [0, 10, 35, 0],
                  border: [false, false, false, false],
                },
                ]
              ]
            },
          },
          {
            canvas: [{
              type: 'rect',
              x: 170,
              y: 32,
              w: pageSize.width - 170,
              h: 40
            }]
          }
        ]
      },
      content: [{

      },
      ]
    }   
    if(!pdfStructure['pageSize'])  {
      docDefinition['pageSize'] = 'A4'
    }
    if(!pdfStructure['pageOrientation']){
      docDefinition['pageOrientation'] = 'landscape'
    }
    if(tableName){
      let header = {}; 
      header={
        // style: 'tableExample',
        table: {
          
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [70, '*'],
          heights: [60],
          body: [
            [{
              text: tableName,
              colSpan: 2,
              style: 'tableHeader2',
              border: [true, true, true, true],
              alignment: 'center'
            }, {}]
          ]
        },
      }
      if(this.first){
        this.first = false;
      }else{
        header['pageBreak'] = 'before';
      }
      docDefinition.content.push(header);
    }

    let myObj = this.buildTable();
    docDefinition.content.push(myObj);
      docDefinition['styles'] = {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 5, 0, 5]
        },
        headerN: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: false,
          margin: [0, 5, 0, 5]
        },
        anotherStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        anotherStyleCenter: {
          border: [true, true, true, true],
          color: 'black',
          fontSize: 8,
          alignment: 'center',
        },
        anotherStyle2: {
          fontSize: 8,
          alignment: 'right',
          margin: [10, 0, 10, 0]
        },
        logoStyle: {
          // fontSize: 8,
          alignment: 'left',
          margin: [1, 1, 1, 1]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableHeader2: {
          border: [true, true, true, true],
          bold: true,
          fontSize: 13,
          color: 'black',
          margin: [0, 20, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
      console.log(docDefinition)
      this.readyForNextPrint();
      pdfMake.createPdf(docDefinition).open();  
  }
  buildTable() {
    let myT = {}
    myT = {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: this.tableHeaderRows,
        widths:this.width,
        body: this.table
      },
    }   
    return myT;
  }
  readyForNextPrint(){
    this.first = true;
    this.tableHeaderRows = 0;
    this.table = [];
    this.fields = [];
  }
}
