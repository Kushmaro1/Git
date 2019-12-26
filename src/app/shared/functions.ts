   ///////////////useful functions///////////////////////
   export const myDate = function myDate(dStr) {
    if(dStr=="0000-00-00 00:00"){
      return "Immediate";
    }
    if (dStr) {
      let date = new Date(dStr);
      let seconds=date.getSeconds();
      let minuts=date.getMinutes();
      let hours=date.getHours();
      let d = ((date.getMonth()+1) > 9 ? (date.getMonth()+1) :'0'+(date.getMonth()+1))+'/'+(date.getDate() > 9 ? date.getDate() :'0'+date.getDate())+"/"+date.getFullYear()
      if(hours < 10){
        d=d+" 0"+hours;
      }
      else{
        d=d+" "+hours;
      }
      if(minuts < 10){
        d=d+":0"+minuts;
      }
      else{
        d=d+":"+minuts;
      }
      if(seconds != 0 ){
        if(seconds<10){
          d=d+":0"+seconds;
        }
        else{
          d=d+":"+seconds;
        }
      }
      return d;
    }
    return dStr;
  }

 export const myToNumber = function myToNumber(nStr) {
    if (nStr) {
      let myNumberArr = nStr.split(',');
      let myNumber = ''
      for (let i = 0; i < myNumberArr.length; i++) {
        myNumber = myNumber + myNumberArr[i];
      }
      if(myNumber == '' || isNaN(parseFloat(myNumber))){
        return 0;
      }
      return parseFloat(myNumber);
    }
    else {
      return 0;
    }
  }
  

 export const myForNumber = function myForNumber(num) {
    if (num) {
      let myNumberArr = ('' + num).split('.');
      if (myNumberArr.length == 2) {
             myNumberArr[1] = this.takeCareOfDecimal(myNumberArr[1])
             if(myNumberArr[1] == 'plusOne'){
                num = num + 1;
                let arr = ('' + num).split('.');
                myNumberArr[0] = arr[0];
                myNumberArr[1]=''
             }
      }
      let myarr = myNumberArr[0].split('');
      let myNumber = ''
      let counter = 0
      if (myarr[0] == '-') {
        myNumber = '-';
        myarr.splice(0, 1)
      }
      if (myarr.length > 3) {
        switch (myarr.length % 3) {
          case 0: {
            counter = 0;
            break;
          }
          case 1: {
            counter = 2;
            break;
          }
          case 2: {
            counter = 1;
            break;
          }
        }
      }

      for (let i = 0; i < myarr.length; i++) {
        if (counter == 2) {
          if (i == myarr.length - 1) {
            myNumber = myNumber + myarr[i]
          }
          else {
            myNumber = myNumber + myarr[i] + ',';
            counter = 0;
          }
        }
        else {
          myNumber = myNumber + myarr[i];
          counter++;
        }
      }
      if (myNumberArr.length == 2) {
     
        if(myNumberArr[1] == ''){
          return myNumber
        }
        return myNumber + '.' + myNumberArr[1];
      }
      else {
        return myNumber;
      }
    }
    else {
      return '0';
    }
  }

  export function uniq(a) {
    return Array.from(new Set(a));
  }
  export function  takeCareOfDecimal(myDecString:string){
    let str='';
    if(myDecString.length > 4){
      let val = '-1'
      let num = ''
      // let diffZero = 0
      let diffNine = 0
      // let startZero = 0
      let startNine = 0
      // let startZeroIndex = -1
      let startNineIndex = -1
      // let endZeroIndex = -1
      let endNineIndex = -1
      for(let i=0;i<myDecString.length;i++){
            if(myDecString.charAt(i) == val){
              endNineIndex = i+1;
              if((endNineIndex - startNineIndex ) > diffNine){
                  diffNine = (endNineIndex - startNineIndex );
                  startNine = startNineIndex;
                  num = val;
              }
            }
            else{
              val = myDecString.charAt(i); 
              startNineIndex = i;
              endNineIndex = -1;
            }
            // if(myDecString.charAt(i) == '0'){
            //   if(startZeroIndex == -1){
            //     startZeroIndex = i;
            //   }else{
            //     endZeroIndex = i;
            //     if((endZeroIndex- startZeroIndex ) > diffZero){
            //       diffZero =  (endZeroIndex- startZeroIndex );
            //       startZero = startZeroIndex;
            //     }
            //   }
            // }
            // else {
              
            //   startZeroIndex = -1
            //   endZeroIndex = -1
            // }
            // if(myDecString.charAt(i) == '9'){
            //   if(startNineIndex == -1){
            //     startNineIndex = i;
            //   }else{
            //     endNineIndex = i;
            //     if((endNineIndex - startNineIndex ) > diffNine){
            //       diffNine = (endNineIndex - startNineIndex );
            //       startNine = startNineIndex
            //     }
            //   }
            // }
            // else{
            //   startNineIndex = -1;
            //   endNineIndex = -1;
            // }
      }
      if(diffNine < 4){
        return myDecString;
      }
      if(diffNine > 4 && Number(num) > 4){
        if(startNine > 0){
          let k = startNine
          do {
            let n = Number(myDecString.charAt(k - 1)) + 1;
            if(n < 10){
              str = myDecString.slice(0,k - 1) + n;
              k=0;
            } 
            else{
              k--;
              if(k==0){
                return 'plusOne';
              }
            }
          } while (k>0);
        }
        else{
          return 'plusOne';
        }
      }
      if(diffNine > 3 && num == '0'){
        if(startNine > 0){
          str=myDecString.slice(0,startNine)
          return str;
        }
        else{
          return '';
        }
      }
      if(diffNine > 4 && Number(num) < 5){
        str=myDecString.slice(0,4);
        // if(startNine > 4){
        //   str=myDecString.slice(0,startNine + 1)
        // }
        // else{
          // str=Number('0.'+Number(myDecString)).toFixed(4);
        // }
      }
      // if(diffZero > 4){
      //   if(startZero > 0){
      //     str=myDecString.slice(0,startZero)
      //   }
      //   else{
      //     return '';
      //   }
      // }
    }
    else{
      return myDecString;
    }

    return str;
  }
export function getKeyByValue(map, value) {
    return Array.from(map.keys()).find(key => map.get(key) === value);
  }

export function getKeys(map) {
    return Array.from(map.keys());
  }

export function getValues(map) {
    return Array.from(map.values());
  }

export function compareDate(arr) {
    // console.log(arr)
    let arrDate1 = arr[0].split('-');
    let arrDate2 = arr[1].split('-');
    if (arrDate1[0] * 1 > arrDate2[0] * 1) {
      return [arr[1], arr[0]]
    }
    if (arrDate1[1] * 1 > arrDate2[1] * 1) {
      return [arr[1], arr[0]]
    }
    if (arrDate1[2] * 1 > arrDate2[2] * 1) {
      return [arr[1], arr[0]]
    }
    return arr;
  }
export function compareDateObject(arr){
    let d1=new Date(arr[0]).getTime();
    let d2=new Date(arr[1]).getTime();
    if(d1>d2){
      return [arr[1], arr[0]]
    }
    else{
      return arr;
    }
  }
export function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});

    return blob;
  }
