import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicalItemController } from './magical-item.controller';
import { MagicalItemService } from './magical-item.service';
import { MagicalItem, MagicalItemSchema } from './schemas/magical-item.schema';
import { CharacterModule } from '../character/character.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MagicalItem.name, schema: MagicalItemSchema },
    ]),
    forwardRef(() => CharacterModule),
  ],
  controllers: [MagicalItemController],
  providers: [MagicalItemService],
  exports: [MagicalItemService],
})
export class MagicalItemModule {}