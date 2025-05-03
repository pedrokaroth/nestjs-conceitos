import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
