import { Component, OnInit } from "@angular/core";

import { MemberEntity } from "../models/member.model";
import { MembersApiService } from "../members-api.service";

@Component({
  selector: "app-members-table",
  templateUrl: "./members-table.component.html",
  styles: []
})
export class MembersTableComponent implements OnInit {
  members: MemberEntity[];
  currentOrganization: string = "";

  constructor(private membersApi: MembersApiService) {
    this.currentOrganization = "lemoncode";
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
}
