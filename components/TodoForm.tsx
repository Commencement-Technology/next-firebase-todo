"use client";
import { Button, Divider, TextField, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../utils/firebase";
import { TodoContext } from "@/app/TodoContext";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";


const TodoForm: React.FC = () => {
  interface Todo {
    title: string;
    description: string;
  }

  

  const inputAreaRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  // @ts-ignore
  const { showAlert, todos, setTodos } = useContext(TodoContext);

  const onSubmit = async () => {
    try {
      if (todos?.hasOwnProperty("timestamp")) {
        const docRef = doc(db, "todos", todos.userId);
        await updateDoc(docRef, { ...todos, timestamp: serverTimestamp() });
        showAlert("info", "Todo Updated Successfully");
      } else {
        const collectionRef = collection(db, "todos");
        const docref = await addDoc(collectionRef, {
          ...todos,
          status: false,
          timestamp: serverTimestamp(),
        });
        setTodos({ title: "", description: "" });
        showAlert("success", "Todo Added Successfully");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // useEffect(() => {
  //   const checkIfClickedOutside = (e: MouseEvent) => {
  //     if (
  //       inputAreaRef.current &&
  //       !inputAreaRef.current.contains(e.target as Node)
  //     ) {
  //       console.log("You clicked outside of me!");
  //       setTodos({ title: "", description: "" });
  //     } else {
  //       console.log("You clicked inside of me!");
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, []);

  return (
    <>
      
      <div style={{ backgroundColor: "white" }} ref={inputAreaRef}>
        <TextField
          fullWidth
          label="title"
          margin="normal"
          sx={{ backgroundColor: "white" }}
          value={todos.title}
          onChange={(e) => setTodos({ ...todos, title: e.target.value })}
        ></TextField>
        <TextField
          fullWidth
          label="description"
          multiline
          maxRows={4}
          sx={{ backgroundColor: "white", borderradius: 20 }}
          value={todos.description}
          onChange={(e) => setTodos({ ...todos, description: e.target.value })}
        ></TextField>
        <Button
          onClick={onSubmit}
          sx={{ mt: 3, mb: 3 }}
          variant="contained"
          color="primary"
        >
          {todos.hasOwnProperty("timestamp") ? "UPDATE TODO" : "+ NEW TASK"}
        </Button>
      </div>
    </>
  );
};

export default TodoForm;
