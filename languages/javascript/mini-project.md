# JavaScript Mini Project — Task Manager (CLI + API)

## Part 1 — Node CLI (levels 01–03)

```bash
task add "Write README" --due 2026-08-01 --tag docs
task list --status open --tag docs
task done 3
task stats
```

- Persist to `tasks.json` with `node:fs/promises`
- Parse arguments with `node:util`'s `parseArgs`
- Validate input; exit with a clear message and non-zero code on error
- Pretty aligned table output

## Part 2 — Structure (level 04)

- `Task` factory or class with a private id
- `TaskRepository` (file I/O) injected into `TaskService` (business rules)
- `EventBus` emitting `task:created` / `task:completed`; a logger subscribes
- Immutable state updates only

## Part 3 — Async HTTP API (level 05)

- `node:http` server exposing `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`
- Proper status codes and JSON error bodies
- Graceful shutdown on `SIGINT`, request timeouts with `AbortSignal`
- Concurrency-safe writes (queue or lock file)

## Part 4 — Quality

- Tests with `vitest` or `node:test`: unit tests for the service, integration tests for the API
- ESLint + Prettier clean
- JSDoc types or a `--checkJs` TypeScript pass
- GitHub Actions workflow running lint + tests on Node 20 and 22

## Stretch goals

- Swap the JSON repository for SQLite without touching the service (proves your abstraction)
- Add a tiny browser frontend using `fetch` and optimistic updates
- Server-sent events endpoint that streams task changes live
- Publish the CLI to npm with a `bin` entry
