# phd-course-finder

## Setup

Have the docker container running.

```bash
yarn prisma migrate dev # run migrations
yarn prisma db seed --preview-feature # seed database
```

## Orga

[OneDrive](https://theklu-my.sharepoint.com/:f:/g/personal/sandra_rudeloff_the-klu_org/EmSuNGVO1ItMqnc-F4WsPW0Bh0egtrNEgEJTvFkPfm8SRA?e=5%3ay8GEOI&at=9)

## Docker

Run postgres Docker Container:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5432:5432 -d postgres
```

## Architecture

![Draw.io diagram](diagrams/mvp-architecture-overview.svg)

## SQL Snippets

```sql

# change courses to  another user

update courses set creator_id='<user_id>' where institution='<institution>';

```
