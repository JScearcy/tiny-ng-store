"use strict";
exports.__esModule = true;
var tiny_ng_store_1 = require("../tiny-ng-store");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/take");
describe('tiny-ng-store', function () {
    var tinyNgStore;
    var blankObservable;
    beforeEach(function () {
        tinyNgStore = new tiny_ng_store_1.TinyNgStore();
        blankObservable = new Observable_1.Observable();
        tinyNgStore.InsertItem({ data: [], name: 'beforeEachInsert' });
    });
    it('Creates internal state', function () {
        expect(typeof tinyNgStore["state"]).toBe(typeof new Observable_1.Observable());
        expect(typeof tinyNgStore["dispatcher"]).toBe(typeof new Subject_1.Subject());
    });
    it('Contains InsertItem method', function () {
        expect(tinyNgStore.InsertItem).toBeTruthy();
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        expect(typeof item).toBe(typeof blankObservable);
    });
    it('InsertItem method inserts the correct data', function () {
        var data;
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });
    it('Insert item twice updates existing item', function () {
        var data;
        expect(tinyNgStore.InsertItem).toBeTruthy();
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });
    it('Contains UpdateItem method', function () {
        var item = { data: ['testData'], name: 'testItem' };
        expect(tinyNgStore.UpdateItem).toBeTruthy();
        expect(tinyNgStore.UpdateItem(item)).toBe(undefined);
    });
    it('UpdateItem method properly updates data', function () {
        var data;
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' })
            .subscribe(function (s) { return data = s.data; });
        tinyNgStore.UpdateItem({ data: ['testData'], name: 'testItem' });
        expect(data.length).toBe(1);
        expect(data[0]).toBe('testData');
    });
    it('Contains GetItem method', function () {
        expect(tinyNgStore.GetItem).toBeTruthy();
        var item = tinyNgStore.GetItem('testItem');
        expect(item).toBeTruthy();
        expect(typeof item).toBe(typeof blankObservable);
    });
    it('GetItem method returns observable that updates data', function () {
        var data;
        var item = tinyNgStore.GetItem('testItem');
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        expect(data.length).toBe(1);
        expect(data[0]).toBe('initData');
    });
    it('Contains DeleteItem method', function () {
        var itemName = 'testItem';
        expect(tinyNgStore.DeleteItem).toBeTruthy();
        expect(tinyNgStore.DeleteItem(itemName)).toBe(undefined);
    });
    it('DeleteItem method removes existing data', function () {
        var data;
        var itemName = 'testItem';
        tinyNgStore.InsertItem({ data: ['initData'], name: itemName })
            .subscribe(function (s) { return s ? data = s.data : data = []; });
        tinyNgStore.DeleteItem(itemName);
        expect(data.length).toBe(0);
    });
    it('Returns current state if action object not constructed properly', function () {
        var item = tinyNgStore.GetItem('incorrectly created');
        var event = { storeItem: { data: [], name: 'incorrectly created' } };
        var data;
        tinyNgStore['dispatcher'].next(event);
        item.take(1).subscribe(function (s) { return data = s; });
        expect(data).toBe(undefined);
    });
});
