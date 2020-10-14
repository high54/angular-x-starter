import { Injectable } from '@angular/core';
// Models
import { DatabaseModel } from '../../models/database.model';
@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private db: DatabaseModel;
    constructor(
    ) {
        this.db = new DatabaseModel('appDatabase');

        this.db.open();

    }
    public async openDB(): Promise<boolean> {
        return await this.db.open().then((value) => {
            return true;
        }).catch((err) => {
            console.error(`Open failed: ${err.stack}`);
            return false;
        });
    }
    get dbIsOpen(): boolean {
        return this.db.isOpen();
    }
    public getTable(tableName: string): any {
        return this.db[tableName];
    }
    public add(tableName: string, value: any): any {
        this.db[tableName].add(value);
    }

    /**
     * Return the first value
     * @param tableName Table name
     * @param where complexe request, use : { colname: value, colname2?: value, ...}
     */
    public getWhereFirst(tableName: string, where: any): Promise<any> {
        return this.db[tableName].where(where).first((value) => {
            return value ? value : [];
        }).catch((err) => {
            console.log(err);
        });
    }

    public getWhereAll(tableName: string, where: any): Promise<any> {
        return this.db[tableName].where(where).toArray();
    }

    public delete(tableName: string, where: any): Promise<any> {
        return this.db[tableName].where(where).delete();
    }

}
