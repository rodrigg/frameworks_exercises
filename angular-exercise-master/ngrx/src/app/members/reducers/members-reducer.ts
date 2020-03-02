import * as membersActions from "../actions/member-action";

export interface MemberState {
  currentNameOrganization: string;
}
const initialState: MemberState = { currentNameOrganization: "lemoncode" };
export const memberReducer = (
  state: MemberState = initialState,
  action: membersActions.MiembroChangeOrganizationAction
): MemberState => {
  switch (action.type) {
    case membersActions.HANDLECHANGE_ORGANIZATION:
      return {
        ...state,
        currentNameOrganization: action.payload
      };
    default:
      return state;
  }
};
