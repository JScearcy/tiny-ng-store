/// <reference path="../typings/browser.d.ts" />
/// <reference path="../typings/main/ambient/jasmine/jasmine.d.ts" />
"use strict";
var testing_1 = require('@angular/core/testing');
var tiny_ng_store_1 = require('../tiny-ng-store');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
testing_1.describe('tiny-ng-store', function () {
    var tinyNgStore;
    testing_1.beforeEachProviders(function () { return [tiny_ng_store_1.TinyNgStore]; });
    testing_1.beforeEach(testing_1.inject([tiny_ng_store_1.TinyNgStore], function (_tinyNgStore) {
        tinyNgStore = _tinyNgStore;
    }));
    testing_1.it('Creates internal state', function () {
        testing_1.expect(typeof tinyNgStore["state"]).toBe(typeof new Observable_1.Observable());
        testing_1.expect(typeof tinyNgStore["dispatcher"]).toBe(typeof new Subject_1.Subject());
    });
    testing_1.it('Contains InsertItem method', function () {
        testing_1.expect(tinyNgStore.InsertItem).toBeTruthy();
        var item = tinyNgStore.InsertItem({ data: [], name: 'testItem' });
        testing_1.expect(typeof item).toBe(typeof new Observable_1.Observable());
    });
    testing_1.it('Contains UpdateItem method', function () {
        var item = { data: ['new item'], name: 'testItem' };
        testing_1.expect(tinyNgStore.UpdateItem).toBeTruthy();
        testing_1.expect(tinyNgStore.UpdateItem(item)).toBe(undefined);
    });
    testing_1.it('Contains GetItem method', function () {
        testing_1.expect(tinyNgStore.GetItem).toBeTruthy();
        var item = tinyNgStore.GetItem('testItem');
        testing_1.expect(item).toBeTruthy();
        testing_1.expect(typeof item).toBe(typeof new Observable_1.Observable());
    });
    testing_1.it('Contains DeleteItem method', function () {
        var itemName = 'testItem';
        testing_1.expect(tinyNgStore.DeleteItem).toBeTruthy();
        testing_1.expect(tinyNgStore.DeleteItem(itemName)).toBe(undefined);
    });
    testing_1.it('Calls GetItem if InsertItem finds existing', function () {
        var item = { data: ['new item'], name: 'testItem' };
        tinyNgStore.InsertItem(item);
        spyOn(tinyNgStore, 'GetItem');
        tinyNgStore.InsertItem(item);
        testing_1.expect(tinyNgStore.GetItem).toHaveBeenCalled();
    });
});
