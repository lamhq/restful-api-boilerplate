import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectLiteral } from 'typeorm';
import { Activity, ActivityQuery } from './activity.entity';
import { ActivityEvent } from './activity.event';
import { AddActivityDto } from './dto/add-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { EntityEventType } from '../../common/types/entity-event-type';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activityRepo: MongoRepository<Activity>,
    private eventEmitter: EventEmitter2
  ) {}

  async add(dto: AddActivityDto): Promise<Activity> {
    const activity = new Activity({
      content: dto.content,
      time: new Date(dto.time),
      income: dto.income,
      outcome: dto.outcome,
      tags: dto.tags.map((tag) => tag.toLowerCase().trim()),
    });
    const saved = await this.activityRepo.save(activity);
    this.eventEmitter.emit(
      'activity.created',
      new ActivityEvent({
        type: EntityEventType.Created,
        activity: saved,
      })
    );
    return saved;
  }

  async update(activityId: string, dto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOneByIdOrFail(activityId);
    activity.content = dto.content;
    activity.time = new Date(dto.time);
    activity.income = dto.income;
    activity.outcome = dto.outcome;
    activity.tags = dto.tags.map((tag) => tag.toLowerCase().trim());
    await this.activityRepo.findOneAndUpdate({ _id: activity.id }, { $set: activity });

    this.eventEmitter.emit(
      'activity.updated',
      new ActivityEvent({
        type: EntityEventType.Updated,
        activity,
      })
    );
    return activity;
  }

  async findOneByIdOrFail(activityId: string): Promise<Activity> {
    const activity = await this.activityRepo.findOneBy(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return activity;
  }

  async remove(activityId: string): Promise<void> {
    const activity = await this.findOneByIdOrFail(activityId);
    this.eventEmitter.emit(
      'activity.removed',
      new ActivityEvent({
        type: EntityEventType.Removed,
        activity,
      })
    );
    await this.activityRepo.findOneAndDelete({ _id: new ObjectId(activityId) });
  }

  async findAll(query: ActivityQuery): Promise<[Activity[], number]> {
    type MongoFindManyOptions = Parameters<MongoRepository<Activity>['findAndCount']>[0];
    const filter: MongoFindManyOptions = {
      skip: query.offset,
      take: query.limit,
      withDeleted: false,
      order: {
        time: 'DESC',
      },
    };

    filter.where = {};

    if (query.text) {
      filter.where = {
        ...filter.where,
        $text: { $search: query.text },
      };
    }

    if (query.tags) {
      filter.where = {
        ...filter.where,
        tags: { $elemMatch: { $in: query.tags } },
      };
    }

    if (query.from || query.to) {
      const range: ObjectLiteral = {};
      if (query.from) {
        range.$gt = query.from;
      }
      if (query.to) {
        range.$lt = query.to;
      }
      filter.where = {
        ...filter.where,
        time: range,
      };
    }

    return this.activityRepo.findAndCount(filter);
  }
}
