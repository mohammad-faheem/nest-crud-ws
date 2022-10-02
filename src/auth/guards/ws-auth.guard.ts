import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
        const client: Socket = context.switchToWs().getClient<Socket>();
        let authorization = client.handshake.headers.authorization;

        if (!authorization)
            throw new WsException('Bearer token required.');

        const bearerToken: string = authorization.split(' ')[1];
        const decoded = await this.jwtService.verifyAsync(bearerToken, {
            secret: process.env.JWT_SECRET,
        });

        return decoded;
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}
