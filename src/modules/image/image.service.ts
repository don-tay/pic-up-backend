import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from '../s3/s3.service';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: ImageRepository,
    private readonly s3Service: S3Service,
  ) {}

  findAll() {
    return this.imageRepository.find();
  }

  getSignedUploadUrl(filename: string) {
    // TODO: Refactor to prepend username to filename
    return this.s3Service.getSignedUploadUrl(filename);
  }

  getSignedDownloadUrl(filename: string) {
    // TODO: Refactor to prepend username to filename
    return this.s3Service.getSignedDownloadUrl(filename);
  }
}
