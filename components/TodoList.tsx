"use client"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../constants/firebase';
import { Typography } from '@mui/material';
import TODOstyle from './Todo';
interface Todo {
    userId: string;
    title: string;
    description: string;
    status: boolean;
    timestamp?: number; // optional
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const collectionRef = collection(db, 'todos');
        const q = query(collectionRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log('Query Snapshot:', querySnapshot);

            setTodos(querySnapshot.docs.map(doc => {
                console.log('Document Data:', doc.data());

                return {
                    userId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    status: doc.data().status,
                    timestamp: doc.data().timestamp?.toDate().getTime(),
                } as Todo;
            }));
        }, (error) => {
            console.error('Error fetching data:', error);
        });

        return unsubscribe;
    }, []);

    return (
        <div>
            
            
            {todos.map((todo) => (
               <TODOstyle
                    key={todo.userId}
                    userId={todo.userId}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    timestamp={todo.timestamp}
                />
            ))}
        </div>
    );
};

export default TodoList;
