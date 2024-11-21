import { beforeEach, describe, expect, it } from '@jest/globals';
import { mock } from 'jest-mock-extended';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { ActivityService } from './activity.service';
import configFactory from '../../config';

describe('activityService', () => {
  let service: ActivityService;
  const eventEmitter = mock<EventEmitter2>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Activity]),
        TypeOrmModule.forRoot(configFactory().typeorm),
      ],
      providers: [
        ActivityService,
        {
          provide: EventEmitter2,
          useValue: eventEmitter,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    eventEmitter.emit.mockReset();
  });

  it('should be defined', () => {
    expect.assertions(1);
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return activities', async () => {
      expect.assertions(1);
      await expect(
        service.findAll({
          offset: 0,
          limit: 10,
        })
      ).resolves.toStrictEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              content: expect.any(String),
            }),
          ]),
          expect.any(Number),
        ])
      );
    });

    it('should return activities contain `text`', async () => {
      expect.assertions(1);

      const searchText = 'Sophismata';

      await expect(
        service.findAll({
          offset: 0,
          limit: 10,
          text: searchText,
        })
      ).resolves.toStrictEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              content: expect.stringContaining(searchText),
            }),
          ]),
          expect.any(Number),
        ])
      );
    });

    it('should return activities with tags', async () => {
      expect.assertions(1);

      const searchTag = 'dude';

      await expect(
        service.findAll({
          offset: 0,
          limit: 10,
          tags: [searchTag],
        })
      ).resolves.toStrictEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              tags: expect.arrayContaining([searchTag]),
            }),
          ]),
          expect.any(Number),
        ])
      );
    });
  });
});
