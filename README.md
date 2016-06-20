# tiny-ng-store

A flexible store for Angular 2 projects. 
A tiny API and small footprint allow for a quick and efficient setup.



## Use

### Initialize
    import {TinyNgStore} from 'tiny-ng-store/tiny-ng-store';

    bootstrap(NameHere, [TinyNgStore]);

### Inject
    import {TinyNgStore, StoreItem} from 'tiny-ng-store/tiny-ng-store';

    constructor(private storeService: TinyNgStore

### Get Item
    this.storeService.GetItem('storeName')

### Insert Item 
    this.storeService.InsertItem({ name: 'storeName' data: 'Any Data' });
Use any type of data that you want. 

### Update Item
    this.storeService.UpdateItem({ name: 'storeName' data: 'Updated Data' });

### Remove Item
    this.storeService.DeleteItem({ name: 'storeName' data: 'Any Data' });

