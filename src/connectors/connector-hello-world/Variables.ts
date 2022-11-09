import { NotNull } from 'camunda-connector-sdk';

export class Variables {
    @NotNull firstName!: string;

    @NotNull lastName!: string;
}
