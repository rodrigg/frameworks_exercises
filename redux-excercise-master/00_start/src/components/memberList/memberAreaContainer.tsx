import { connect } from "react-redux";
import { memberRequest } from "../../actions/memberRequest";
import { MemberAreaComponent } from "./memberArea";
import { State } from "../../reducers";
import { memberScroll } from "../../actions/memberScroll";

const mapStateToProps = ({ memberReducer }: State) => ({
  memberState: memberReducer
});

const mapDispatchToProps = dispatch => {
  return {
    loadMembers: (page: number) => {
      return dispatch(memberRequest(page));
    },
    setFetchingScroll: () => dispatch(memberScroll())
  };
};

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberAreaComponent);
