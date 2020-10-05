import { OnlineOfflineService } from './online-offline/online-offline.service';
import { StorageService } from './storage/storage.service';
import { SynchronizationService } from './synchronization/synchronization.service';

export const services: any[] = [
    OnlineOfflineService,
    StorageService,
    SynchronizationService
];

export * from './online-offline/online-offline.service';
export * from './storage/storage.service';
export * from './synchronization/synchronization.service';
