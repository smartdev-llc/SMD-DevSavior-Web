import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Pipe({
  name: 'photoURLConverter'
})
export class PhotoURLConverterPipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      return this.fixUrl(value);
    } else {
      return value;
    }
    
  }

  private fixUrl(url: string) {
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }

}
