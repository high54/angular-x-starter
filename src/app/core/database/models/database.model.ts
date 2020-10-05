import Dexie from 'dexie';
export interface IQueue {
    id?: number;
    uri: string;
    status: QueueStatus;
    method: string;
    params: string;
    payload?: string;
}

export enum QueueStatus {
    WAITING,
    SYNC,
    ERROR
}

export class DatabaseModel extends Dexie {
    queues: Dexie.Table<IQueue, number>;

    constructor(databaseName) {
        super(databaseName);
        this.version(1).stores({
            queues: '++id,uri,status,method'
        });
        this.queues = this.table('queues');
    }
}
