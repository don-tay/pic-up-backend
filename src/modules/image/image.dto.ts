import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ImageMetadata } from './image.entity';

export class CreateImageReqDto {
  @IsString()
  @IsNotEmpty()
  imageKey: string;

  @ValidateNested()
  metadata: ImageMetadata;
}

export class GetObjKeyAndSignedUploadUrlResDto {
  objKey: string;
  url: string;
}
