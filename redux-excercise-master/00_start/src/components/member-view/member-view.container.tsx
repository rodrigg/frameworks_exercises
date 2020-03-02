import { connect } from "react-redux";
import { State } from "../../reducers";
import { MembersViewComponent } from "./member-view.component";
import { memberByName } from "../../actions/memberRequest";

const mapStateToProps = ({ memberReducer: { memberByName } }: State) => ({
  memberByName
});

const mapDispatchToProps = dispatch => {
  return {
    loadMemberByName: (name: string) => {
      return dispatch(memberByName(name));
    },
  };
};

export const MemberViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersViewComponent);
