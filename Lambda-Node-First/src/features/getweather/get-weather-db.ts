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
    private static readonly TableName = "Lambda-Node-First-Table";
    private readonly _ddbFactory = () => new DynamoDB.DocumentClient();

    public async getUsernameDataAsync(username: string): Promise<GetWeatherDbEntry | null> {
        const params = {
            TableName: GetWeatherDb.TableName,
            Key: { 
                username: username
            },
            
        };

        const response = await this._ddbFactory().get(params).promise();
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
    

    public async saveUsernameDataAsync(request: GetWeatherDbEntry): Promise<void> {
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
       
        await this._ddbFactory().put(params).promise();       
    }
}