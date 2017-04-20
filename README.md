[![Build status](https://ci.appveyor.com/api/projects/status/6r401wlebcgprnam?svg=true)](https://ci.appveyor.com/project/JScearcy/tiny-ng-store)
[![Build Status](https://travis-ci.org/JScearcy/tiny-ng-store.svg?branch=master)](https://travis-ci.org/JScearcy/tiny-ng-store)
[![npm version](https://badge.fury.io/js/tiny-ng-store.svg)](https://badge.fury.io/js/tiny-ng-store)

# tiny-ng-store

A flexible store for Angular 2 projects. 
A tiny API and small footprint allow for a quick setup.

## Docs
* [tiny-ng-store docs](https://jscearcy.github.io/tiny-ng-store/)

## Use

### Initialize
#### In your main app module
    import { TinyNgStore } from 'tiny-ng-store/tiny-ng-store';

    @NGModule({
        ...
        providers: [ TinyNgStore ]
        ...
    })
    

### Inject
    import { TinyNgStore, StoreItem, TnsState } from 'tiny-ng-store/tiny-ng-store';

    items: TnsState<any>;
    constructor(private storeService: TinyNgStore) {};

### Get Item
    this.storeService.GetItem('storeName')
* Returns a StoreItem TnsState - Map to extract data, tansform, or subscribe as necessary
    
    this.storeService.GetItem('storeName').map((s: StoreItem) => s && s.data);
* This will return a TnsState that contains either undefined (if it was never created) or the data you added to that store.

### Insert Item 
    this.storeService.InsertItem({ name: 'storeName' data: 'Any Data' });
* Use any type of data that you want
* Returns a StoreItem TnsState - Map to extract data, tansform, or subscribe as necessary

    this.storeService.InsertItem('storeName').map((s: StoreItem) => s && s.data);
* This will return a TnsState that contains the data added to that store.


### Update Item
    this.storeService.UpdateItem({ name: 'storeName' data: 'Updated Data' });

### Remove Item
    this.storeService.DeleteItem('storeName');

### Run tests   
    npm install
    npm run tests
* Runs Karma test runner and creates new results is the coverage/ folder.

#### Examples
* A collection of small examples for various Angular 2 items
    https://github.com/JScearcy/angular-2-examples

* The tiny-ng-store examples
    https://github.com/JScearcy/angular-2-examples/tree/master/src/app/tiny-ng-store-example

### Versions
#### 3.0.1
* Updated dependencies

#### 3.0.0
Breaking:
* Change TnsObservable to TnsState

Non-Breaking:
* GetItem returns TnsState that utilizes distinctUntilChanged
* Updated dependencies

#### 2.0.0
Breaking:
* Provide TnsObservable instead of Observable to prevent inheritance issues in RxJs
