import { Controller, Get, Param } from '@nestjs/common';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
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
