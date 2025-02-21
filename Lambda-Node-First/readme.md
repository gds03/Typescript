#
# AWS Lambda
#

# deploy to lambda
aws lambda create-function --function-name LambdaNodeFirst \
  --runtime nodejs18.x \
  --role arn:aws:iam::831926608382:role/LambdaNodeFirstRole \
  --handler index.handler \
  --zip-file fileb://publish/lambda-function.zip

# update lambda
aws lambda update-function-code --function-name LambdaNodeFirst --zip-file fileb://publish/lambda-function.zip

# invoke lambda
aws lambda invoke --function-name LambdaNodeFirst output.json && cat output.json


#
# Run and Deploy
#
To run, use vscode and press F5.
Dist folder holds the transpilation of the files from TS to JS.
To deploy use npm run deploy. You will get a zipped file in /publish directory with everything that was in /dist folder