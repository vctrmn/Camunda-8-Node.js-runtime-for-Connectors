import {
    ZBClient, ZBWorker, IInputVariables, ICustomHeaders, IOutputVariables, ZBClientOptions,
} from 'zeebe-node';
import { BPMNError, OutboundConnectorFunction, OutboundConnectorContext } from 'camunda-connector-sdk';
import logger from '../logger';

const { ZEEBE_ADDRESS = 'localhost:26500' } = process.env;
const CAMUNDA_CLOUD: boolean = (process.env.CAMUNDA_CLOUD === 'true');

class ZeebeClient extends ZBClient {
    constructor() {
        const options: ZBClientOptions = {
            retry: false,
            stdout: logger,
            maxRetries: 0,
        };

        if (CAMUNDA_CLOUD) {
            options.camundaCloud = {
                clusterId: process.env.ZEEBE_CLUSTER_ID as string,
                clientId: process.env.ZEEBE_CLIENT_ID as string,
                clientSecret: process.env.ZEEBE_CLIENT_SECRET as string,
                clusterRegion: process.env.ZEEBE_CLUSTER_REGION as string,
            };
        }

        super(options);

        this.gatewayAddress = ZEEBE_ADDRESS;
        this.loglevel = 'INFO';

        /**
         * Gracefully shutdown zeebe
         */
        process.on('SIGTERM', async () => {
            logger.warn('Shuting down worker gracefully');
            await this.close();
        });
    }

    public createConnector(connector: OutboundConnectorFunction, connectorType: string)
        : ZBWorker<IInputVariables, ICustomHeaders, IOutputVariables> {
        return this.createWorker({
            taskType: connectorType,
            taskHandler: async (job) => {
                try {
                    logger.info(`Handling task ${connectorType}`);
                    const outboundConnectorContext = new OutboundConnectorContext({ job });
                    const result = await connector.execute(outboundConnectorContext) || {};
                    return job.complete(result);
                } catch (error) {
                    if (error instanceof BPMNError) {
                        logger.warn(`Business error catched for ${connectorType}`);
                        logger.warn(error);
                        return job.error(error.message);
                    }
                    logger.error(`Technical error catched for ${connectorType}`);
                    logger.error(error);
                    if (error instanceof Error) { return job.fail(error?.message, 0); }
                    return job.fail('Unknown error', 0);
                }
            },
            onReady: () => { logger.info(`Connector ${connectorType} available in Zeebe`); },
        });
    }
}

export { ZeebeClient };
