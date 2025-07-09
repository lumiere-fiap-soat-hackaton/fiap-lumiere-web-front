#!/bin/bash

# Set env variables
AMPLIFY_APP_ID="d1eafb8bkucpe9"
BRANCH_NAME="main"

# Create a temporary S3 bucket for artifacts if it doesn't exist
S3_BUCKET="lumiere-web-front-artifacts"
# Check if bucket exists without prompting
if ! aws s3api head-bucket --bucket $S3_BUCKET 2>/dev/null; then
    echo "Creating S3 bucket $S3_BUCKET..."
    # Use --no-cli-auto-prompt to prevent confirmation prompt
    aws s3 mb s3://$S3_BUCKET --no-cli-auto-prompt
fi

# Upload the zip to S3
echo "Uploading deployment package to S3..."
aws s3 cp deployment.zip s3://$S3_BUCKET/deployment.zip

# Get the S3 URL
S3_URL="s3://$S3_BUCKET/deployment.zip"

# Start the deployment
echo "Starting deployment to Amplify app $AMPLIFY_APP_ID branch $BRANCH_NAME..."

# Create a deployment
DEPLOYMENT_ID=$(aws amplify create-deployment \
  --app-id $AMPLIFY_APP_ID \
  --branch-name $BRANCH_NAME \
  --output text \
  --query 'jobId')

echo "Deployment created with ID: $DEPLOYMENT_ID"

# Start the deployment with the ZIP file from S3
aws amplify start-deployment \
  --app-id $AMPLIFY_APP_ID \
  --branch-name $BRANCH_NAME \
  --job-id $DEPLOYMENT_ID \
  --source-url $S3_URL

echo "Deployment started. Check your Amplify console for progress."
