#
# AWS Lambda
#

# deploy to lambda
aws lambda create-function  \
  --function-name LambdaNodeFirst \
  --runtime nodejs18.x \
  --role arn:aws:iam::831926608382:role/LambdaNodeFirstRole \
  --handler index.handler \
  --environment "Variables={OPEN_WEATHER_API_KEY=`your-secret-key`}"
  --zip-file fileb://publish/lambda-function.zip

# update lambda
aws lambda update-function-code \
  --function-name LambdaNodeFirst \
  --zip-file fileb://publish/lambda-function.zip \
  --environment Variables={OPEN_WEATHER_API_KEY=`your-secret-key`}


# invoke lambda
aws lambda invoke --function-name LambdaNodeFirst output.json && cat output.json


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

