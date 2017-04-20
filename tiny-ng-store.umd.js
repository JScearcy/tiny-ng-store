var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "rxjs/Observable", "rxjs/Subject", "rxjs/BehaviorSubject", "rxjs/add/operator/scan", "rxjs/add/operator/map", "rxjs/add/operator/take", "rxjs/add/operator/distinctUntilChanged"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var Observable_1 = require("rxjs/Observable");
    var Subject_1 = require("rxjs/Subject");
    var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
    require("rxjs/add/operator/scan");
    require("rxjs/add/operator/map");
    require("rxjs/add/operator/take");
    require("rxjs/add/operator/distinctUntilChanged");
    /**
     * A type of Observable<T> representing the store Observable
     * @export
     * @class TnsState
     * @extends {Observable<T>}
     * @template T
     */
    var TnsState = (function (_super) {
        __extends(TnsState, _super);
        function TnsState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TnsState;
    }(Observable_1.Observable));
    exports.TnsState = TnsState;
    /**
     * This class represents and data added into the store
     * Name your store item, and provide data
     * @export
     * @class StoreItem
     * @property {string} name - This is the name of the data stored
     * @property {any} data - This is the data stored under the name provided
     */
    var StoreItem = (function () {
        function StoreItem() {
        }
        return StoreItem;
    }());
    exports.StoreItem = StoreItem;
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
    /**
     * Class representing the data store
     * Creates an instance of TinyNgStore.
     * @export
     * @class TinyNgStore
     */
    var TinyNgStore = (function () {
        function TinyNgStore() {
            this.dispatcher = new Subject_1.Subject();
            this.state = this.storeInit([], this.dispatcher);
        }
        /**
         * Insert an item into the data store
         * This will return TnsState<StoreItem> representing that object inserted
         * @param {StoreItem} storeItem - StoreItem class representing your data
         * @returns {TnsState<StoreItem>}
         * @memberOf TinyNgStore
         */
        TinyNgStore.prototype.InsertItem = function (storeItem) {
            this.dispatcher.next(new AddItem(storeItem));
            return this.GetItem(storeItem.name);
        };
        /**
         * Delete an item from the data store
         * @param {string} name - This is the name of the data stored
         * @memberOf TinyNgStore
         */
        TinyNgStore.prototype.DeleteItem = function (name) {
            this.dispatcher.next(new RemoveItem({ name: name }));
        };
        /**
         * Update and item within the data store
         * If the item does not exist, nothing will be created
         * @param {StoreItem} storeItem - StoreItem class representing your data
         * @memberOf TinyNgStore
         */
        TinyNgStore.prototype.UpdateItem = function (storeItem) {
            this.dispatcher.next(new UpdateItem(storeItem));
        };
        /**
         * Retrieve an item from the data store
         * This will return TnsState<StoreItem> representing that object
         * @param {string} name - This is the name of the data stored
         * @returns {TnsState<StoreItem>}
         * @memberOf TinyNgStore
         */
        TinyNgStore.prototype.GetItem = function (name) {
            return this.state.map(function (s) { return s.filter(function (si) { return si.name === name; })[0]; }).distinctUntilChanged();
        };
        TinyNgStore.prototype.storeInit = function (initState, actions) {
            var behavior = new BehaviorSubject_1.BehaviorSubject(initState);
            this.store(initState, actions).subscribe(function (s) { return behavior.next(s); });
            return behavior;
        };
        TinyNgStore.prototype.store = function (initState, actions) {
            var _this = this;
            return actions.scan(function (state, action) {
                switch (action.constructor) {
                    case AddItem:
                        var filteredStore = state.filter(function (s) { return action.storeItem.name !== s.name; });
                        return filteredStore.concat([action.storeItem]);
                    case RemoveItem:
                        return state.filter(function (s) { return s.name !== action.storeItem.name; });
                    case UpdateItem:
                        return state.map(function (s) { return s.name !== action.storeItem.name ? s : _this.updateItem(action.storeItem); });
                    default:
                        return state;
                }
                /* tslint:disable */
            }, initState);
            /* tslint:enable */
        };
        TinyNgStore.prototype.updateItem = function (item) {
            var updatedItem = {};
            Object.keys(item).map(function (key) { return updatedItem[key] = item[key]; });
            return updatedItem;
        };
        return TinyNgStore;
    }());
    TinyNgStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TinyNgStore);
    exports.TinyNgStore = TinyNgStore;
});
