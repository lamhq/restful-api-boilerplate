import { describe, expect, it } from '@jest/globals';
import { APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from './get-data';

describe('get-data function handler', function () {
  it('run success', async () => {
    expect.assertions(1);

    const result: APIGatewayProxyResult = await lambdaHandler();

    expect(result.statusCode).toBe(200);
  });
});
