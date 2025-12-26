# Docalyx Server

![Build](https://img.shields.io/badge/build-unknown-lightgrey) ![Version](https://img.shields.io/badge/version-dev-blue) ![License](https://img.shields.io/badge/license-TBD-lightgrey)  
![Python](https://img.shields.io/badge/python-3.11-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-ASGI-009688) ![Socket.IO](https://img.shields.io/badge/Socket.IO-async-black) ![Qdrant](https://img.shields.io/badge/Vector%20DB-Qdrant-orange) ![Docker](https://img.shields.io/badge/Docker-ready-2496ED)

Docalyx Server is a FastAPI + Socket.IO backend that turns PDFs into searchable, conversational knowledge. It:

- Fetches PDFs from Cloudflare R2 and splits content into chunks for retrieval.
- Embeds and indexes chunks in Qdrant for fast semantic search.
- Uses OpenAI for answer generation and Google Gemini for title generation, query understanding, and conversation summarization.
- Persists chats, messages, and document metadata with PostgreSQL via SQLAlchemy (async).

## Table of Contents

- Getting Started
- Usage
- Configuration
- Development
- Testing
- Troubleshooting
- FAQ
- License
- Acknowledgments

## Getting Started

- Prerequisites
  - Python 3.11
  - pip
  - PostgreSQL 14+ (or compatible) with async driver `asyncpg`
  - Qdrant (Cloud or self-hosted)
  - Cloudflare R2 account and bucket
  - OpenAI API key
  - Google Generative AI API key
  - Docker (optional)
- Installation
  - Create and activate a virtual environment:
    - macOS/Linux: `python3.11 -m venv .venv && source .venv/bin/activate`
    - Windows (PowerShell): `python -m venv .venv; .\.venv\Scripts\Activate.ps1`
  - Install dependencies: `pip install -r requirements.txt`
- Environment Setup
  - Create a `.env` file at project root with:
    ```
    ENVIRONMENT=development
    DATABASE_URL=postgresql+asyncpg://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>
    VECTOR_STORE_URL=https://<QDRANT_HOST>
    VECTOR_STORE_API_KEY=<QDRANT_API_KEY>
    R2_ACCOUNT_ID=<CLOUDFLARE_R2_ACCESS_KEY_ID>
    R2_ACCESS_KEY=<CLOUDFLARE_R2_SECRET_ACCESS_KEY>
    R2_API=https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/<R2_ENDPOINT>
    BUCKET_NAME=<R2_BUCKET_NAME>
    OPENAI_API_KEY=<OPENAI_API_KEY>
    GOOGLE_API_KEY=<GOOGLE_GENERATIVE_AI_KEY>
    ```
  - Initialize the database schema: `python -m app.db.init_db`

## Usage

- Run (local)
  - With auto-reload in development: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`
  - Or: `python -m app.main`
- Run (Docker)
  - Build: `docker build -t Docalyx-server -f dockerfile .`
  - Run: `docker run -p 8000:8000 --env-file .env Docalyx-server`
- Socket.IO Events
  - Server uses an ASGI Socket.IO app mounted on FastAPI (`app/main.py:12`).
  - CORS is open by default (`app/socket/server.py:4`).
  - `read_pdf` (`app/socket/event_list/pdf.py:16`)
    - Input
      ```
      { "user_id": "<kinde_user_id>", "pdf_key": "<bucket/path/to/file.pdf>" }
      ```
    - Emits `pdf_read_response`
      - On success: `{ "status": "success", "chat_id": "<uuid>", "title": "<generated_title>" }`
      - On error: `{ "status": "error", "message": "<reason>" }`
  - `message` (`app/socket/event_list/message.py:10`)
    - Input
      ```
      { "chat_id": "<uuid>", "query": "<user_question>" }
      ```
    - Emits `message_response`
      - On success: `{ "status": "success", "data": { "id": "...", "chat_id": "...", "role": "assistant", "content": "...", "is_summary": false, "created_at": "...", "updated_at": "..." } }`
      - On error: `{ "status": "error", "message": "<reason>" }`
- Client Examples
  - JavaScript
    ```js
    import { io } from "socket.io-client";
    const socket = io("http://localhost:8000");
    socket.emit("read_pdf", {
      user_id: "kinde-123",
      pdf_key: "docs/sample.pdf",
    });
    socket.on("pdf_read_response", (payload) => {
      console.log(payload);
      const chatId = payload.chat_id;
      socket.emit("message", { chat_id: chatId, query: "Explain section 3" });
    });
    socket.on("message_response", (payload) => console.log(payload));
    ```
  - Python
    ```python
    import socketio
    sio = socketio.Client()
    sio.connect("http://localhost:8000")
    sio.emit("read_pdf", {"user_id": "kinde-123", "pdf_key": "docs/sample.pdf"})
    @sio.on("pdf_read_response")
    def on_pdf_read(payload):
        chat_id = payload.get("chat_id")
        if chat_id:
            sio.emit("message", {"chat_id": chat_id, "query": "Explain section 3"})
    @sio.on("message_response")
    def on_message(payload):
        print(payload)
    ```

## Configuration

- Core Settings
  - `ENVIRONMENT` in `.env` toggles reload and log level (`app/main.py:7`).
  - Socket server logs are enabled (`app/socket/server.py:7-8`).
- Storage and Retrieval
  - R2 client (`app/module/r2_client.py:4`) uses `R2_API`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY`, `BUCKET_NAME`.
  - PDF loader and splitter (`app/service/pdf_service.py:12`) use `PyPDFLoader` and `RecursiveCharacterTextSplitter`.
  - Embeddings use OpenAI `text-embedding-3-large` (`app/module/embedding_model.py:6`).
  - Qdrant vector store configuration lives in `app/service/vector_service.py:1`.
- Models and Persistence
  - Base: `app/models/base.py:4`
  - Entities: `User` (`app/models/user.py`), `Chat` (`app/models/chat.py`), `Document` (`app/models/document.py`), `Message` (`app/models/message.py`)
  - Async engine and session: `app/service/db_session.py`
- AI Providers
  - OpenAI client (`app/module/open_ai.py:2`) reads `OPENAI_API_KEY` from `.env`.
  - Gemini clients (`app/module/gemini.py:6-8`) read `GOOGLE_API_KEY` from `.env`.
  - Answer generation (`app/service/openai_service.py`) and title/summary/query understanding (`app/service/gemini_services.py`).

## Development

- Project Structure
  - App entry: `app/main.py`
  - Socket registration: `app/socket/event.py`
  - Events: `app/socket/event_list/`
  - Services: `app/service/`
  - Models: `app/models/`
  - DB init: `app/db/init_db.py`
- Contribution
  - Fork, create a feature branch, commit with clear messages, open a PR.
  - Add or update docs when behavior changes.
  - Include small, focused commits and meaningful PR descriptions.
- Code Style
  - Follow PEP 8.
  - Use type hints throughout models and services.
  - Keep functions small and focused.
  - Prefer async operations for I/O and network calls.
- Common Commands
  - Install: `pip install -r requirements.txt`
  - DB init: `python -m app.db.init_db`
  - Run dev: `uvicorn app.main:app --reload`
  - Run prod: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## Testing

- No formal test suite is included.
- Recommended
  - Use `pytest` for unit and integration tests.
  - Mock external services (R2, Qdrant, OpenAI, Gemini).
  - Add CI workflow to run tests on PRs.

## Troubleshooting

- `DATABASE_URL` errors
  - Use async driver scheme: `postgresql+asyncpg://...`.
  - Ensure network access and credentials are correct.
- Qdrant connectivity
  - Verify `VECTOR_STORE_URL` and `VECTOR_STORE_API_KEY`.
  - Check collection recreation in `ensure_collection`.
- R2 access
  - Confirm bucket name and endpoint values.
  - Verify presigned URL generation in `r2_service.get_object`.
- Missing keys
  - Ensure `.env` includes `OPENAI_API_KEY` and `GOOGLE_API_KEY`.
- PDF parsing
  - Validate the `pdf_key` points to a readable PDF.
  - Large PDFs are batched when indexing (`vector_service.py:31`).

## FAQ

- How does PDF ingestion work?
  - Presigned URL from R2, load and split (`app/service/pdf_service.py`), embed chunks, write to Qdrant (`app/service/vector_service.py`), generate a document title (`app/service/gemini_services.py`), create chat and emit response (`app/socket/event_list/pdf.py`).
- How are answers generated?
  - Recent messages are summarized when long (`app/socket/event_list/message.py:60`), relevant chunks are retrieved from Qdrant, context + instructions are sent to OpenAI (`app/service/openai_service.py`) to produce an assistant message.
- Is there a REST API?
  - The server mounts a Socket.IO ASGI app; no HTTP routes are exposed by default.
- Can I restrict CORS?
  - Update the `cors_allowed_origins` in `app/socket/server.py`.

## License

- No license is specified. If you plan to distribute, add a `LICENSE` file and update this section. Common choices include MIT and Apache-2.0.

## Acknowledgments

- FastAPI, Socket.IO, SQLAlchemy, Qdrant, LangChain, OpenAI, Google Generative AI, Cloudflare R2.
