import { OutboundConnectorContext } from 'camunda-connector-sdk';
import ConnectorHelloWorld from '../src/connectors/connector-hello-world';

describe('ConnectorHelloWorld test suite', () => {
    it('firstName and lastName', () => {
        // given
        const context = new OutboundConnectorContext({});
        context.variables = {
            firstName: 'John',
            lastName: 'Doe',
        };
        const connectorToTest = new ConnectorHelloWorld();
        // when
        const result = connectorToTest.execute(context);
        // then
        expect(result).toEqual({ result: 'Hello John Doe from Hello World Connector' });
    });
    it('Missing lastName', () => {
        // given
        const context = new OutboundConnectorContext({});
        context.variables = {
            firstName: 'John',
        };
        const connectorToTest = new ConnectorHelloWorld();
        // when
        const catchErrorMethod = (): void => {
            connectorToTest.execute(context);
        };
        // then
        expect(catchErrorMethod).toThrow(Error);
        expect(catchErrorMethod).toThrow('Missing required variables: ["lastName"]');
    });
});
