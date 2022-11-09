import { OutboundConnectorContext, OutboundConnectorFunction } from 'camunda-connector-sdk';
import { Variables } from './Variables';
import logger from '../../plugins/logger';

class ConnectorHelloWorld implements OutboundConnectorFunction {
    name: string;

    type: string;

    constructor() {
        this.name = 'Hello World Connector';
        this.type = 'io.camunda:connector-hello-world:1';
    }

    execute(context: OutboundConnectorContext): { result: string; } {
        try {
            logger.info(`Executing ${this.type}`);
            const variables = context.getVariablesAsType(Variables);
            logger.debug(JSON.stringify(variables, null, 4));
            context.validate(variables);
            context.replaceSecrets(variables);
            return {
                result: `Hello ${variables.firstName} ${variables.lastName} from ${this.name}`,
            };
        } catch (error) {
            // Throw to fail the job
            logger.error(error);
            throw error;
        }
    }
}

export default ConnectorHelloWorld;
