import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
export interface StoreItem {
    name: string;
    data?: any;
}
export declare class AddItem {
    storeItem: StoreItem;
    constructor(storeItem: StoreItem);
}
export declare class RemoveItem {
    storeItem: StoreItem;
    constructor(storeItem: StoreItem);
}
export declare class UpdateItem {
    storeItem: StoreItem;
    constructor(storeItem: StoreItem);
}
export declare type StoreAction = AddItem | RemoveItem | UpdateItem;
export declare class TinyNgStore {
    private dispatcher;
    private state;
    constructor();
    InsertItem(storeItem: StoreItem): void;
    DeleteItem(storeItem: StoreItem): void;
    UpdateItem(storeItem: StoreItem): void;
    GetItem(name: string): Observable<StoreItem>;
    private store(initState, actions);
    private storeInit(initState, actions);
    private updateItem(item);
}
