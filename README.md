# Docalyx

Docalyx is an AI-powered document intelligence tool that allows you to upload PDFs, analyze them instantly, and chat with your documents. It enables users to ask questions, extract insights, summarize sections, and receive context-aware answers without manually scrolling through pages.

## Features

- **PDF Analysis**: Upload and process PDF documents for deep understanding.
- **AI Chat**: Interactive chat interface to query your documents.
- **Context-Aware Answers**: Retrieves relevant information from specific sections of your documents.
- **Real-time Interaction**: Seamless chat experience powered by WebSockets.
- **Secure Authentication**: User management and authentication via Kinde.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v20 or higher (for the client)
- **Python**: v3.10 or higher (for the server)
- **PostgreSQL**: Relational database
- **Qdrant**: Vector database (Docker image recommended)
- **Cloud Storage**: AWS S3 or Cloudflare R2 compatible bucket

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dharayush7/docalyx
    cd pdfai
    ```

2.  **Setup Client:**

    ```bash
    cd client
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Setup Server:**

    ```bash
    cd ../server
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

### Environment Setup

You need to configure environment variables for both the client and the server.

#### Client Configuration (`client/.env.local`)

Create a `.env.local` file in the `client` directory:

```env
# Database
CLIENT_DATABASE_URL="postgresql://user:password@localhost:5432/docalyx?schema=public"

# Storage (AWS S3 / R2)
ENDPOINT="your_s3_endpoint"
ACCESS_KEY_ID="your_access_key_id"
SECRET_ACCESS_KEY="your_secret_access_key"
BUCKET="your_bucket_name"

# Server Connection
NEXT_PUBLIC_SERVER_SOCKET_URL="http://localhost:8000"

# Kinde Auth
KINDE_CLIENT_ID="your_kinde_client_id"
KINDE_CLIENT_SECRET="your_kinde_client_secret"
KINDE_ISSUER_URL="your_kinde_issuer_url"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
```

#### Server Configuration (`server/.env`)

Create a `.env` file in the `server` directory:

```env
# Environment
ENVIRONMENT="development"

# Storage (R2 / S3)
R2_ACCOUNT_ID="your_account_id"
R2_ACCESS_KEY="your_access_key"
R2_API="your_secret_key"
BUCKET_NAME="your_bucket_name"

# Vector Database (Qdrant)
VECTOR_STORE_URL="your_qdrant_url"  # e.g., http://localhost:6333
VECTOR_STORE_API_KEY="your_qdrant_api_key"

# Database
DATABASE_URL="postgresql+asyncpg://user:password@localhost:5432/docalyx"

# AI Models
OPENAI_API_KEY="your_openai_api_key"
GOOGLE_API_KEY="your_google_api_key"
```

## Usage

### Running the Application

1.  **Start the Server:**

    ```bash
    cd server
    # Ensure your virtual environment is activated
    python -m app.main
    ```

    The server will start on `http://localhost:8000`.

2.  **Start the Client:**

    ```bash
    cd client
    npm run dev
    ```

    The client will start on `http://localhost:3000`.

3.  Open your browser and navigate to `http://localhost:3000` to start using Docalyx.

### Common Commands

**Client:**

- `npm run lint`: Check for code issues using Biome.
- `npm run format`: Format code using Biome.
- `npm run build`: Build the production application.
- `npx prisma studio`: Open Prisma Studio to view database records.

**Server:**

- `python -m app.main`: Run the development server.

## Development Guidelines

### Contribution Instructions

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

### Code Style Standards

- **Frontend**: We use [Biome](https://biomejs.dev/) for linting and formatting. Please ensure your code passes `npm run lint` before committing.
- **Backend**: Follow PEP 8 guidelines for Python code.

## Troubleshooting

- **Database Connection Issues**: Ensure your PostgreSQL service is running and the connection string in `.env` is correct.
- **WebSocket Errors**: Verify that the backend server is running on port 8000 and the `NEXT_PUBLIC_SERVER_SOCKET_URL` in the client matches.
- **Dependencies**: If you encounter issues with packages, try removing `node_modules` (client) or `venv` (server) and reinstalling.

## License

This project is licensed under the MIT License.
