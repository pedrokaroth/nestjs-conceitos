import { IsPositive, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsPositive()
  sender_id: number;

  @IsPositive()
  receiver_id: number;

  @IsString()
  content: string;
}
