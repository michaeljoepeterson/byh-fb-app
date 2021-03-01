import React, { useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './styles/form-table.css';


function FormTable(props){
    //const [formData,setFormData] = useState(null);
    const formData = props.forms ? props.forms : [];

    return(
        <div className="form-table-container">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                formData.length > 0 ? formData[0].fields.map(field => {
                                    try{
                                        if(field && field.title){
                                            return(<TableCell key={field.title}>{field.title}</TableCell>
                                            );
                                        }
                                        return null;
                                    }
                                    catch(e){
                                        console.warn('Error builing headers: ', e);
                                        return null;
                                    }
                                }): 
                                null
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            formData.length > 0 ? 
                            formData.map(form => {
                                return (
                                    <TableRow>
                                        {
                                        form.fields.map(field => {
                                            if(field.type.toLowerCase().trim() === 'date'){
                                                let dateValue = new Date(field.value);
                                                return <TableCell>{dateValue.toDateString()}</TableCell>
                                            }
                                            else{
                                                return (
                                                <TableCell>{field.value}</TableCell>
                                                )
                                            }
                                        })
                                        }
                                    </TableRow>
                                );
                            })
                            : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FormTable;