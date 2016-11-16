import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/distinctUntilChanged';
export interface TnsState<T> extends Observable<T> {
}
export interface StoreItem {
    name: string;
    data?: any;
}
export declare class TinyNgStore {
    private dispatcher;
    private state;
    constructor();
    InsertItem(storeItem: StoreItem): TnsState<StoreItem>;
    DeleteItem(name: string): void;
    UpdateItem(storeItem: StoreItem): void;
    GetItem(name: string): TnsState<StoreItem>;
    private storeInit(initState, actions);
    private store(initState, actions);
    private updateItem(item);
}
