import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: User })
  @ApiOkResponse({
    description: `{success: true, message: 'Product updated successfully.' }`,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
