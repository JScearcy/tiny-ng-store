/// <reference path="../typings/browser.d.ts" />
/// <reference path="../typings/main/ambient/jasmine/jasmine.d.ts" />

import {beforeEachProviders, beforeEach, describe, expect, it, inject} from '@angular/core/testing';
import {TinyNgStore, StoreItem} from '../tiny-ng-store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/take';

describe('tiny-ng-store', () => {
    let tinyNgStore: TinyNgStore;
    let blankObservable: Observable<StoreItem>;

    beforeEachProviders(() => [TinyNgStore]);

    beforeEach(inject([TinyNgStore], (_tinyNgStore: TinyNgStore): void => {
        tinyNgStore = _tinyNgStore;
        blankObservable = new Observable<StoreItem>();
    }));
    it('Creates internal state', () => {
        expect(typeof tinyNgStore["state"]).toBe(typeof new Observable<StoreItem[]>());
        expect(typeof tinyNgStore["dispatcher"]).toBe(typeof new Subject<any>());
    });

    it('Contains InsertItem method', () => {
        expect(tinyNgStore.InsertItem).toBeTruthy();
        let item: Observable<StoreItem> = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        expect(typeof item).toBe(typeof blankObservable);
    });

    it('InsertItem method inserts the correct data', () => {
        let data: string;
        let item: Observable<StoreItem> = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe((s: StoreItem) => data = s.data);
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });

    it('Insert item twice updates existing item', () => {
        let data: string[];
        expect(tinyNgStore.InsertItem).toBeTruthy();
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        let item: Observable<StoreItem> = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe((s: StoreItem) => data = s.data);
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });

    it('Contains UpdateItem method', () => {
        let item: StoreItem = { data: ['testData'], name: 'testItem' };
        expect(tinyNgStore.UpdateItem).toBeTruthy();
        expect(tinyNgStore.UpdateItem(item)).toBe(undefined);
    });

    it('UpdateItem method properly updates data', () => {
        let data: string[];
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' })
            .subscribe((s: StoreItem) => data = s.data);
        tinyNgStore.UpdateItem({ data: ['testData'], name: 'testItem' });
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });

    it('Contains GetItem method', () => {
        expect(tinyNgStore.GetItem).toBeTruthy();
        let item: Observable<StoreItem> = tinyNgStore.GetItem('testItem');
        expect(item).toBeTruthy();
        expect(typeof item).toBe(typeof blankObservable);
    });

    it('GetItem method returns observable that updates data', () => {
        let data: string[];
        let item: Observable<StoreItem> = tinyNgStore.GetItem('testItem');
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        item.take(1).subscribe((s: StoreItem) => data = s.data);
        expect(data.length).toBe(1);
        expect(data[0]).toBe('initData');
    });

    it('Contains DeleteItem method', () => {
        let itemName: string = 'testItem';
        expect(tinyNgStore.DeleteItem).toBeTruthy();
        expect(tinyNgStore.DeleteItem(itemName)).toBe(undefined);
    });

    it('DeleteItem method removes existing data', () => {
        let data: string[];
        let itemName: string = 'testItem';
        tinyNgStore.InsertItem({ data: ['initData'], name: itemName })
            .subscribe((s: StoreItem) => s ? data = s.data : data = []);
        tinyNgStore.DeleteItem(itemName)
        expect(data.length).toBe(0);
    });

});
