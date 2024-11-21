import { EntityEventType } from '../../common/types/entity-event-type';
import { Activity } from './activity.entity';

/**
 * Event happen when an activity is added/modified/deleted in the system
 */
export class ActivityEvent {
  /**
   * Operation type
   */
  type: EntityEventType;

  /**
   * The activity object
   */
  activity: Activity;

  constructor(data: ActivityEvent) {
    this.type = data.type;
    this.activity = data.activity;
  }
}
