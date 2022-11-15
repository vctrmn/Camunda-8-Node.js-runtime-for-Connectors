/* eslint-disable max-classes-per-file */
import ConnectorHelloWorld from '../src/connectors/connector-hello-world';
import ZeebeClient from '../src/plugins/zeebe-client';

describe('ZeebeClient test suite', () => {
    it('Create connector', () => {
        process.env.ZEEBE_ADDRESS = 'localhoster:26500';
        // given
        const zeebeClient = new ZeebeClient();

        // when
        const connectorHelloWorld = new ConnectorHelloWorld();
        const result = zeebeClient.createConnector(connectorHelloWorld, connectorHelloWorld.type);

        // then
        expect(result.grpcClient.host).toBe(process.env.ZEEBE_ADDRESS);
        expect(result.taskType).toBe(connectorHelloWorld.type);
        zeebeClient.close();
    });
});
