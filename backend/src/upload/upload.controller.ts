import { Controller, Post, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadDriver = process.env.UPLOAD_DRIVER || 'local';
const localUploadPath = process.env.UPLOAD_LOCAL_PATH || './uploads';

if (!fs.existsSync(localUploadPath)) fs.mkdirSync(localUploadPath, { recursive: true });

function localStorage() {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, localUploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${uuidv4()}${ext}`);
    },
  });
}

function s3Storage() {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION;
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  return multerS3({
    s3: client as any,
    bucket,
    acl: 'public-read',
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${uuidv4()}${ext}`);
    },
  } as any);
}

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
    storage: uploadDriver === 's3' ? s3Storage() : localStorage()
  }))
  upload(@UploadedFiles() files: { images?: Express.Multer.File[] }, @Req() req) {
    const uploaded = [];
    if (!files || !files.images) return { urls: [] };
    for (const f of files.images) {
      const anyf: any = f;
      if (anyf.location) uploaded.push(anyf.location);
      else {
        const host = req.headers.host || 'localhost:3000';
        const url = `${req.protocol}://${host}/uploads/${anyf.filename}`;
        uploaded.push(url);
      }
    }
    return { urls: uploaded };
  }
}
