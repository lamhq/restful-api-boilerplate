import { APIGatewayProxyResult } from 'aws-lambda';
import { getNestContext } from '../../context';
import { TagService } from './tag.service';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const getTags = async (): Promise<APIGatewayProxyResult> => {
  try {
    const nestApp = await getNestContext();
    const tagService = await nestApp.resolve(TagService);
    const tags = await tagService.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(tags),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
