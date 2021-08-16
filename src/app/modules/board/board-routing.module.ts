import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardLayoutContainerComponent } from "./layout";

const routes: Routes = [
    {
        path: "",
        component: BoardLayoutContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardRoutingModule {}
