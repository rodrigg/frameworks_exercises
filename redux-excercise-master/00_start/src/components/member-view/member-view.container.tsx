import { connect } from "react-redux";
import { State } from "../../reducers";
import { MembersViewComponent } from "./member-view.component";
import { memberByNameRequest } from "../../actions/member.action";

const mapStateToProps = ({ memberReducer: { memberByName } }: State) => ({
  memberByName
});

const mapDispatchToProps = dispatch => {
  return {
    loadMemberByName: (name: string) => {
      return dispatch(memberByNameRequest(name));
    },
  };
};

export const MemberViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersViewComponent);
