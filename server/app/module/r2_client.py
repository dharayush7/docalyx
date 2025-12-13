import boto3
from . import constant

r2 = boto3.client(
    's3',
    endpoint_url=constant.R2_API,
    aws_access_key_id=constant.R2_ACCOUNT_ID,
    aws_secret_access_key=constant.R2_ACCESS_KEY,
    region_name="auto"
)
