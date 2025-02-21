import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { container } from "./dependency-injection";
import { IGetWeatherHandler } from "./features/getweather/get-weather-handler";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    //console.log("Event:", JSON.stringify(event, null, 2));

    var handler = container.get<IGetWeatherHandler>("IGetWeatherHandler");
    var city = event.queryStringParameters?.city || "Dublin";
    var weatherInCity = await handler.getWeather(city);

    return {
        statusCode: 200,
        body: weatherInCity,
    };
};
