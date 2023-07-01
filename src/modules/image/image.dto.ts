import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUrl, ValidateIf, ValidateNested } from 'class-validator';
import { Image, ImageMetadata } from './image.entity';

export class CreateImageReqDto {
  @IsUrl()
  url: string;

  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @ValidateNested()
  metadata: ImageMetadata | null;
}

export class UpdateImageReqDto extends PickType(Image, [
  'url',
  'name',
  'metadata',
  'deletedAt',
]) {}
