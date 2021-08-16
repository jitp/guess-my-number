import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { initialState } from "./state";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(initialState),
        EffectsModule.forRoot([]),
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                "CoreModule is already loaded. Import only in AppModule"
            );
        }
    }
}
