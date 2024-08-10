# Task Manager

Simple task manager, it has a kanban and some cool charts.
Written in Node.JS + typescript using NestJS as backend framework and Next.JS as frontend framework

## Requirements

It is a node project, so definitely you need node to be installed.
It is also possible to run by docker, so, if you want to run by docker, you need docker and docker compose plugin to be installed.
If you want to run without docker, you need to provide backend with a mongodb connection

## Installation & Configuration

### Installation

In root folder:
```bash
cd client && npm install && cd .. && cd server && npm install
```
Alternatively:
```bash
make install
```

Running one of those commands will install all the dependencies from both projects at once and you will be almost all set :)

### Configuration

To be all set you need to add some secret you will generate yourself at .env files in both packages (client and server)

Generate a base64 token:
```bash
openssl rand -base64 32
```

Copy and paste it in either
./server/.env
```
JWT_SECRET = <HERE>
```

You can also paste the same here, but you can also generate a different one, it is up to you
```
NEXTAUTH_SECRET=<HERE>
```

Now you're set! :)

## How to run?

If you have a mongodb server separated, you can run it without Docker simply by:
```bash
make run
```
or going at `./client` and run
```bash
npm run dev
```
also at `./server`, run
```bash
npm run start:dev
```

By docker, this project have Dockerfile for development and production, by default it uses development.
It is possible also to run by:
```bash
make infra-build-run
```
or
```bash
make infra-run
```

The difference between those commands is that the `infra-build-run` will also build the images.
Other way is by simple running docker compose commands
```bash
docker compose up --build -d
```
or
```bash
docker compose up -d
```

Those commands will detach the process from the command, so if you want to check logs you need to run:
```bash
docker compose logs -f '<SERVICE_NAME>'
```
The flag `-f` will follow the logs and be always attached to the terminal, you can also filter by service or note simply by writing the service name in `<SERVICE_NAME>`

## Structure

### NestJS (Backend)

I like to keep the logic all separate, so the services are actually not attached to HTTP interface requests and there is no mix logic in them.
When it is needed to mix some modules to do an action, the handlers solve this problem by not injecting useless content in the controller and also messing up the controller view. You can simply inject the new service from another module in the handler and use it as you want.

Keep it nice, separate and clean. The module or service don't need to know or understand other's modules and services business.

### NextJS (Frontend)

The framework makes it a bit tight to freestyle, so I tried to keep at the framework structure, since I'm using APP Router.
For a easy styling and component creation I went for shadcn-ui which wrap @radix-ui and make it easy to integrate and add new ui and components. Their CLI is very good and helps to boost the creation of interfaces.

