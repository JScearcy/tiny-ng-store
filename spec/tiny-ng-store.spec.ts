/// <reference path="../typings/browser.d.ts" />
/// <reference path="../typings/main/ambient/jasmine/jasmine.d.ts" />

import {beforeEachProviders, beforeEach, describe, expect, it, inject} from '@angular/core/testing';
import {TinyNgStore, StoreItem} from '../tiny-ng-store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

describe('tiny-ng-store', () => {
    let tinyNgStore: TinyNgStore;

    beforeEachProviders(() => [TinyNgStore]);

    beforeEach(inject([TinyNgStore], (_tinyNgStore: TinyNgStore): void => {
        tinyNgStore = _tinyNgStore;
    }));
    it('Creates internal state', () => {
        expect(typeof tinyNgStore["state"]).toBe(typeof new Observable<StoreItem[]>());
        expect(typeof tinyNgStore["dispatcher"]).toBe(typeof new Subject<any>());
    });

    it('Contains InsertItem method', () => {
        expect(tinyNgStore.InsertItem).toBeTruthy();
        let item: Observable<StoreItem> = tinyNgStore.InsertItem({ data: [], name: 'testItem' });
        expect(typeof item).toBe(typeof new Observable<StoreItem>());
    });

    it('Contains UpdateItem method', () => {
        let item: StoreItem = { data: ['new item'], name: 'testItem' };
        expect(tinyNgStore.UpdateItem).toBeTruthy();
        expect(tinyNgStore.UpdateItem(item)).toBe(undefined);
    });

    it('Contains GetItem method', () => {
        expect(tinyNgStore.GetItem).toBeTruthy();
        let item: Observable<StoreItem> = tinyNgStore.GetItem('testItem');
        expect(item).toBeTruthy();
        expect(typeof item).toBe(typeof new Observable<StoreItem>());
    });

    it('Contains DeleteItem method', () => {
        let itemName: string = 'testItem';
        expect(tinyNgStore.DeleteItem).toBeTruthy();
        expect(tinyNgStore.DeleteItem(itemName)).toBe(undefined);
    });

    it('Calls GetItem if InsertItem finds existing', () => {
        let item: StoreItem = { data: ['new item'], name: 'testItem' };
        tinyNgStore.InsertItem(item);
        spyOn(tinyNgStore, 'GetItem');
        tinyNgStore.InsertItem(item);
        expect(tinyNgStore.GetItem).toHaveBeenCalled();
    });

});
