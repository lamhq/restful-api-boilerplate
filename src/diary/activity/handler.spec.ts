import { describe, expect, it } from '@jest/globals';
import { getActivities } from './handler';

describe('getActivities', () => {
  it('should return data', async () => {
    expect.assertions(1);
    await expect(getActivities()).resolves.toBeDefined();
  });
});
