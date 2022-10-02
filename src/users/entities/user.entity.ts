import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: number;

  @ApiProperty({
    type: String,
    description: 'username of the user.',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}
