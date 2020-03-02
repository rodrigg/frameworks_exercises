import * as React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import { Typography } from "@material-ui/core";
import { MemberRowComponent } from './memberRow';
import { MemberEntity } from '../../../model/member';
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

interface Props {
  members: MemberEntity[];
  noEncontrado: boolean
}

export const MemberTableComponent = ({ members, noEncontrado }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table className={"table"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member: MemberEntity) => (
            <MemberRowComponent key={member.id} member={member} />
          ))}
        </TableBody>
      </Table>
      {
        noEncontrado && (
          <Typography color="inherit">
            No se ha encontrado usuarios
          </Typography>
        )
      }
    </TableContainer>
  );
}

