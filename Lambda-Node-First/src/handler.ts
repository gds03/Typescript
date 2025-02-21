import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { container } from "./dependency-injection";
import { IGetWeatherHandler } from "./features/getweather/get-weather-handler";
import { ILogger } from "./infrastructure/logger";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    var logger = container.get<ILogger>("ILogger");
    var handler = container.get<IGetWeatherHandler>("IGetWeatherHandler");

    var city = event.queryStringParameters?.city;
    if (!city) {
        logger.info("no city provided");

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Please provide a City. Format is: City, CountryCode. Example: Dublin, IE" })
        }
    }

    logger.info("finding out the weather now for " + city);
    var weatherInCity = await handler.getWeather(city);
    logger.info("the weather response is: " + weatherInCity);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: weatherInCity })
    };
};
