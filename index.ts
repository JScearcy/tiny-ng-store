import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
export class TnsState<T> extends Observable<T> {}

/**
 * This class represents and data added into the store
 * Name your store item, and provide data
 * @export
 * @class StoreItem
 * @property {string} name - This is the name of the data stored
 * @property {any} data - This is the data stored under the name provided
 */
export class StoreItem {
    public name: string;
    public data?: any;
}

class AddItem { constructor(public storeItem: StoreItem) {} }
class RemoveItem { constructor(public storeItem: StoreItem) {} }
class UpdateItem { constructor(public storeItem: StoreItem) {} }

type StoreAction
    = AddItem
    | RemoveItem
    | UpdateItem

/**
 * Class representing the data store
 * Creates an instance of TinyNgStore.
 * @export
 * @class TinyNgStore
 */
@Injectable()
export class TinyNgStore {
    private dispatcher: Subject<StoreAction>;
    private state: TnsState<StoreItem[]>;

    constructor() {
        this.dispatcher = new Subject<StoreAction>();
        this.state = this.storeInit([], this.dispatcher);
    }
    

    /**
     * Insert an item into the data store
     * This will return TnsState<StoreItem> representing that object inserted
     * @param {StoreItem} storeItem - StoreItem class representing your data
     * @returns {TnsState<StoreItem>}
     * @memberOf TinyNgStore
     */
    public InsertItem(storeItem: StoreItem): TnsState<StoreItem> {
        this.dispatcher.next(new AddItem(storeItem));
        return this.GetItem(storeItem.name);
    }

    /**
     * Delete an item from the data store
     * @param {string} name - This is the name of the data stored
     * @memberOf TinyNgStore
     */
    public DeleteItem(name: string): void {
        this.dispatcher.next(new RemoveItem({ name: name }));
    }

    /**
     * Update and item within the data store
     * If the item does not exist, nothing will be created
     * @param {StoreItem} storeItem - StoreItem class representing your data
     * @memberOf TinyNgStore
     */
    public UpdateItem(storeItem: StoreItem): void {
        this.dispatcher.next(new UpdateItem(storeItem));
    }

    /**
     * Retrieve an item from the data store
     * This will return TnsState<StoreItem> representing that object
     * @param {string} name - This is the name of the data stored
     * @returns {TnsState<StoreItem>}
     * @memberOf TinyNgStore
     */
    public GetItem(name: string): TnsState<StoreItem> {
        return this.state.map((s: StoreItem[]) => s.filter((si: StoreItem) => si.name === name)[0]).distinctUntilChanged();
    }

    private storeInit(initState: StoreItem[], actions: TnsState<StoreAction>): TnsState<StoreItem[]> {
        const behavior: BehaviorSubject<StoreItem[]> = new BehaviorSubject(initState);
        this.store(initState, actions).subscribe((s: any) => behavior.next(s));

        return behavior;
    }

    private store(initState: StoreItem[], actions: TnsState<StoreAction>): TnsState<StoreItem[]> {
        return actions.scan((state: StoreItem[], action: StoreAction) => {
            switch (action.constructor) {
                case AddItem:
                    let filteredStore: StoreItem[] = state.filter((s: StoreItem) => action.storeItem.name !== s.name);
                    return [...filteredStore, action.storeItem];
                case RemoveItem:
                    return state.filter((s: StoreItem) => s.name !== action.storeItem.name);
                case UpdateItem:
                    return state.map((s: StoreItem) => s.name !== action.storeItem.name ? s : this.updateItem(action.storeItem));
                default:
                    return state;
            }
        /* tslint:disable */
        }, initState);
        /* tslint:enable */
    }

    private updateItem(item: StoreItem): StoreItem {
        let updatedItem: any = {};
        Object.keys(item).map((key: string) => updatedItem[key] = item[key]);

        return updatedItem;
    }
}
