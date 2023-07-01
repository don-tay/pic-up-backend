import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateImageReqDto } from './image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Post()
  create(@Body() dto: CreateImageReqDto): Promise<Image> {
    return this.imageService.create(dto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number): Promise<DeleteResult> {
    return this.imageService.softDelete(id);
  }

  @Put(':id/restore')
  restore(@Param('id') id: number): Promise<UpdateResult> {
    return this.imageService.restore(id);
  }

  @Get('upload-url/:filename')
  getSignedUploadUrl(@Param('filename') filename: string): Promise<string> {
    return this.imageService.getSignedUploadUrl(filename);
  }

  @Get('download-url/:filename')
  getSigneddownloadUrl(@Param('filename') filename: string): Promise<string> {
    return this.imageService.getSignedDownloadUrl(filename);
  }
}
