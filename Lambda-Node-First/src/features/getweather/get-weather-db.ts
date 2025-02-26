import { DynamoDB } from "aws-sdk";

export interface GetWeatherDbEntry {
    username: string,
    updatedAt: string,

    feelLike: number,
    temp: number,
    humidity: number,
    wind: number
}

export interface IGetWeatherDb {
    getUsernameDataAsync(username: string): Promise<GetWeatherDbEntry | null>;
    saveUsernameDataAsync(request: GetWeatherDbEntry): Promise<void>;
}

export class GetWeatherDb implements IGetWeatherDb {
    static TableName = "Lambda-Node-First-Table";

    async getUsernameDataAsync(username: string): Promise<GetWeatherDbEntry | null> {
        var ddb = new DynamoDB.DocumentClient();

        const params = {
            TableName: GetWeatherDb.TableName,
            Key: { 
                username: username
            },
            
        };

        const response = await ddb.get(params).promise();
        if(!response.Item){
            return null
        }
        return {
            username: response.Item.username,
            updatedAt: response.Item.updatedAt,
            feelLike: response.Item.feelLike,
            temp: response.Item.temp,
            humidity: response.Item.humidity,
            wind: response.Item.wind, 
        } as GetWeatherDbEntry;
    }
    

    async saveUsernameDataAsync(request: GetWeatherDbEntry): Promise<void> {
        var ddb = new DynamoDB.DocumentClient();

        const params = {
            TableName: GetWeatherDb.TableName,
            Item:
            {
                username: request.username,
                updatedAt: request.updatedAt,

                feelLike: request.feelLike,
                temp: request.temp,
                humidity: request.humidity,
                wind: request.wind
            }
        };
       
        await ddb.put(params).promise();       
    }
}