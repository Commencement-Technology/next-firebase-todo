"use client"
import { Button, TextField } from '@mui/material';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { TodoContext } from '@/app/TodoContext';



const TodoForm: React.FC = () => {

    interface Todo {
        title: string;
        description: string;
    }

    const inputAreaRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    // @ts-ignore
    const { showAlert, todos, setTodos } = useContext(TodoContext);

    const onSubmit = async () => {
        try {
            if (todos?.hasOwnProperty('timestamp')) {
                const docRef = doc(db, 'todos', todos.userId);
                await updateDoc(docRef, { ...todos, timestamp: serverTimestamp() })
                showAlert('info', 'Todo Updated Successfully')

            } else {
                const collectionRef = collection(db, 'todos');
                const docref = await addDoc(collectionRef, { ...todos, status: false, timestamp: serverTimestamp() })
                setTodos({ title: '', description: '' })
                showAlert('success', 'Todo Added Successfully')

            }
        }
        catch (error) {
            console.error('Error adding data:', error);
        }


    }

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (inputAreaRef.current && !inputAreaRef.current.contains(e.target as Node)) {
                console.log('You clicked outside of me!');
                setTodos({ title: '', description: '' })
            } else {
                console.log('You clicked inside of me!');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);


        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [])

//"#4B4B4A"


    return (
        <div style={{backgroundColor:"#4B4B4A",padding:"10px"}} ref={inputAreaRef}>
            {/* <pre>{JSON.stringify(todos)}</pre> */}
            <TextField fullWidth label="title" margin='normal' sx={{backgroundColor:"white"}}
                value={todos.title}
                onChange={e => setTodos({ ...todos, title: e.target.value })}></TextField>
            <TextField fullWidth label="description" multiline maxRows={4} sx={{backgroundColor:"white", borderradius:20}}
                value={todos.description}
                onChange={e => setTodos({ ...todos, description: e.target.value })}></TextField>
            <Button onClick={onSubmit} sx={{ mt: 3, mb: 3 }} variant="contained" color="primary">{todos.
            hasOwnProperty("timestamp")?"UPDATE TODO":"ADD A NEW TODO"}</Button>
        </div>
    );
}

export default TodoForm;
