# phd-course-finder

## Docker

Run postgres Docker Container:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5432:5432 -d postgres
```

## Architecture

![Draw.io diagram](diagrams/mvp-architecture-overview.svg)
