import * as React from "react";
import { MemberTableComponent } from "./components/memberTable";
import { MemberEntity } from "../../model/member";
import { memberState } from "../../reducers/memberReducer";
import useInfiniteScroll from "../../hooks/infinitite-scroll.hook";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FiltroMembers } from "../../model/filtromembers.vm";

interface Props {
  memberState: memberState;
  loadMembers: (page: number, nameOrganization: string) => any;
  setFetchingScroll(isFetchingScroll: boolean): void;
  handleChangeFiltro: (name: keyof FiltroMembers, value: any) => void
}

export const MemberAreaComponent = (props: Props) => {
  const { members,
    isFetchingMore,
    error,
    noEncontrado,
    filtroMiembros: { nameOrganization },
    fetchingFirst,
    hasMore,
    pageCount

  } = props.memberState
  useInfiniteScroll(props.memberState.isFetchingMore, props.setFetchingScroll);

  React.useEffect(() => { props.loadMembers(1, nameOrganization) }, []);
  React.useEffect(() => {
    isFetchingMore && pageCount !== 1 && hasMore && props.loadMembers(pageCount, nameOrganization);
  }, [isFetchingMore]);

  return (
    <div>

      <h2> Members Page</h2>
      {error && (
        <Typography color="error">
          Se ha producido un error en la llamada
        </Typography>
      )}

      {fetchingFirst && (
        <div className="spinner">
          <CircularProgress size={100} />
        </div>
      )}
      <TextField
        id="standard-basic"
        label="Standard"
        value={nameOrganization}
        onChange={e => props.handleChangeFiltro("nameOrganization", e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.loadMembers(1, nameOrganization)}
      >
        Load
      </Button>
      <MemberTableComponent members={members} noEncontrado={noEncontrado} />
      {isFetchingMore && hasMore && (
        <div className="spinner">
          <CircularProgress size={20} />
        </div>
      )}
    </div>
  );
};
