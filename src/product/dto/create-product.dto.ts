import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the product.',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the product',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the product.',
    minimum: 1,
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of the product.',
    minimum: 1,
  })
  quantity: number;
}
