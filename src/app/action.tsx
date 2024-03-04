"use server"

import { addTodo, delTodo, editTodo, setStatusTodo} from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData){
    const todoText = formData.get("todoText")

    if (typeof todoText === 'string') {
        if(todoText.trim() !== ""){
            const todo = await addTodo(todoText);
            revalidatePath("/");
        } else {
            throw new Error("Text nesmí být prázdné");
        }
    } else {
        throw new Error("Text musí být string");
    }
}

export async function handleEdit(formData: FormData){
    const todoId = formData.get("id");
    const todoText = formData.get("message");
  
    if (typeof todoId === 'string' && typeof todoText === 'string') {
      if(todoId.trim() !== "" && todoText.trim() !== ""){
        const todo = await editTodo(parseInt(todoId), todoText);
        revalidatePath("/");
      } else {
        throw new Error("Id a text nesmí být prázdné");
      }
    } else {
      throw new Error("Id a text musí být string");
    }
}

export async function handleDelete(formData: FormData){
    const todoId = formData.get("id");

    if (typeof todoId === 'string') {
      if(todoId.trim() !== ""){
        const todo = await delTodo(parseInt(todoId));
        revalidatePath("/");
      } else {
        throw new Error("Id nesmí být prázdný");
      }
    } else {
      throw new Error("Id musí být string");
    }
    revalidatePath("/");

}

export async function handleCheckbox(formData: FormData){
  const todoId = formData.get("id");
  const todoStatus = formData.get("status");

  if (typeof todoId === 'string' && typeof todoStatus === 'string') {
    if(todoId.trim() !== "" && todoStatus.trim() !== ""){
      const todo = await setStatusTodo(parseInt(todoId), todoStatus.toString());
      console.log("test");
      revalidatePath("/");
    } else {
      throw new Error("Id nesmí být prázdný");
    }
  } else {
    throw new Error("Id musí být string");
  }
  revalidatePath("/");

}