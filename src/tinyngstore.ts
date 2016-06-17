import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import {StoreItem, StoreAction, AddItem, UpdateItem, RemoveItem} from './store-action';

@Injectable()
export class TinyNgStore {
    private dispatcher: Subject<StoreAction>;
    private state: Observable<StoreItem[]>;

    constructor() {
        this.dispatcher = new Subject<StoreAction>();
        this.state = this.stateInit([], this.dispatcher);
    }

    public InsertItem(storeItem: StoreItem): void {
        this.dispatcher.next(new AddItem(storeItem));
    }

    public DeleteItem(storeItem: StoreItem): void {
        this.dispatcher.next(new RemoveItem(storeItem));
    }

    public UpdateItem(storeItem: StoreItem): void {
        this.dispatcher.next(new UpdateItem(storeItem));
    }

    public GetItem(name: string): Observable<StoreItem> {
        return this.state.map((s: StoreItem[]) => s.find((si: StoreItem) => si.name === name));
    }

    private store(initState: StoreItem[], actions: Observable<StoreAction>): Observable<StoreItem[]> {
        return actions.scan((state: StoreItem[], action: StoreAction) => {
            if (action instanceof AddItem) {
                return [...state, action.storeItem];
            } else if (action instanceof RemoveItem) {
                return state.filter((s: StoreItem) => s.name !== action.storeItem.name);
            } else if (action instanceof UpdateItem) {
                return state.map((s: StoreItem) => s.name !== action.storeItem.name ? s : this.updateItem(action.storeItem));
            } else {
                return state;
            }
        }, initState);
    }

    private stateInit(initState: StoreItem[], actions: Observable<StoreAction>): Observable<StoreItem[]> {
        let appStateObs: Observable<any> =
            this.store(initState, actions);

        return this.wrap(initState, appStateObs);
    }

    private wrap(initState: StoreItem[], obs: Observable<StoreItem[]>): BehaviorSubject<StoreItem[]> {
        const res: BehaviorSubject<any> = new BehaviorSubject(initState);
        obs.subscribe((s: any) => res.next(s));
        return res;
    }

    private updateItem(newItem: StoreItem): StoreItem {
        let updatedItem: any = {};
        for (let key in newItem) {
            if (newItem) {
                updatedItem[key] = newItem[key];
            }
        }
        return updatedItem;
    }
}
