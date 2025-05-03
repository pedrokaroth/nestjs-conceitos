import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const [sender, receiver] = await Promise.all([
      this.usersService.findByid(createMessageDto.sender_id),
      this.usersService.findByid(createMessageDto.receiver_id),
    ]);

    await this.messageRepository.insert({
      sender: sender,
      receiver: receiver,
      content: createMessageDto.content,
    });

    return {
      message: 'Message sent successfully',
    };
  }

  async findAll() {
    return this.messageRepository.find({
      relations: ['sender', 'receiver'],
    });
  }

  findOne(id: number) {
    return this.messageRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (updateMessageDto.sender_id) {
      const sender = await this.usersService.findByid(
        updateMessageDto.sender_id,
      );

      message.sender = sender;
    }

    if (updateMessageDto.receiver_id) {
      const receiver = await this.usersService.findByid(
        updateMessageDto.receiver_id,
      );

      message.receiver = receiver;
    }

    if (updateMessageDto.content) {
      message.content = updateMessageDto.content;
    }

    await this.messageRepository.save(message);

    return {
      message: 'Message updated successfully',
    };
  }

  remove(id: number) {
    return this.messageRepository.delete({ id });
  }
}
