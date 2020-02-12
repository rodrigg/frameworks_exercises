import * as React from "react";
import { MemberEntity } from "../../model/member";
import { memberAPI } from "../../api/memberAPI";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMembers } from "../../hooks/member.hook";

interface Props { }

export const MembersTableComponent = (props: Props) => {
  const { loadMembers, members, promiseInProgress, handleChangeFiltro }
    = useMembers()

  return (
    <div className="row">
      <h2> Members Page</h2>
      <TextField
        id="standard-basic"
        label="Standard"
        onChange={e => handleChangeFiltro("nameOrganization", e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={loadMembers}>Load</Button>


      <TableContainer component={Paper}>
        <Table className={"table"} aria-label="simple table">
          <MemberHead />
          <TableBody>
            {members.map((member: MemberEntity) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {promiseInProgress && (
        < div className="spinner">
          <CircularProgress size={100} />
        </div>)
      }
    </div >
  );
};
