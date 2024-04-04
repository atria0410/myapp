# MyApp

<p>
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=plastic">
  <img src="https://img.shields.io/badge/-Vue.js-4FC08D.svg?logo=vue.js&style=plastic">
  <img src="https://img.shields.io/badge/-Nuxt.js-00C58E.svg?logo=nuxt.js&style=plastic">
  <img src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic">
  <img src="https://img.shields.io/badge/-Postgresql-336791.svg?logo=postgresql&style=plastic">
</p>

## Get Started

Copy the ".env.example" to create the ".env".  
After that, change the settings as necessary.

Build container (development mode)

```
docker compose -f "docker-compose.dev.yml" up -d --build
```

Migrate Database

```
docker exec myapp-app-1 yarn prisma migrate dev
```

Seed data

```
docker exec myapp-app-1 yarn prisma db seed
```
