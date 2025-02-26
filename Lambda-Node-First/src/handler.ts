import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { container } from "./dependency-injection";
import { GetWeatherHandlerRequest, IGetWeatherHandler } from "./features/getweather/get-weather-handler";
import { ILogger } from "./infrastructure/logger";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const logger = container.get<ILogger>("ILogger");
    const handler = container.get<IGetWeatherHandler>("IGetWeatherHandler");

    logger.info("Starting lambda invocation");


    const handlerRequest: GetWeatherHandlerRequest = 
    {
        username: event.queryStringParameters?.username!,
        cacheSeconds: Number(event.queryStringParameters?.cacheSeconds!),
        city: event.queryStringParameters?.city!
    };

    const weatherInCity = await handler.getWeatherAsync(handlerRequest);

    logger.info("Finishing lambda invocation");

    return {
        statusCode: 200,
        body: JSON.stringify({ message: weatherInCity })
    };
};
