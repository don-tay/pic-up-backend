import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService<
      {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_S3_BUCKET_NAME: string;
      },
      true
    >,
  ) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async getSignedUploadUrl(objectKey: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: objectKey,
    });
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });
    return url;
  }

  async getSignedDownloadUrl(objectKey: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: objectKey,
    });
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });
    return url;
  }
}
