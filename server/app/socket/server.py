from dotenv import load_dotenv
import socketio
import os

load_dotenv()

IS_DEVELOPMENT = os.getenv("ENVIRONMENT", "development") == "development"

origins = os.getenv("CORS_ORIGINS", "*").split(",")

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=origins,
    logger=IS_DEVELOPMENT,
    engineio_logger=IS_DEVELOPMENT,
    transport=["websocket", "polling"],
)
