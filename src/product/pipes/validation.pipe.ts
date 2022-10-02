import { PipeTransform, BadRequestException } from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';

import { ProductSchema } from '../dto/product.dto';

export class CreateProductValidatorPipe
  implements PipeTransform<CreateProductDto>
{
  public transform(value: CreateProductDto): CreateProductDto {
    const result = ProductSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
