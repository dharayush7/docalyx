import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_DEVELOPMENT = ENVIRONMENT == "development"

app = FastAPI(
    title="PDF AI API",
    description="API for PDF AI processing",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if IS_DEVELOPMENT else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router)


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
