import {
    UseInterceptors, 
    NestInterceptor, 
    ExecutionContext, 
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';





export function Serialize<T>(dto: ClassConstructor<T>){
    return UseInterceptors(new SerializerInterceptor(dto));
}


export class SerializerInterceptor<T> implements NestInterceptor {
    constructor(private dto: any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before request is handled by request handler

        return handler.handle().pipe(
            map((data: T) => {
                //Run something before data is sent out
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            }),
        );
    }
}