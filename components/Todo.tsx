"use client"
import { Box, Button, Card, CardActions, CardContent, Checkbox, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../constants/firebase';
import { TodoContext } from '@/app/TodoContext';
import theme from '@/app/theme';
interface Todo {
    userId: string;
    title: string;
    description: string;
    status: boolean;
    timestamp?: number; // optional
}



const Todostyle = ({ userId, timestamp, title, description,status }: Todo) => {
    // @ts-ignore
    const { showAlert, todos, setTodos } = useContext(TodoContext);

    const deleteTodo = async (userId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const docRef = doc(db, 'todos', userId);
        await deleteDoc(docRef);
        showAlert('error', 'Todo Deleted Successfully');
    }

    const oncheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const isChecked = e.target.checked;
        const docRef = doc(db, 'todos', userId);
        await updateDoc(docRef, {status: isChecked,timestamp: serverTimestamp()})
        showAlert('info', `Todo ${isChecked ? 'Completed' : 'Uncompleted'} Successfully`)
    }
    return (
        <>
            <ListItem 
                sx={{ mt: 3, 
                    boxshadow: 8,
                    backgroundColor: status ? 'lightcoral' : '#4B4B4A',
                    textDecoration: status ? 'line-through' : 'none',
                    borderBottom: '1px solid #A8A7A5'
                 }}
                
                secondaryAction={
                    <>
                        <IconButton sx={{color:"red"}} onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteTodo(userId, e)}>
                            <DeleteIcon />
                        </IconButton>
                        <Checkbox
                             key={userId}
                            checked={status}
                            onChange={oncheckbox}
                            sx={{
                                '& .MuiSvgIcon-root': {
                                fill: 'white',
                                },
                            }}
                        />

                    
                    </>
                }
                        
            >
                <ListItemText primary={
                       <Typography
                       variant="h5" 
                       fontWeight="bold"
                       color={"#E3C33E" }>{title}</Typography>
                   } 
                   
                   secondary={<Typography color={'white'}>
                    {moment(timestamp).format('MMMM Do YYYY, h:mm A')}
                    </Typography>}>

                    </ListItemText>
            </ListItem>




            <Card sx={{ minWidth: 275,
              backgroundColor: status ? 'lightcoral' : '#4B4B4A',
              textDecoration: status ? 'line-through' : 'none',}}>
                <CardContent>
                    <Typography sx={{ mt: 1.5 , fontSize: 18,color:'white'} }variant="body2">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" disabled={status? true : false}
                    onClick={() => {
                        setTodos({ userId, timestamp, title, description, status });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    >Click to Update</Button>
                </CardActions>
            </Card>
        </>
    )


};

export default Todostyle;
