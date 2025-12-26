# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where applicable.

## [v1.1.58] - 2025-12-26

### Summary

Introduces new features focused on chat reliability and configuration flexibility, resolves several user-facing issues, and delivers performance and UI/UX enhancements. See detailed notes in `release-notes/v1.1.58.md`.

### New Features

- Chat streaming resilience for large PDFs to provide smoother responses over WebSockets. Author: `@dharayush7`
- Optional database SSL CA configuration via `CLIENT_DATABASE_SSL_CA` for environments requiring CA verification. Author: `@dharayush7`
- Enhanced onboarding and environment configuration documentation for faster setup and fewer misconfigurations. Author: `@dharayush7`
- UI components refinement for forms, inputs, labels, and tooltips improving accessibility and consistency. Author: `@dharayush7`

Configuration Notes:

- Set `CLIENT_DATABASE_SSL_CA` in `client/.env.local` when using SSL connections.
- Confirm `NEXT_PUBLIC_SERVER_SOCKET_URL` (e.g., `http://127.0.0.1:8000`) points to your backend.
- Ensure server env includes valid `VECTOR_STORE_URL`, `DATABASE_URL`, and storage credentials.

### Bug Fixes

- (CLNT-203) Prevent duplicate messages caused by race conditions during socket reconnects; eliminates repeat responses in chat. Author: `@dharayush7`
- (SRV-118) Fix intermittent upload failures when storage credentials are missing/invalid; now fails fast with clear validation errors. Author: `@dharayush7`
- (UI-077) Resolve minor theme inconsistencies affecting component variants and skeleton loaders; consistent visuals in light/dark themes. Author: `@dharayush7`
- (DOC-142) Correct parsing behavior for mixed-encoding PDFs to reduce empty sections and improve extraction accuracy. Author: `@dharayush7`

Impact:

- More reliable chat interactions and uploads.
- Improved parsing fidelity and consistent UI rendering.

Workarounds Retired:

- Manual page refreshes during reconnects are no longer necessary.
- Upload retries due to silent failures are no longer needed.

### Performance Improvements

- Reduced socket reconnect latency and stabilized streaming for lengthy responses. Author: `@dharayush7`
- Optimized document processing pipeline and chunking behavior to improve throughput on large PDFs. Author: `@dharayush7`

### Deprecated Features

- None in this release.

### Breaking Changes

- None identified for common deployments.

### Fixed

- N/A (see Bug Fixes section above for detailed items).

### Known Issues

- WebSocket failures if `NEXT_PUBLIC_SERVER_SOCKET_URL` is misconfigured.
- Degraded answer quality if Qdrant is unavailable or misconfigured.
- Initial PostgreSQL connection failures due to invalid credentials or missing DB.

### Links

- Release notes for `v1.1.58`: `release-notes/v1.1.58.md`
- Compare: `https://github.com/dharayush7/docalyx/compare/v1.1.57...v1.1.58`

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

## [v1.1.51] - 2025-12-01

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
