import * as React from 'react';
import { MemberEntity } from '../../model/member';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const MemberRow = (props: { member: MemberEntity }) =>
  <TableRow>
    <TableCell >
      <img src={props.member.avatar_url} style={{ maxWidth: '10rem' }} />
    </TableCell >
    <TableCell >
      <span>{props.member.id}</span>
    </TableCell >
    <TableCell >
      <span>{props.member.login}</span>
    </TableCell >
  </TableRow>
