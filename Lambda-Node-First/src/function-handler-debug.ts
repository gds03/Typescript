import * as lambdaLocal from "lambda-local";

const config = require('dotenv').config();
if(config.error)
{
    throw config.error;
}
const lambda = require("./handler");

const payload = {
    "resource": "/",
    "path": "/",
    "httpMethod": "GET",
    "headers": {
        "Accept": "application/json"
    },
    "queryStringParameters": {
        "username": "tania",
        "city": "Lisbon, PT",
        "cacheSeconds": 60
    }
};

lambdaLocal
    .execute({
        lambdaFunc: lambda,
        lambdaHandler: "handler",
        profileName: 'lambda-node-first-profile',
        event: payload,
        timeoutMs: 120 * 1000,
        environment: config
    })
    .then((result) => {
        console.log("Lambda response:", result);
    })
    .catch((error) => {
        console.error("Lambda error:", error);
    });