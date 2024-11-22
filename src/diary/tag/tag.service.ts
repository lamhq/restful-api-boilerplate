import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ActivityEvent } from '../activity/activity.event';
import { Tag } from './tag.entity';
import { EntityEventType } from '../../common/types/entity-event-type';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: MongoRepository<Tag>) {}

  @OnEvent('activity.*')
  async handleActivityChange(event: ActivityEvent): Promise<void> {
    if (
      event.type === EntityEventType.Created ||
      event.type === EntityEventType.Updated
    ) {
      await Promise.all(
        event.activity.tags.map(async (tag) => {
          await this.tagRepo.updateOne(
            { name: tag },
            { $set: { name: tag } },
            { upsert: true }
          );
        })
      );
    }
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepo.find({
      order: { name: 'ASC' },
    });
  }

  async findAllTagNames(): Promise<string[]> {
    const tags = await this.findAll();
    return tags.map((tag) => tag.name);
  }
}
