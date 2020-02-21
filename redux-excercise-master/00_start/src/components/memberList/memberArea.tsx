import * as React from "react";
import { MemberTableComponent } from "./components/memberTable";
import { MemberEntity } from "../../model/member";
import { memberState } from "../../reducers/memberReducer";
import useInfiniteScroll from "../../hooks/infinitite-scroll.hook";

interface Props {
  memberState: memberState;
  loadMembers: (page: number) => any;
  setFetchingScroll(): void;
}

export const MemberAreaComponent = (props: Props) => {
  React.useEffect(() => props.loadMembers(1), []);
  useInfiniteScroll(props.memberState.isFetchingMore, props.setFetchingScroll);
  return (
    <div>
      <MemberTableComponent members={props.memberState.members} />
      <br />
      <input
        type="submit"
        value="load"
        className="btn btn-default"
        onClick={() => props.loadMembers(1)}
      />
    </div>
  );
};
