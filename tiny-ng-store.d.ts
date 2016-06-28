import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
export interface StoreItem {
    name: string;
    data?: any;
}
export declare class TinyNgStore {
    private dispatcher;
    private state;
    constructor();
    InsertItem(storeItem: StoreItem): Observable<StoreItem>;
    DeleteItem(name: string): void;
    UpdateItem(storeItem: StoreItem): void;
    GetItem(name: string): Observable<StoreItem>;
    private storeInit(initState, actions);
    private store(initState, actions);
    private updateStoreItems(state, item);
    private updateItem(item);
}
