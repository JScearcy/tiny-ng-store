[![Build status](https://ci.appveyor.com/api/projects/status/6r401wlebcgprnam?svg=true)](https://ci.appveyor.com/project/JScearcy/tiny-ng-store)
[![Build Status](https://travis-ci.org/JScearcy/tiny-ng-store.svg?branch=master)](https://travis-ci.org/JScearcy/tiny-ng-store)
[![npm version](https://badge.fury.io/js/tiny-ng-store.svg)](https://badge.fury.io/js/tiny-ng-store)

# tiny-ng-store

A flexible store for Angular 2 projects. 
A tiny API and small footprint allow for a quick setup.



## Use

### Initialize
    import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';

    bootstrap(NameHere, [TinyNgStore]);

### Inject
    import {TinyNgStore, StoreItem} from 'tiny-ng-store/tiny-ng-store';

    constructor(private storeService: TinyNgStore) {};

### Get Item
    this.storeService.GetItem('storeName')
* Returns a StoreItem Observable - Map a function to extract data and tansform or subscribe as necessary
    
    this.storeService.GetItem('storeName').map((s: StoreItem) => s && s.data);
* This will return an observable that contains either undefined (if it was never created) or the data you added to that store.

### Insert Item 
    this.storeService.InsertItem({ name: 'storeName' data: 'Any Data' });
* Use any type of data that you want
* Returns a StoreItem Observable - Map a function to extract data and tansform or subscribe as necessary

    this.storeService.InsertItem('storeName').map((s: StoreItem) => s && s.data);
* This will return an observable that contains the data added to that store.


### Update Item
    this.storeService.UpdateItem({ name: 'storeName' data: 'Updated Data' });

### Remove Item
    this.storeService.DeleteItem('storeName');

### Run tests   
    npm install
    npm run tests
* Runs Karma test runner and creates new results is the coverage/ folder.


#### Examples
* A small Angular 2 app that will track the amount of searches on page load. Including a systemjs config file.

    https://github.com/JScearcy/ng2-github-starter
