/// <reference path="../typings/browser.d.ts" />
/// <reference path="../typings/main/ambient/jasmine/jasmine.d.ts" />
"use strict";
var testing_1 = require('@angular/core/testing');
var tiny_ng_store_1 = require('../tiny-ng-store');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/take');
testing_1.describe('tiny-ng-store', function () {
    var tinyNgStore;
    var blankObservable;
    testing_1.beforeEachProviders(function () { return [tiny_ng_store_1.TinyNgStore]; });
    testing_1.beforeEach(testing_1.inject([tiny_ng_store_1.TinyNgStore], function (_tinyNgStore) {
        tinyNgStore = _tinyNgStore;
        blankObservable = new Observable_1.Observable();
    }));
    testing_1.it('Creates internal state', function () {
        testing_1.expect(typeof tinyNgStore["state"]).toBe(typeof new Observable_1.Observable());
        testing_1.expect(typeof tinyNgStore["dispatcher"]).toBe(typeof new Subject_1.Subject());
    });
    testing_1.it('Contains InsertItem method', function () {
        testing_1.expect(tinyNgStore.InsertItem).toBeTruthy();
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        testing_1.expect(typeof item).toBe(typeof blankObservable);
    });
    testing_1.it('InsertItem method inserts the correct data', function () {
        var data;
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        testing_1.expect(data.length).toBe(1);
        testing_1.expect(data[0]).toBe('testData');
    });
    testing_1.it('Insert item twice updates existing item', function () {
        var data;
        testing_1.expect(tinyNgStore.InsertItem).toBeTruthy();
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        var item = tinyNgStore.InsertItem({ data: ['testData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        testing_1.expect(data.length).toBe(1);
        testing_1.expect(data[0]).toBe('testData');
    });
    testing_1.it('Contains UpdateItem method', function () {
        var item = { data: ['testData'], name: 'testItem' };
        testing_1.expect(tinyNgStore.UpdateItem).toBeTruthy();
        testing_1.expect(tinyNgStore.UpdateItem(item)).toBe(undefined);
    });
    testing_1.it('UpdateItem method properly updates data', function () {
        var data;
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' })
            .subscribe(function (s) { return data = s.data; });
        tinyNgStore.UpdateItem({ data: ['testData'], name: 'testItem' });
        testing_1.expect(data.length).toBe(1);
        testing_1.expect(data[0]).toBe('testData');
    });
    testing_1.it('Contains GetItem method', function () {
        testing_1.expect(tinyNgStore.GetItem).toBeTruthy();
        var item = tinyNgStore.GetItem('testItem');
        testing_1.expect(item).toBeTruthy();
        testing_1.expect(typeof item).toBe(typeof blankObservable);
    });
    testing_1.it('GetItem method returns observable that updates data', function () {
        var data;
        var item = tinyNgStore.GetItem('testItem');
        tinyNgStore.InsertItem({ data: ['initData'], name: 'testItem' });
        item.take(1).subscribe(function (s) { return data = s.data; });
        testing_1.expect(data.length).toBe(1);
        testing_1.expect(data[0]).toBe('initData');
    });
    testing_1.it('Contains DeleteItem method', function () {
        var itemName = 'testItem';
        testing_1.expect(tinyNgStore.DeleteItem).toBeTruthy();
        testing_1.expect(tinyNgStore.DeleteItem(itemName)).toBe(undefined);
    });
    testing_1.it('DeleteItem method removes existing data', function () {
        var data;
        var itemName = 'testItem';
        tinyNgStore.InsertItem({ data: ['initData'], name: itemName })
            .subscribe(function (s) { return s ? data = s.data : data = []; });
        tinyNgStore.DeleteItem(itemName);
        testing_1.expect(data.length).toBe(0);
    });
});
