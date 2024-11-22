import { APIGatewayProxyResult } from 'aws-lambda';
import { getNestContext } from '../../context';
import { ActivityService } from './activity.service';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const getActivities = async (): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Call handler');
    const nestApp = await getNestContext();
    const activityService = nestApp.get(ActivityService);
    const [activities] = await activityService.findAll({ limit: 10 });
    return {
      statusCode: 200,
      body: JSON.stringify(activities),
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
