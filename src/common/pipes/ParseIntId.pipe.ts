import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'param' && metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Validation failed. ${value} is not a number`,
      );
    }

    if (parsedValue < 0) {
      throw new BadRequestException(
        `Validation failed. ${value} is not a positive number`,
      );
    }

    return parsedValue;
  }
}
