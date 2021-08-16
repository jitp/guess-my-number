import { Injectable, OnDestroy } from "@angular/core";
import { Action, createSelector, Store } from "@ngrx/store";
import { combineLatest, Observable, ReplaySubject } from "rxjs";
import {
    distinctUntilChanged,
    map,
    shareReplay,
    takeUntil,
} from "rxjs/operators";

export interface SelectConfig {
    featureKey?: string;
}

export declare type SelectorResults<Selectors extends Observable<unknown>[]> = {
    [Key in keyof Selectors]: Selectors[Key] extends Observable<infer U>
        ? U
        : never;
};
export declare type Projector<
    Selectors extends Observable<unknown>[],
    Result
> = (...args: SelectorResults<Selectors>) => Result;

@Injectable()
export abstract class BaseStore<S> implements OnDestroy {
    private readonly destroySubject$;
    readonly destroy$: Observable<void>;

    constructor(private readonly store: Store<S>) {
        // Should be used only in ngOnDestroy.
        this.destroySubject$ = new ReplaySubject<void>(1);
        // Exposed to any extending Store to be used for the teardown.
        this.destroy$ = this.destroySubject$.asObservable();
    }

    ngOnDestroy(): void {
        this.destroySubject$.next();
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }

    select<Result, F = S>(
        projector: (s: F) => Result,
        settings?: SelectConfig
    ): Observable<Result>;
    select<Selectors extends Observable<unknown>[], Result>(
        ...args: [
            ...selectors: Selectors,
            projector: Projector<Selectors, Result>
        ]
    ): Observable<Result>;
    select<Selectors extends Observable<unknown>[], Result>(
        ...args: [
            ...selectors: Selectors,
            projector: Projector<Selectors, Result>,
            settings: SelectConfig
        ]
    ): Observable<Result>;
    select(...args: any) {
        const { observables, projector, config } = processSelectorArgs(args);

        let observable$;

        if (observables.length === 0) {
            const storeState = (state: S) =>
                config.featureKey ? state[config.featureKey as keyof S] : state;

            observable$ = this.store.select(
                createSelector(storeState, projector)
            );
        } else {
            observable$ = combineLatest(observables).pipe(
                map((projectorArgs) => projector(...projectorArgs))
            );
        }

        return observable$.pipe(
            distinctUntilChanged(),
            shareReplay({
                refCount: true,
                bufferSize: 1,
            }),
            takeUntil(this.destroy$)
        );
    }
}

function processSelectorArgs<Selectors extends Observable<unknown>[], Result>(
    args: [projector: Projector<Selectors, Result>]
): {
    observables: Selectors;
    projector: Projector<Selectors, Result>;
    config: SelectConfig;
};
function processSelectorArgs<Selectors extends Observable<unknown>[], Result>(
    args: [...selectors: Selectors, projector: Projector<Selectors, Result>]
): {
    observables: Selectors;
    projector: Projector<Selectors, Result>;
    config: SelectConfig;
};
function processSelectorArgs<Selectors extends Observable<unknown>[], Result>(
    args: [
        ...selectors: Selectors,
        projector: Projector<Selectors, Result>,
        config: SelectConfig
    ]
): {
    observables: Selectors;
    projector: Projector<Selectors, Result>;
    config: SelectConfig;
};
function processSelectorArgs(args: any[]) {
    const selectorArgs = Array.from(args);
    // Assign default values.
    let settings = { featureKey: "" };

    let projector;

    // Last argument is either projector or config
    const projectorOrConfig = selectorArgs.pop();

    if (typeof projectorOrConfig !== "function") {
        // We got the config as the last argument, replace any default values with it.
        settings = Object.assign(
            Object.assign({}, settings),
            projectorOrConfig
        );
        // Pop the next args, which would be the projector fn.
        projector = selectorArgs.pop();
    } else {
        projector = projectorOrConfig;
    }

    const observables = selectorArgs;

    return {
        observables,
        projector,
        config: settings,
    };
}
