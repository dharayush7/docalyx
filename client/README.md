# Docalyx - Intelligent Document Analysis

![Docalyx Banner](src/assets/docalyx.png)

Docalyx is an AI-powered document intelligence tool designed to transform how you interact with PDFs. Upload documents, analyze them instantly, and engage in context-aware conversations without manually scrolling through pages.

## 🚀 Key Features

- **Interactive Chat**: Ask questions and get instant answers based on your document's content.
- **AI Analysis**: Automatically extract insights and summaries from PDFs.
- **Real-time Processing**: Experience seamless interactions powered by Socket.io.
- **Secure Authentication**: robust user management via Kinde Auth.
- **Document Management**: Organize and access your uploaded documents efficiently.
- **Modern UI**: Built with Next.js 16, React 19, and Tailwind CSS v4 for a smooth user experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: [Kinde Auth](https://kinde.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Real-time**: [Socket.io](https://socket.io/)
- **Storage**: Cloudflare R2 / AWS S3 compatible
- **Tooling**: [Bun](https://bun.sh/) & [Biome](https://biomejs.dev/)

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Bun](https://bun.sh/) (Package Manager)
- [PostgreSQL](https://www.postgresql.org/) database
- Kinde Auth account
- Cloudflare R2 or S3-compatible storage bucket

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/docalyx-client.git
    cd docalyx-client
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory and configure the following variables:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@host:port/db_name"
    CLIENT_DATABASE_URL="postgresql://user:password@host:port/db_name" # If different for client
    CLIENT_DATABASE_SSL_CA=""

    # Storage (R2 / S3)
    ENDPOINT="your_r2_endpoint"
    ACCESS_KEY_ID="your_access_key"
    SECRET_ACCESS_KEY="your_secret_key"
    BUCKET="your_bucket_name"

    # Kinde Authentication
    KINDE_CLIENT_ID="your_client_id"
    KINDE_CLIENT_SECRET="your_client_secret"
    KINDE_ISSUER_URL="https://yourdomain.kinde.com"
    KINDE_SITE_URL="http://localhost:3000"
    KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
    KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"

    # Kinde Management API (for user profile updates)
    KINDE_MANAGEMENT_API="https://yourdomain.kinde.com/api"
    KINDE_M2M_ACCESS_TOKEN="your_m2m_token"

    # Backend Connection
    NEXT_PUBLIC_SERVER_SOCKET_URL="http://localhost:8000"
    ```

4.  **Database Setup:**

    Push the Prisma schema to your database:

    ```bash
    bun run prisma db push
    ```

## 🏃 Usage

### Development Server

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

To create a production build:

```bash
bun run build
```

To start the production server:

```bash
bun run start
```

### Linting & Formatting

Check for linting errors:

```bash
bun run lint
```

Format code:

```bash
bun run format
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## ❓ FAQ

**Q: What file formats are supported?**
A: Currently, Docalyx supports PDF files. We are working on adding support for other formats like DOCX and TXT.

**Q: Is my data secure?**
A: Yes! Your documents are stored securely in Cloudflare R2 (or your configured S3 bucket), and authentication is handled by Kinde, an industry-standard identity provider.

## 🔧 Troubleshooting

**Issue: Database connection failed**

- Check if your `DATABASE_URL` is correct in the `.env` file.
- Ensure your PostgreSQL server is running.
- Run `bun run prisma db push` to verify connectivity.

**Issue: Socket connection error**

- Verify that `NEXT_PUBLIC_SERVER_SOCKET_URL` points to the running backend server.
- Ensure the backend server is active and accessible.

**Issue: Authentication not working**

- Double-check your Kinde environment variables (`KINDE_CLIENT_ID`, `KINDE_ISSUER_URL`, etc.).
- Ensure the callback URLs in your Kinde dashboard match your local setup (e.g., `http://localhost:3000/api/auth/kinde_callback`).

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework.
- [Vercel](https://vercel.com) for hosting solutions.
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library.
