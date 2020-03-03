import { connect } from "react-redux";
import { memberListRequest, memberChangeFiltro, memberScroll } from "../../actions/member.action";
import { MemberAreaComponent } from "./memberArea";
import { State } from "../../reducers";
import { FiltroMembers } from "../../model/filtromembers.vm";

const mapStateToProps = ({ memberReducer }: State) => ({
  memberState: memberReducer
});

const mapDispatchToProps = dispatch => {
  return {
    loadMembers: (page: number, nameOrganization: string) => {
      return dispatch(memberListRequest(page, nameOrganization));
    },
    handleChangeFiltro: (name: keyof FiltroMembers, value: string) => dispatch(memberChangeFiltro(name, value)),
    setFetchingScroll: (isFetchingScroll: boolean) => dispatch(memberScroll(isFetchingScroll))
  };
};

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberAreaComponent);
