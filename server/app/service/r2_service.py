from app.module.r2_client import r2 as r2_client
import app.module.constant as constant


def get_object(key: str):
    url = r2_client.generate_presigned_url(
        ClientMethod='get_object',
        Params={'Bucket': constant.BUCKET_NAME, 'Key': key},
        ExpiresIn=3600
    )
    return url
