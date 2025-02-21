import * as lambdaLocal from "lambda-local";

var lambda = require("./handler");

const payload = {
    "resource": "/",
    "path": "/",
    "httpMethod": "GET",
    "headers": {
        "Accept": "application/json"
    },
    "queryStringParameters": {
        "city": "Dublin, IE"
    }
};

lambdaLocal
    .execute({
        lambdaFunc: lambda,
        lambdaHandler: "handler",
        event: payload,
        timeoutMs: 8000
    }).then((result) => {
        console.log("Lambda response:", result);
    }).catch((error) => {
        console.error("Lambda error:", error);
    });