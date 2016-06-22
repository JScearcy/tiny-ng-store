"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/map');
var AddItem = (function () {
    function AddItem(storeItem) {
        this.storeItem = storeItem;
    }
    return AddItem;
}());
var RemoveItem = (function () {
    function RemoveItem(storeItem) {
        this.storeItem = storeItem;
    }
    return RemoveItem;
}());
var UpdateItem = (function () {
    function UpdateItem(storeItem) {
        this.storeItem = storeItem;
    }
    return UpdateItem;
}());
var TinyNgStore = (function () {
    function TinyNgStore() {
        this.dispatcher = new Subject_1.Subject();
        this.state = this.storeInit([], this.dispatcher);
    }
    TinyNgStore.prototype.InsertItem = function (storeItem) {
        this.dispatcher.next(new AddItem(storeItem));
        return this.GetItem(storeItem.name);
    };
    TinyNgStore.prototype.DeleteItem = function (name) {
        this.dispatcher.next(new RemoveItem({ name: name }));
    };
    TinyNgStore.prototype.UpdateItem = function (storeItem) {
        this.dispatcher.next(new UpdateItem(storeItem));
    };
    TinyNgStore.prototype.GetItem = function (name) {
        return this.state.map(function (s) {
            return s.find(function (si) { return si.name === name; });
        });
    };
    TinyNgStore.prototype.store = function (initState, actions) {
        var _this = this;
        return actions.scan(function (state, action) {
            state = state || [];
            switch (action.constructor) {
                case AddItem:
                    var exists = state.filter(function (s) { return action.storeItem.name === s.name; });
                    if (exists.length <= 0) {
                        return state.concat([action.storeItem]);
                    }
                    else {
                        return _this.dispatcher.next(new UpdateItem(action.storeItem));
                    }
                case RemoveItem:
                    return state.filter(function (s) { return s.name !== action.storeItem.name; });
                case UpdateItem:
                    return state.map(function (s) { return s.name !== action.storeItem.name ? s : _this.updateItem(action.storeItem); });
                default:
                    return state;
            }
        }, initState);
    };
    TinyNgStore.prototype.storeInit = function (initState, actions) {
        var sub = new BehaviorSubject_1.BehaviorSubject(initState);
        this.store(initState, actions).subscribe(function (s) { return sub.next(s); });
        return sub;
    };
    TinyNgStore.prototype.updateItem = function (item) {
        var updatedItem = {};
        Object.keys(item).map(function (key) { return updatedItem[key] = item[key]; });
        return updatedItem;
    };
    TinyNgStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TinyNgStore);
    return TinyNgStore;
}());
exports.TinyNgStore = TinyNgStore;
