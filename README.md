# Document Mutation [![Node.js CI](https://github.com/jotafeldmann/document-mutation/actions/workflows/node.js.yml/badge.svg)](https://github.com/jotafeldmann/document-mutation/actions/workflows/node.js.yml)

Library: given a document and a mutation, must generate the database update statements.

## Requirements

- [Node.js 15 and NPM](https://nodejs.org/en/download/)
- Optional but recommended: [Docker](https://docs.docker.com/get-docker/)

## Setup

### Docker

- Easy way, using docker

```bash
make
```

### Local

- Clone

```bash
git clone https://github.com/jotafeldmann/document-mutation
```

- Install dependencies

```bash
npm install
```

## Run

- As a library, we can't run it directly, so lets use tests

```bash
npm test
```

## Development

- Tests

```bash
npm run test:watch
```

## More details

- Read [the purpose docs](./docs/purpose.md) for more info about the purpose
- [Roadmap](./docs/roadmap.md) for next steps and to dos
