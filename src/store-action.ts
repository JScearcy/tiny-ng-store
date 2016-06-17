export interface StoreItem {
    name: string;
    data: any;
}

export class AddItem {
    constructor(public storeItem: StoreItem) {}
}
export class RemoveItem {
    constructor(public storeItem: StoreItem) {}
}
export class UpdateItem {
    constructor(public storeItem: StoreItem) {}
}

export type StoreAction
    = AddItem
    | RemoveItem
    | UpdateItem
