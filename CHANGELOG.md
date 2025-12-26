# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where applicable.

## [v1.1.57] - 2025-12-26

### Summary

Enhances PDF chat responsiveness, strengthens client–server reliability, and refines environment configuration and documentation. See detailed notes in `release-notes/v1.1.57.md`.

### Added

- Improved streaming behavior over WebSockets for large PDF chats.
- Expanded environment setup documentation (client and server).
- Additional troubleshooting guidance for DB, vector store, and storage.

### Changed

- More resilient client socket reconnect behavior during backend restarts.
- Refined authentication guidance for Kinde configuration and redirects.
- Clarified tooling: Biome (lint/format), Prisma (local inspection).
- Root `README.md` with comprehensive setup and usage instructions.

### Fixed

- Duplicate chat messages caused by socket race conditions.
- Upload interruptions due to invalid/empty storage configuration.
- Minor UI styling inconsistencies across themes/components.

### Known Issues

- WebSocket failures if `NEXT_PUBLIC_SERVER_SOCKET_URL` is misconfigured.
- Degraded answer quality if Qdrant (vector store) is unavailable.
- Initial PostgreSQL connection failures with invalid credentials or missing DB.

### Summary

Stabilization release with client and server foundation for PDF analysis and chat; initial environment configuration and tooling setup.

### Added

- Core PDF upload and analysis workflow.
- AI chat interface with context-aware responses.
- Initial Kinde authentication integration.

### Changed

- Project scaffolding for client (Next.js) and server (FastAPI).
- Introduced Biome for linting/formatting; Prisma integration.

### Fixed

- Early socket connection edge cases in development environments.

---

Links:

- Release notes for `v1.1.57`: `release-notes/v1.1.57.md`
- Compare: `https://github.com/dharayush7/docalyx/compare/v1.1.51...v1.1.57`
