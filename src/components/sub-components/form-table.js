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
    let formData = props.forms ? [...props.forms] : [];
    formData = formData.map(form => {
        form.fields = form.fields.sort((a,b) => {
            if(a.title < b.title){
                return -1;
            }
            else{
                return 1;
            }
        });

        return form;
    })

    return(
        <TableContainer className="form-table-container" component={Paper}>
            <Table stickyHeader >
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
                        formData.map((form,i) => {
                            return (
                                <TableRow key={i}>
                                    {
                                    form.fields.map(field => {
                                        if(field.type && field.type.toLowerCase().trim() === 'date'){
                                            let dateValue = new Date(field.value);
                                            return <TableCell key={field.id + field.value}>{dateValue.toDateString()}</TableCell>
                                        }
                                        else{
                                            return (
                                            <TableCell key={field.id + field.value}>{field.value}</TableCell>
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
    )
}

export default FormTable;