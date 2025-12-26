from dotenv import load_dotenv
import os
import socketio
from fastapi import FastAPI
from app.socket.server import sio
import app.socket.event

load_dotenv()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_DEVELOPMENT = ENVIRONMENT == "development"


app = FastAPI()
socket_app = socketio.ASGIApp(sio, app)

app = socket_app


def main():
    """Run the application with Uvicorn for development."""
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=IS_DEVELOPMENT,
        log_level="debug" if IS_DEVELOPMENT else "info",
    )


if __name__ == "__main__":
    main()
