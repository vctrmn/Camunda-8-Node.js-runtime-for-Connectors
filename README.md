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

## Providing and using template 

Read the official documentation : https://docs.camunda.io/docs/components/connectors/custom-built-connectors/connector-templates/#providing-and-using-connector-templates