import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Container, CircularProgress  } from '@material-ui/core';

import { ConvertBalanceToBZZ } from '../../utils/common';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface Settlement {
    received: number,
    sent: number,
    peer: string,
}

interface Settlements {
    settlements: Array<Settlement>,
    totalreceived: number,
    totalsent: number,
}

interface IProps {
    nodeSettlements: Settlements,
    loading?: boolean,
}
  
function SettlementsTable(props: IProps) {
    const classes = useStyles();

    return (
        <div>
            {props.loading ? 
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
             <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Peer</TableCell>
                        <TableCell>Received (BZZ)</TableCell>
                        <TableCell>Sent (BZZ)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.nodeSettlements.settlements.map((item: Settlement, idx: number) => (
                        <TableRow key={item.peer}>
                        <TableCell>{item.peer}</TableCell>
                        <TableCell style={{ fontFamily: 'monospace, monospace'}}>
                            {item.received > 0 ? ConvertBalanceToBZZ(item.received).toFixed(7).toLocaleString() : item.received}
                            </TableCell>
                        <TableCell style={{ fontFamily: 'monospace, monospace'}}>
                            {item.sent > 0 ? ConvertBalanceToBZZ(item.sent).toFixed(7).toLocaleString() : item.sent}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    )
}

export default SettlementsTable;
