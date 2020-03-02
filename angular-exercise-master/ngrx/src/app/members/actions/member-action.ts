import { Action } from "@ngrx/store";

export const HANDLECHANGE_ORGANIZATION = "HANDLE_CHANGE_ORGANIZATION";

export class MiembroChangeOrganizationAction implements Action {
  readonly type = HANDLECHANGE_ORGANIZATION;
  constructor(public payload: string) {}
}
