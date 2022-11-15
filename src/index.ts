import dotenv from 'dotenv';
import ZeebeClient from './plugins/zeebe-client';
import ConnectorHelloWorld from './connectors/connector-hello-world';

/**
 * Load environments variables
 */
dotenv.config();

const zeebeClient = new ZeebeClient();

const connectorHelloWorld = new ConnectorHelloWorld();

zeebeClient.createConnector(connectorHelloWorld, connectorHelloWorld.type);
