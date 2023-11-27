"use client";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
<<<<<<< HEAD
import { Divider, Grid, Typography } from "@mui/material";
=======
import { Divider, Typography } from "@mui/material";
>>>>>>> 3362b061abee8f1affc2f6467cddb8789cf7c109
import ToDo from "./Todo";

interface Todo {
  userId: string;
  title: string;
  description: string;
  status: boolean;
  timestamp?: number; // optional
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
<<<<<<< HEAD

  useEffect(() => {
    console.log("useEffect triggered");
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setTodos(
          querySnapshot.docs.map((doc) => {
            console.log("Document Data:", doc.data());

            return {
              userId: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              status: doc.data().status,
              timestamp: doc.data().timestamp?.toDate().getTime(),
            } as Todo;
          })
        );
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
=======
  

  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(
      collectionRef,
      orderBy("timestamp", "asc")
    );
    

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        console.log("Query Snapshot:", querySnapshot);

        setTodos(
          querySnapshot.docs.map((doc) => {
            console.log("Document Data:", doc.data());

            return {
              userId: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              status: doc.data().status,
              timestamp: doc.data().timestamp?.toDate().getTime(),
            } as Todo;
          })
        );
         
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
>>>>>>> 3362b061abee8f1affc2f6467cddb8789cf7c109

    return unsubscribe;
  }, []);

  const completedTodos = todos.filter((todo) => todo.status === true);
  const uncompletedTodos = todos.filter((todo) => todo.status === false);

<<<<<<< HEAD
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
=======

  return (
    <div>
>>>>>>> 3362b061abee8f1affc2f6467cddb8789cf7c109
      {uncompletedTodos.map((todo) => (
        <ToDo
          key={todo.userId}
          userId={todo.userId}
          title={todo.title}
          description={todo.description}
          status={todo.status}
          timestamp={todo.timestamp}
        />
      ))}
      {completedTodos.length > 0 && (
        <>
<<<<<<< HEAD
          <Typography sx={{ mt: 5 }} variant="h5">
            Completed Todos
          </Typography>
=======
          <Typography sx={{ mt: 5 }} variant="h5">Completed Todos</Typography>
>>>>>>> 3362b061abee8f1affc2f6467cddb8789cf7c109
          <Divider sx={{ my: 2, backgroundColor: "#ccc" }} />
        </>
      )}
      {completedTodos.map((todo) => (
        <ToDo
          key={todo.userId}
          userId={todo.userId}
          title={todo.title}
          description={todo.description}
          status={todo.status}
          timestamp={todo.timestamp}
        />
      ))}
<<<<<<< HEAD
    </Grid>
=======
      
    </div>
>>>>>>> 3362b061abee8f1affc2f6467cddb8789cf7c109
  );
};

export default TodoList;
