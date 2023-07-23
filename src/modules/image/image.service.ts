import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateImageReqDto } from './image.dto';
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

  async create(@Body() dto: CreateImageReqDto): Promise<Image> {
    // TODO: Refactor to prepend username to filename
    if (!(await this.s3Service.objectExists(dto.name))) {
      throw new BadRequestException(`File ${dto.name} does not exist`);
    }
    return this.imageRepository.save(dto);
  }

  softDelete(id: number): Promise<DeleteResult> {
    return this.imageRepository.softDelete(id);
  }

  restore(id: number): Promise<UpdateResult> {
    return this.imageRepository.restore(id);
  }

  async getSignedUploadUrl(filename: string) {
    // TODO: Refactor to prepend username to filename
    if (await this.s3Service.objectExists(filename)) {
      throw new ConflictException(`File ${filename} already exists`);
    }
    return this.s3Service.getSignedUploadUrl(filename);
  }

  getSignedDownloadUrl(filename: string) {
    // TODO: Refactor to prepend username to filename
    return this.s3Service.getSignedDownloadUrl(filename);
  }
}
