import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'dayCount'
})
@Injectable()
export class DayCountPipe implements PipeTransform {
  transform(value: any=[],change): string {

    console.log(change)
    console.log(value)

    let total=0
    for(let i=0;i<value.length;i++){
      // console.log(value[i]['num_d'])
      if(value[i]['num_d'] && isNaN(value[i]['num_d']) == false){
        total+=value[i]['num_d']
      }
    }
    return ': '+total;
  }

}
