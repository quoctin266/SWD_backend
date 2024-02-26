import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export default new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^(video\/mp4|video\/webm|image\/jpeg|image\/png|text\/plain)$/, // allow .mp4, .webm, .jpg, .png and .txt,
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 30, // Max 30Mb,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
