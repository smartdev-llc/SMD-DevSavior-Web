import { Pipe } from "@angular/core";
import { invalid } from "moment";


@Pipe({name: 'singularPluralPipe'})
export class SingularPluralPipe {
    transform(intValue: number, text: string) { 
        const plural = intValue > 1 ? 's' : '';
            return `${intValue} ${text}${plural}`
    } 
}