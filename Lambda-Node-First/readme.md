#
# AWS Lambda
#

# deploy to lambda
aws lambda create-function  \
  --function-name LambdaNodeFirst \
  --runtime nodejs18.x \
  --role arn:aws:iam::831926608382:role/LambdaNodeFirstRole \
  --handler function-handler.handler \
  --environment "Variables={OPEN_WEATHER_API_KEY=____xxx____}" \
  --zip-file fileb://publish/lambda-function.zip

# update lambda code
aws lambda update-function-code \
  --function-name LambdaNodeFirst \
  --zip-file fileb://publish/lambda-function.zip

# update lambda config
aws lambda update-function-configuration \
  --function-name LambdaNodeFirst \
  --environment "Variables={OPEN_WEATHER_API_KEY=____xxx____}"



# invoke lambda
aws lambda invoke --function-name LambdaNodeFirst --payload '{"queryStringParameters":{"city":"Lisbon, PT"}}' --cli-binary-format raw-in-base64-out  output && cat output


# debug lambda
export AWS_PROFILE=default \
&& aws sts assume-role --role-arn "arn:aws:iam::831926608382:role/LambdaNodeFirstRole" --role-session-name "LocalDebugSession" --query 'Credentials' --output json > temp-creds.json \
&& aws configure set aws_access_key_id $(jq -r '.AccessKeyId' temp-creds.json) --profile lambda-node-first-profile \
&& aws configure set aws_secret_access_key $(jq -r '.SecretAccessKey' temp-creds.json) --profile lambda-node-first-profile \
&& aws configure set aws_session_token $(jq -r '.SessionToken' temp-creds.json) --profile lambda-node-first-profile \
&& rm temp-creds.json \
&& aws sts get-caller-identity \
&& export AWS_REGION=eu-west-1 \
&& export AWS_PROFILE=lambda-node-first-profile \
&& aws dynamodb list-tables \
&& aws dynamodb scan --table-name Lambda-Node-First-Table

#
# Run and Deploy
#
To run, use vscode and press F5.
Dist folder holds the transpilation of the files from TS to JS.
To deploy use npm run deploy. You will get a zipped file in /publish directory with everything that was in /dist folder

# 
# NODEJS
# 

npm outdated

Current → The currently installed version in your node_modules.
Wanted → The latest version that satisfies the version range in package.json.
If your package.json has "lodash": "^4.17.20", the highest 4.x.x version available is 4.17.21, so that’s the Wanted version.
Latest → The absolute latest version available in the npm registry.
If a new major version exists (e.g., 5.0.0 for lodash), it will be shown here.

To update to the Wanted version (which follows your package.json constraints):
npm update lodash

To update to the Latest version (which may introduce breaking changes):
npm install lodash@latest

