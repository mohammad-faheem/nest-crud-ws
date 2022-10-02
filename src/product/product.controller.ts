import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductValidatorPipe } from './pipes/validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller('product')
@UseGuards(JwtAuthGuard)
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOkResponse({
    description: `{success: true, message: 'Product added successfully.' }`,
  })
  @ApiNotFoundResponse({ description: 'Product not created' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiBody({ type: CreateProductDto })
  create(
    @Body(new CreateProductValidatorPipe()) createProductDto: CreateProductDto,
  ) {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  @ApiOkResponse({ description: `Return products list.` })
  @ApiNotFoundResponse({ description: 'No record(s) found!' })
  findAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: `Returns single product.` })
  @ApiNotFoundResponse({ description: 'No record(s) found!' })
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    description: `{success: true, message: 'Product updated successfully.' }`,
  })
  @ApiNotFoundResponse({ description: 'No record(s) found!' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(
    @Param('id') id: string,
    @Body(new CreateProductValidatorPipe()) updateProductDto: UpdateProductDto,
  ) {
    try {
      return this.productService.update(id, updateProductDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: `{success: true, message: 'Product deleted successfully.' }`,
  })
  @ApiNotFoundResponse({ description: 'No record(s) found!' })
  remove(@Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
