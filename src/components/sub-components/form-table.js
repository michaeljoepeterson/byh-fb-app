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
    //map of field id to column data
    
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
    });

    const buildColumnMap = () => {
        let colMap = [];
        for(let i = 0;i < formData.length;i++){
            //only build from first 20 results
            //to do return possible cols from service
            if(i === 20){
                break;
            }
            formData[i].fields.forEach((field,index) => {
                let foundField = colMap.find(col => col.id === field.id);
                if(!foundField){
                    colMap.push({
                        id:field.id,
                        title:field.title
                    });
                }
            });
        }
        colMap.sort((a,b) => {
            if(a.title > b.title){
                return 1;
            }
            else{
                return -1;
            }
        })
        return colMap;
    }

    const buildHeaders = (cols) => {
        if(cols){
            let headers = cols.map(field => {
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
            })

            return headers;
        }

        return null;
    }

    const buildColumnData = (colMap) => {
        let cols = formData.map(form => {
            return (
            <TableRow>
                {
                    colMap.map((col,index) => {
                        try{
                            let foundField = form.fields.find(field => field.id === col.id);
                            if(foundField){
                                if(foundField.type && foundField.type.toLowerCase().trim() === 'date'){
                                    let dateValue = new Date(foundField.value);
                                    return <TableCell key={foundField.id + foundField.value}>{dateValue.toDateString()}</TableCell>
                                }
                                else{
                                    return (
                                    <TableCell key={foundField.id + foundField.value}>{foundField.value}</TableCell>
                                    )
                                }
                            }
                            else{
                                return (<TableCell key={col.id + index}></TableCell>)
                            }
                        }
                        catch(e){
                            console.warn('error building cols',e);
                            return (<TableCell key={col.id + index}></TableCell>)
                        }
                    })
                }
            </TableRow>
            );
        });

        return cols;

    }

    let columnMap = formData && formData.length > 0 ? buildColumnMap() : [];

    return(
        <TableContainer className="form-table-container" component={Paper}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        {buildHeaders(columnMap)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buildColumnData(columnMap)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FormTable;