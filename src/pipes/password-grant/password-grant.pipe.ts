import {
  Injectable,
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        'Validation failed: ' + (error?.message ?? 'Unknown error'),
      );
    }
    return value;
  }
}
