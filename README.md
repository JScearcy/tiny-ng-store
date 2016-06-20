[![Build status](https://ci.appveyor.com/api/projects/status/6r401wlebcgprnam?svg=true)](https://ci.appveyor.com/project/JScearcy/tiny-ng-store)
[![npm version](https://badge.fury.io/js/tiny-ng-store.svg)](https://badge.fury.io/js/tiny-ng-store)

# tiny-ng-store

A flexible store for Angular 2 projects. 
A tiny API and small footprint allow for a quick and efficient setup.



## Use

### Initialize
    import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';

    bootstrap(NameHere, [TinyNgStore]);

### Inject
    import {TinyNgStore, StoreItem} from 'tiny-ng-store/tiny-ng-store';

    constructor(private storeService: TinyNgStore) {};

### Get Item
    this.storeService.GetItem('storeName')

### Insert Item 
    this.storeService.InsertItem({ name: 'storeName' data: 'Any Data' });
Use any type of data that you want. 

### Update Item
    this.storeService.UpdateItem({ name: 'storeName' data: 'Updated Data' });

### Remove Item
    this.storeService.DeleteItem('storeName');

### Run tests   
    npm install
    npm run tests
This will run live server and open the tiny-ng-store.spec.html file in browser.
