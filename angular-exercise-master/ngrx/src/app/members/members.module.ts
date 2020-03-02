import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import {
  MemberRowComponent,
  MemberHeadComponent,
  MembersTableComponent
} from "./members-table";
import { StoreModule } from "@ngrx/store";
import { memberReducer } from "./reducers/members-reducer";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature("miembros", memberReducer)
  ],
  declarations: [
    MemberRowComponent,
    MemberHeadComponent,
    MembersTableComponent
  ],
  exports: [MembersTableComponent]
})
export class MembersModule {}
