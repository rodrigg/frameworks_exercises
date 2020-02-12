import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const MemberHead = () => <TableHead>
    <TableRow>
        <TableCell>
            Avatar
        </TableCell>
        <TableCell>
            Id
        </TableCell>
        <TableCell>
            Name
        </TableCell>
    </TableRow>
</TableHead>
