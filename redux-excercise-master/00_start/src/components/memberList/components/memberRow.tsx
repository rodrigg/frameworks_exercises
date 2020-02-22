import * as React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MemberEntity } from "../../../model/member";

interface Props {
  member: MemberEntity;
}

export const MemberRowComponent: React.FC<Props> = ({ member }: Props) => (
  <TableRow>
    <TableCell>
      <Avatar src={member.avatar_url}></Avatar>
    </TableCell>
    <TableCell>{member.id}</TableCell>
    <TableCell>{member.login}</TableCell>
    <TableCell>
      <Link to={`/miembros/${member.login}`}>Editar</Link>
    </TableCell>
  </TableRow>
);
