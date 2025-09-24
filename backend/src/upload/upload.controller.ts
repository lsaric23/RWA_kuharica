import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  uploadFiles(@UploadedFiles() files: { images?: Express.Multer.File[] }) {
    return {
      uploaded: files.images?.map(file => file.filename) || [],
    };
  }
}