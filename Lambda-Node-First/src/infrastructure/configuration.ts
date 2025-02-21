import { injectable, inject } from "inversify";

export interface IConfiguration {
    get OpenWeatherApiKey(): string;
}

@injectable()
export class Configuration implements IConfiguration 
{
    private static readonly _notThere: string = "not-there";

    get OpenWeatherApiKey(): string {
        var env_var = process.env.OPEN_WEATHER_API_KEY  || Configuration._notThere;
        if(env_var == Configuration._notThere){
            throw new Error(`Please specify the env-variable 'OPEN_WEATHER_API_KEY'`);
        }

        return env_var;
    }
}