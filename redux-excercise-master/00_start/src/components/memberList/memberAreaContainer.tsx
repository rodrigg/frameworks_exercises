import { connect } from "react-redux";
import { memberRequest } from "../../actions/memberRequest";
import { MemberAreaComponent } from "./memberArea";
import { State } from "../../reducers";

const mapStateToProps = ({ memberReducer }: State) => {
  return {
    members: memberReducer.members
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMembers: () => {
      return dispatch(memberRequest());
    }
  };
};

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberAreaComponent);
