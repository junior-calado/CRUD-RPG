import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character, CharacterSchema } from './schemas/character.schema';
import { MagicalItemModule } from '../magical-item/magical-item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    forwardRef(() => MagicalItemModule),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService, MongooseModule],
})
export class CharacterModule {}