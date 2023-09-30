import { ValueTransformer } from "typeorm";

export class DateMatchValidator implements ValueTransformer{
    to(value: number) {
        if(typeof value === 'number'){
            return new Date(value*1000)
        }
        return value
    }
    from(value: Date) {
        if (value instanceof Date) {
            return Math.floor(value.getTime() / 1000);
          }
          return value;
    }
}