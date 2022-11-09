# Camunda 8 Node.js Connector Runtime

Job Worker that implement runtime for Connectors in Node.js

#### ⚠️ Known issues ⚠️

- Output mappings is not working

## Structure

```
src
│   index.ts                    # Worker entry point : you can configure here several connectors
└───plugins                     # Configurable plugins : logger & zeebe client
└───connectors                  # Develop your own connector here
tests
│   hello-world.ts              # Test your connector
templates
│   connector-hello-world.json  # Create a connector template for each connector
```

## Getting started locally

#### Prerequisites

- [Node.js](https://nodejs.org/en/) 18 LTS installed
- [Docker desktop](https://www.docker.com/products/docker-desktop/) installed

1. Start docker-compose

```
docker-compose up -d
```

2. Install npm dependencies

```
npm install
```

3. Create a `.env` file

See example file `.example.env`

4. *Optional* Run tests

```
npm run test
```

5. Start the Job Worker

```
npm run dev
```

## Develop in VS Code

*Recommended*

Install extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to integrate linting into VS Code

## Providing and using template 

Read the official documentation : https://docs.camunda.io/docs/components/connectors/custom-built-connectors/connector-templates/#providing-and-using-connector-templates