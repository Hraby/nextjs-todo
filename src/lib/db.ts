import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function addTodo(todoText: string){
    const todo = await prisma.todo.create({
        data: {
          message: todoText.toString()
        },
    });
    if(!todo) return null;
    return todo;
}

export async function delTodo(todoId: string){
    const todo = await prisma.todo.delete({
        where: {
            id: parseInt(todoId)
        },
    });
    if(!todo) return null;
    return todo;
}

export async function editTodo(todoId: string, todoText: string){
    const todo = await prisma.todo.update({
        where: {
            id: parseInt(todoId)
        },
        data: {
            message: todoText,
        },
    });
    if(!todo) return null;
    return todo;
}

export async function getTodos(){
    const todos = await prisma.todo.findMany({})
    if(!todos) return null;
    return todos;
}

export async function getTodo(todoId: string){
    const todo = await prisma.todo.findFirst({
        where: {
            id: parseInt(todoId)
        },
    });
    if(!todo) return null;
    return todo;
}