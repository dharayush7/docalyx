from dotenv import load_dotenv
import os

load_dotenv()

R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
R2_ACCESS_KEY = os.getenv("R2_ACCESS_KEY")
R2_API = os.getenv("R2_API")
BUCKET_NAME = os.getenv("BUCKET_NAME")

VECTOR_STORE_URL = os.getenv("VECTOR_STORE_URL")
VECTOR_STORE_API_KEY = os.getenv("VECTOR_STORE_API_KEY")

DATABASE_URL = os.getenv("DATABASE_URL")
