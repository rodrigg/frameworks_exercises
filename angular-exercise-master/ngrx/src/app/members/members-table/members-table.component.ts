import { Component, OnInit } from "@angular/core";

import { MemberEntity } from "../models/member.model";
import { MembersApiService } from "../members-api.service";
import { Store } from "@ngrx/store";
import { State } from "src/app/reducers";
import { MiembroChangeOrganizationAction } from "../actions";

@Component({
  selector: "app-members-table",
  templateUrl: "./members-table.component.html",
  styles: []
})
export class MembersTableComponent implements OnInit {
  members: MemberEntity[];
  currentOrganization: string = "";

  constructor(
    private membersApi: MembersApiService,
    private store: Store<State>
  ) {
    this.store.select("miembros").subscribe(result => {
      this.currentOrganization = result.currentNameOrganization;
    });
  }
  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.membersApi.getAllMembers(this.currentOrganization).subscribe(
      ms => (this.members = ms),
      error => console.log(error)
    );
  }
  onChange($event) {
    this.store.dispatch(new MiembroChangeOrganizationAction($event.target.value));
  }
}
