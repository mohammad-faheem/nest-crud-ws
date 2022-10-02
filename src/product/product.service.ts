import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'First product',
      description: '1st product description',
      price: 22.5,
      quantity: 10,
    },
    {
      id: '2',
      name: 'Second product',
      description: '2nd product description',
      price: 50.55,
      quantity: 5,
    },
    {
      id: '3',
      name: 'Third product',
      description: '3rd product description',
      price: 212,
      quantity: 100,
    },
    {
      id: '4',
      name: 'Fourth product',
      description: '4th product description',
      price: 220,
      quantity: 10,
    },
    {
      id: '5',
      name: 'Fifth product',
      description: '5th product description',
      price: 100,
      quantity: 110,
    },
  ];

  async create(
    createProductDto: CreateProductDto,
  ): Promise<Record<string, unknown>> {
    const id: string = uuid();
    createProductDto.id = id;

    const product = this.products.push(createProductDto);
    if (!product) {
      throw new NotAcceptableException(`Product not created`);
    }
    return {
      success: true,
      message: `Product added successfully.`,
    };
  }

  async findAll(): Promise<Product[]> {
    const products = this.products;
    if (this.products.length <= 0) {
      throw new NotFoundException('No record(s) found!');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = this.products.find((product) => {
      return product.id == id;
    });
    if (!product) {
      throw new NotFoundException('No record(s) found!');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((product) => {
      return product.id == id;
    });
    if (index === -1) {
      throw new NotFoundException('No record(s) found!');
    }
    updateProductDto.id = id;
    this.products[index] = updateProductDto;
    return {
      success: true,
      message: `Product updated successfully.`,
    };
  }

  async remove(id: string): Promise<Record<string, unknown>> {
    let isDeleted = false;
    this.products = this.products.filter((product) => {
      if (product.id !== id) {
        return product;
      }
      isDeleted = true;
    });
    if (!isDeleted) {
      throw new NotFoundException('No record(s) found!');
    }
    return {
      success: true,
      message: `Product deleted successfully.`,
    };
  }
}
