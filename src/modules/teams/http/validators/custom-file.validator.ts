import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CustomFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;  
    if (!file || file.mimetype !== 'image/png') {
      throw new HttpException({message: 'Only JPEG files are allowed'}, HttpStatus.BAD_REQUEST);
    }
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.originalname.toLowerCase().slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      throw new HttpException({message: 'Invalid MIME Type'}, HttpStatus.BAD_REQUEST);
        
    }
    const maxFileSizeInBytes = 5 * 1024 * 1024 * 1024; // 5GB
    console.log('File Size Limit:', maxFileSizeInBytes);
    if (file.size > maxFileSizeInBytes) {
      throw new HttpException({message: 'File Size Exceeds Limit'}, HttpStatus.BAD_REQUEST);     
    }

    return next.handle();
  }
}
