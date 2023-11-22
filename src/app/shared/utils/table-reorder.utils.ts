import { Injectable } from '@angular/core';
import { Rubric } from '../models/rubric';
import { Replay } from '../models/replay';

@Injectable({
  providedIn: 'root'
})

export class TableReorderUtils {

    areArraysEquals(arr1 : Rubric[]| Replay[], arr2: Rubric[]| Replay[]) : boolean {

        if(typeof(arr1) !== typeof(arr2)){
            return false;
        }



        const idsArray1 = arr1.map(obj => obj.id);
        const idsArray2 = arr2.map(obj => obj.id);
    
        for (let i = 0; i < idsArray1.length; i++) {
          if (idsArray1[i] !== idsArray2[i]) {
            return true;
          }
        }
      
        return false;
    }

    findDifferentIdsAndIndices(arr1 : Rubric[] | Replay[], arr2: Rubric[]| Replay[]) {
    
        const differingIds = [];

        for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
            if (arr1[i]?.id !== arr2[i]?.id) {
                differingIds.push({ index: i, id: arr2[i]?.id });
            }
        }
  
        return differingIds;
    }

}