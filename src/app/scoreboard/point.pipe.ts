import { Pipe, PipeTransform } from '@angular/core';

const name = ['0', '15', '30', '40'];

@Pipe({
  name: 'point'
})
export class PointPipe implements PipeTransform {

  transform(points: number, opponent: number): unknown {
    try {
      if (points < 4) {
        return name[points];
      } else if (points > opponent) {
        return 'A';
      } else if (points === opponent) {
        return 'D';
      } else {
        return '';
      }
    } catch (e) {
      return points;
    }
  }

}
