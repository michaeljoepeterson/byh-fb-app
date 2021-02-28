import React, { useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function FormTable(props){
    //const [formData,setFormData] = useState(null);

    const createTable = (forms) =>{
        let rows = forms.map(form => {
            return(<p>hi</p>)
        });
        return rows
    };

    const rows = props.forms ? createTable(props.forms) : null;

    return(
        <TableContainer>
            {rows}
        </TableContainer>
    )
}

export default FormTable;