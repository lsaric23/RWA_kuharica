import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as multer from 'multer';
import { Express } from 'express';

dotenv.config();

const region = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

const client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: client,
    bucket: process.env.AWS_BUCKET_NAME || 'my-bucket',
    key: (req, file, cb) => {
      const fileName = uuidv4() + path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
});

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], { storage: upload.storage }))
  upload(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Req() req: any,
  ) {
    const uploaded: string[] = [];

    if (files.images) {
      for (const anyf of files.images) {
        const f = anyf as any;
        if (f.location) {
          uploaded.push(f.location);
        }
      }
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/example.jpg`;
    uploaded.push(url);

    return { uploaded };
  }
}