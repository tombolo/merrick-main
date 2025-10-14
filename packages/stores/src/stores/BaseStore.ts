import { action, makeObservable, observable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';

export default class BaseStore<T> {
    data: T | undefined = undefined;

    constructor(name: string, onHydrationDone?: VoidFunction) {
        makeObservable(this, {
            data: observable,
            update: action.bound,
            unmount: action.bound,
        });

        makePersistable(this, { name, properties: ['data'], storage: window.localStorage }).then(() =>
            onHydrationDone?.()
        );
    }

    update(data: NonNullable<T> | ((previous?: T) => NonNullable<T>)) {
        this.data = data instanceof Function ? data(this.data) : data;
    }

    unmount() {
        stopPersisting(this);
    }
}
