# Notification Web Application

This is a web application that allows you to add and show notifications.

## Prerequisites

- Node.js 20.14.0
- [Next.js](https://nextjs.org) 14.2.4
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- Radix UI
- React Hook Form
- Vercel Deployment

## Installation

If you're using `nvm`

```bash
nvm use && yarn
```

if not, please make sure your node env is set to 20.14.x

If you do not install `yarn` please follow the [installation instructions](https://yarnpkg.com/)

## Start Development

### Start Database

```bash
./start-database.sh
```

Note: This will start the database then, check the environment variables in `.env` to see

### Apply migration

```bash
yarn db:generate
```

### Seeding data

```bash
yarn seed
```


```bash
yarn dev
```
## Features
* Show notifications (support infinite load more)
* Add a notification with 4 types.
* Show a badge that can tell user's unread notifications

## How do I deploy this?

Deploy it with Vercel - https://vercel.com/
and use Vercel Postgres Database - https://vercel.com/postgres

## Demo

![Add new](./demo/pic-1.png?raw=true "Add new")
![List](./demo/pic-2.png?raw=true "List")
![Add new res](./demo/pic-3.png?raw=true "Add new res")
![List res](./demo/pic-4.png?raw=true "List res")

## Refs

- T3 Stack - https://create.t3.gg/

## Copyright

dieptx.ptit@gmail.com
