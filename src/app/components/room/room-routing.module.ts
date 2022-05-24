import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoomListComponent } from "./room-list/room-list.component";
import { RoomComponent } from "./room.component";

const routes: Routes = [
  { path: '', component: RoomListComponent},
  { path: ':id', component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
