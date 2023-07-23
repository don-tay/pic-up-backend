import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import {
  CreateImageReqDto,
  GetObjKeyAndSignedUploadUrlResDto,
} from './image.dto';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: ImageRepository,
    private readonly s3Service: S3Service,
  ) {}

  private async buildImageObjectKey(fileName: string) {
    // TODO: Refactor to prepend username to fileName
    const { uuidv7 } = await import('uuidv7');
    return `${uuidv7()}-${fileName}`;
  }

  findAll() {
    return this.imageRepository.find();
  }

  async create(@Body() dto: CreateImageReqDto): Promise<Image> {
    if (!(await this.s3Service.objectExists(dto.imageKey))) {
      throw new BadRequestException(`File ${dto.imageKey} does not exist`);
    }
    return this.imageRepository.save(dto);
  }

  softDelete(id: number): Promise<DeleteResult> {
    return this.imageRepository.softDelete(id);
  }

  restore(id: number): Promise<UpdateResult> {
    return this.imageRepository.restore(id);
  }

  async getObjKeyAndSignedUploadUrl(
    fileName: string,
  ): Promise<GetObjKeyAndSignedUploadUrlResDto> {
    const objKey = await this.buildImageObjectKey(fileName);
    if (await this.s3Service.objectExists(objKey)) {
      throw new ConflictException(`File ${objKey} already exists`);
    }
    return { objKey, url: await this.s3Service.getSignedUploadUrl(objKey) };
  }

  getSignedDownloadUrl(objKey: string) {
    return this.s3Service.getSignedDownloadUrl(objKey);
  }
}
