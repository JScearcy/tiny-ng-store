import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/distinctUntilChanged';
/**
 * A type of Observable<T> representing the store Observable
 * @export
 * @class TnsState
 * @extends {Observable<T>}
 * @template T
 */
export declare class TnsState<T> extends Observable<T> {
}
/**
 * This class represents and data added into the store
 * Name your store item, and provide data
 * @export
 * @class StoreItem
 * @property {string} name - This is the name of the data stored
 * @property {any} data - This is the data stored under the name provided
 */
export declare class StoreItem {
    name: string;
    data?: any;
}
/**
 * Class representing the data store
 * Creates an instance of TinyNgStore.
 * @export
 * @class TinyNgStore
 */
export declare class TinyNgStore {
    private dispatcher;
    private state;
    constructor();
    /**
     * Insert an item into the data store
     * This will return TnsState<StoreItem> representing that object inserted
     * @param {StoreItem} storeItem - StoreItem class representing your data
     * @returns {TnsState<StoreItem>}
     * @memberOf TinyNgStore
     */
    InsertItem(storeItem: StoreItem): TnsState<StoreItem>;
    /**
     * Delete an item from the data store
     * @param {string} name - This is the name of the data stored
     * @memberOf TinyNgStore
     */
    DeleteItem(name: string): void;
    /**
     * Update and item within the data store
     * If the item does not exist, nothing will be created
     * @param {StoreItem} storeItem - StoreItem class representing your data
     * @memberOf TinyNgStore
     */
    UpdateItem(storeItem: StoreItem): void;
    /**
     * Retrieve an item from the data store
     * This will return TnsState<StoreItem> representing that object
     * @param {string} name - This is the name of the data stored
     * @returns {TnsState<StoreItem>}
     * @memberOf TinyNgStore
     */
    GetItem(name: string): TnsState<StoreItem>;
    private storeInit(initState, actions);
    private store(initState, actions);
    private updateItem(item);
}
