import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

export interface StoreItem {
    name: string;
    data?: any;
}

class AddItem { constructor(public storeItem: StoreItem) {} }
class RemoveItem { constructor(public storeItem: StoreItem) {} }
class UpdateItem { constructor(public storeItem: StoreItem) {} }

type StoreAction
    = AddItem
    | RemoveItem
    | UpdateItem


@Injectable()
export class TinyNgStore {
    private dispatcher: Subject<StoreAction>;
    private state: Observable<StoreItem[]>;

    constructor() {
        this.dispatcher = new Subject<StoreAction>();
        this.state = this.storeInit([], this.dispatcher);
    }

    public InsertItem(storeItem: StoreItem): Observable<StoreItem> {
        this.dispatcher.next(new AddItem(storeItem));
        return this.GetItem(storeItem.name);
    }

    public DeleteItem(name: string): void {
        this.dispatcher.next(new RemoveItem({ name: name }));
    }

    public UpdateItem(storeItem: StoreItem): void {
        this.dispatcher.next(new UpdateItem(storeItem));
    }

    public GetItem(name: string): Observable<StoreItem> {
        return this.state.map((s: StoreItem[]) => {
            return s.find((si: StoreItem) => si.name === name);
        });
    }

    private store(initState: StoreItem[], actions: Observable<StoreAction>): Observable<StoreItem[]> {
        return actions.scan((state: StoreItem[], action: StoreAction) => {
            state = state || [];
            switch (action.constructor) {
                case AddItem:
                    let exists: StoreItem[] = state.filter((s: StoreItem) => action.storeItem.name === s.name);
                    if (exists.length <= 0) {
                        return [...state, action.storeItem];
                    } else {
                        return this.dispatcher.next(new UpdateItem(action.storeItem));
                    }
                case RemoveItem:
                    return state.filter((s: StoreItem) => s.name !== action.storeItem.name);
                case UpdateItem:
                    return state.map((s: StoreItem) => s.name !== action.storeItem.name ? s : this.updateItem(action.storeItem));
                default:
                    return state;
            }
        }, initState);
    }

    private storeInit(initState: StoreItem[], actions: Observable<StoreAction>): Observable<StoreItem[]> {
        const sub: BehaviorSubject<StoreItem[]> = new BehaviorSubject(initState);
        this.store(initState, actions).subscribe((s: any) => sub.next(s));

        return sub;
    }

    private updateItem(item: StoreItem): StoreItem {
        let updatedItem: any = {};
        Object.keys(item).map((key: string) => updatedItem[key] = item[key]);

        return updatedItem;
    }
}
