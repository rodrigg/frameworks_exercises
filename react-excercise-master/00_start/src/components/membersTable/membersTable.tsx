import * as React from "react";
import { MemberEntity } from "../../model/member";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMembers } from "../../hooks/member.hook";
import { Typography } from "@material-ui/core";

export const MembersTableComponent: React.FC = () => {
  const {
    loadMembers,
    members,
    isFetchingMore,
    handleChangeFiltro,
    error,
    noEncontrado,
    filtroMiembros: { nameOrganization },
    fetchingFirst,
    hasMore
  } = useMembers();

  return (
    <div className="row">
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
        onChange={e => handleChangeFiltro("nameOrganization", e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMembers(1)}
      >
        Load
      </Button>

      <TableContainer component={Paper}>
        <Table className={"table"} aria-label="simple table">
          <MemberHead />
          {noEncontrado && (
            <Typography color="inherit">
              No se ha encontrado usuarios
            </Typography>
          )}
          <TableBody>
            {members.map((member: MemberEntity) => (
              <MemberRow key={member.id} member={member} />
            ))}
            {isFetchingMore && hasMore && (
              <div className="spinner">
                <CircularProgress size={20} />
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
