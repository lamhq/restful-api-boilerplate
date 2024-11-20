import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity/activity.entity';
import { ActivityService } from './activity/activity.service';
import { Tag } from './tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Tag])],
  providers: [ActivityService],
})
export class DiaryModule {}
