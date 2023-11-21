"use client";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { Divider, Grid, Typography } from "@mui/material";
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

    return unsubscribe;
  }, []);

  const completedTodos = todos.filter((todo) => todo.status === true);
  const uncompletedTodos = todos.filter((todo) => todo.status === false);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
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
          <Typography sx={{ mt: 5 }} variant="h5">
            Completed Todos
          </Typography>
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
    </Grid>
  );
};

export default TodoList;
