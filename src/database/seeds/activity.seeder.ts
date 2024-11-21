import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Activity } from '../../diary/activity/activity.entity';
import { Tag } from '../../diary/tag/tag.entity';

export default class ActivitySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const activityFactory = factoryManager.get(Activity);

    // save activities
    const activities = await activityFactory.saveMany(200);

    // save tags
    const allTags = activities.reduce<string[]>(
      (previousValue, currentValue) => [...previousValue, ...currentValue.tags],
      []
    );
    const tags = [...new Set(allTags)];
    await Promise.all(
      tags.map((tag) => dataSource.getMongoRepository(Tag).save(new Tag({ name: tag })))
    );

    // create index on `activities` collection
    await dataSource.mongoManager.createCollectionIndex(Activity, {
      content: 'text',
      tags: 'text',
    });
  }
}
